import { View, Text, ActivityIndicator, Image, TouchableOpacity, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { useGetRemains } from '../../../../hooks/useGetRemains'
import { usePalletStore } from '../../../../stores/palletsStore'
import { usePosesStore } from '../../../../stores/posesStore'
import { ScreenContainer } from '../../../../components'
import { getArtDataBtrade } from '../../../../utils/getArtDataBtrade'
import useAskStore from '../../../../stores/asksStore'
import { ScrollView } from 'react-native-gesture-handler'
import { Feather, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { useGetArtsCurrent } from '../../../../hooks/useGetArtsCurrent'
import { colors500 } from '../../../../constants/Colors';
import { ModalUpdateAskPos, ModalDeleteAsk, ModalDoAsk, ModalFailAsk } from "./components/modals"
import { useGlobalStore } from '../../../../stores/globalStore'
import useAuthStore from '../../../../stores/authStore'
import { LinearGradient } from 'expo-linear-gradient';









export default function AskPage() {

	const { id } = useLocalSearchParams()
	const router = useRouter()
	const { remains, isLoadingRemains, errorRemains } = useGetRemains()
	const { artsCurrent } = useGetArtsCurrent()
	const { user } = useAuthStore()
	const { showButtonGroup, setShowButtonGroup } = useGlobalStore()




	const { getAskById, updateAskById, deleteAskById } = useAskStore()
	const { allPallets, getAllPallets } = usePalletStore();
	const { getPosesByArtikul, posesWithArtikul, updatePosWithArtikulById } = usePosesStore();




	const [ask, setAsk] = useState(null)
	const [ostatok, setOstatok] = useState(null)


	const [isLoadingPoses, setIsLoadingPoses] = useState(false)
	const [isLoadingAsk, setIsLoadingAsk] = useState(false)
	const [isUpdatingAskPos, setIsUpdatingAskPos] = useState(false)
	const [isDeletingAskById, setIsDeletingAskId] = useState(false)
	const [isDoingAsk, setIsDoingAsk] = useState(false)
	const [isFailingAsk, setIsFailingAsk] = useState(false)


	const [showModalUpdateAskPos, setShowModalUpdateAskPos] = useState(false)
	const [showModalDeleteAsk, setShowModalDeleteAsk] = useState(false)
	const [showModalDoAsk, setShowModalDoAsk] = useState(false)
	const [showModalFailAsk, setShowModalFailAsk] = useState(false)




	const [selectedPos, setSelectedPos] = useState(null)
	const [selectedPosPalletTitle, setSelectedPosPalletTitle] = useState(null)
	const [askPosBoxesFinalValue, setAskPosBoxesFinalValue] = useState("")
	const [askPosQuantFinalValue, setAskPosQuantFinalValue] = useState("")
	const [askPosBoxesValue, setAskPosBoxesValue] = useState("")
	const [askPosQuantValue, setAskPosQuantValue] = useState("")


	const [refreshing, setRefreshing] = useState(false);
	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		setTimeout(() => {
			setRefreshing(false);
		}, 2000);
	}, []);



	const title = ask?.artikul
	const artikul = artsCurrent?.find((art) => art.artikul === ask?.artikul)




	// EFFECTS 


	useEffect(() => {


		const fetchAsk = async () => {

			try {

				setIsLoadingAsk(true)
				const ask = await getAskById(id)
				const { quant: ostatok } = await getArtDataBtrade(ask?.artikul)
				setAsk(ask)
				setOstatok(ostatok)
			} catch (error) {
				console.log(error)
			} finally {
				setIsLoadingAsk(false)
			}

		}


		fetchAsk()

		return () => { }
	}, [id])


	useEffect(() => {


		const fetchPosesByArtikul = async () => {
			try {
				setIsLoadingPoses(true)
				const posesByArtikul = await getPosesByArtikul(ask?.artikul)

			} catch (error) {
				console.log(error)
			} finally {
				setIsLoadingPoses(false)
			}

		}

		fetchPosesByArtikul()

	}, [ask?.artikul])





	useEffect(() => {


		const fetchPallets = async () => {
			try {

				const pallets = await getAllPallets()


			} catch (error) {
				console.log(error)
			} finally {

			}
		}


		fetchPallets()



		setShowButtonGroup(false)

		return () => {
			setShowButtonGroup(false)
		}





	}, [])


	// HANDLERS 

	async function handleUpdateAskPos() {

		try {
			setIsUpdatingAskPos(true)

			const posUpdateData = {
				boxes: askPosBoxesFinalValue,
				quant: askPosQuantFinalValue,

			}

			const askUpdateData = {
				...ask,
				actions: [...ask?.actions, `З палети ${selectedPosPalletTitle} ${user?.fullname} зняв: кульок  ${askPosQuantValue}, коробок ${askPosBoxesValue}`]
			}

			console.log(askUpdateData);

			const updatedPos = await updatePosWithArtikulById(selectedPos._id, posUpdateData)


			console.log(updatedPos)


			const updatedAsk = await updateAskById(id, askUpdateData)
			console.log(updatedAsk)

			if (updatedAsk) setAsk(updatedAsk)




		} catch (error) {
			console.log(error)
		} finally {
			setIsUpdatingAskPos(false)
			setShowModalUpdateAskPos(false)
		}

	}





	async function handleDeleteAskById() {

		try {
			setIsDeletingAskId(true)

			await deleteAskById(id)
			router.back()


		} catch (error) {
			console.log(error);

		} finally {
			setIsDeletingAskId(false)
		}

	}



	async function handleDoAskById() {

		try {
			setIsDoingAsk(true)

			const askUpdateData = {
				status: "solved",
				solver: user?._id,
				actions: [...ask?.actions, `${user?.fullname} виконав цей запит`]
			}

			const updatedAsk = await updateAskById(id, askUpdateData)
			if (updatedAsk) setAsk(updatedAsk)



		} catch (error) {
			console.log(error);

		} finally {
			setIsDoingAsk(false)
			setShowModalDoAsk(false)

		}

	}


	async function handleFailAskById() {

		try {
			setIsFailingAsk(true)

			const askUpdateData = {
				status: "fail",
				solver: user?._id,
				actions: [...ask?.actions, `${user?.fullname} відмовив на цей запит`]
			}

			const updatedAsk = await updateAskById(id, askUpdateData)
			if (updatedAsk) setAsk(updatedAsk)



		} catch (error) {
			console.log(error);

		} finally {
			setIsFailingAsk(false)
			setShowModalFailAsk(false)

		}

	}














	return (
		<ScreenContainer>
			<Stack.Screen
				options={{
					headerTitle: () => <Text className="text-center font-bold text-3xl text-white p-3" >
						{title}
					</Text>,

				}}
			/>




			<ModalUpdateAskPos
				showModalUpdateAskPos={showModalUpdateAskPos}
				setShowModalUpdateAskPos={setShowModalUpdateAskPos}
				selectedPos={selectedPos}
				selectedPosPalletTitle={selectedPosPalletTitle}
				askPosBoxesFinalValue={askPosBoxesFinalValue}
				setAskPosBoxesFinalValue={setAskPosBoxesFinalValue}
				askPosQuantFinalValue={askPosQuantFinalValue}
				setAskPosQuantFinalValue={setAskPosQuantFinalValue}
				askPosBoxesValue={askPosBoxesValue}
				setAskPosBoxesValue={setAskPosBoxesValue}
				askPosQuantValue={askPosQuantValue}
				setAskPosQuantValue={setAskPosQuantValue}
				isUpdatingAskPos={isUpdatingAskPos}
				handleUpdateAskPos={handleUpdateAskPos}
			/>


			<ModalDeleteAsk
				showModalDeleteAsk={showModalDeleteAsk}
				setShowModalDeleteAsk={setShowModalDeleteAsk}
				ask={ask}
				isDeletingAskById={isDeletingAskById}
				handleDeleteAskById={handleDeleteAskById}
			/>


			<ModalDoAsk
				showModalDoAsk={showModalDoAsk}
				setShowModalDoAsk={setShowModalDoAsk}
				ask={ask}
				isDoingAsk={isDoingAsk}
				handleDoAskById={handleDoAskById}
			/>


			<ModalFailAsk
				showModalFailAsk={showModalFailAsk}
				setShowModalFailAsk={setShowModalFailAsk}
				ask={ask}
				isFailingAsk={isFailingAsk}
				handleFailAskById={handleFailAskById}
			/>








			{showButtonGroup && <View
				className=" absolute z-10 w-full"

			>



				{user?.role === "SKLAD" || user?.role === "PRIME" ?


					<>

						<LinearGradient colors={['#22c55e', '#052e16ee',]} >

							<TouchableOpacity
								className=" py-4 flex-row justify-center items-center"

								onPress={() => { setShowModalDoAsk(true) }}>

								<Text className="text-3xl text-white " >

									Виконати
								</Text>
							</TouchableOpacity>
						</LinearGradient>



						<LinearGradient colors={['#f43f5e', '#4c0519ee',]} >


							<TouchableOpacity
								className=" py-4 flex-row justify-center items-center"

								onPress={() => { setShowModalFailAsk(true) }}>

								<Text className="text-3xl text-white" >

									Відмовити
								</Text>
							</TouchableOpacity>

						</LinearGradient>

					</>

					: null}



				<LinearGradient colors={['#ef4444', '#450a0aee',]} >

					<TouchableOpacity
						className=" py-4 flex-row justify-center items-center"

						onPress={() => { setShowModalDeleteAsk(true) }}>

						<Text className="text-3xl text-white" >

							Видалити
						</Text>
					</TouchableOpacity>

				</LinearGradient>
			</View>}










			{
				isLoadingAsk
					?
					<ActivityIndicator size="large" color={colors500.indigo} />
					:
					<ScrollView
						refreshControl={
							<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
						}>







						<View
							className=" space-y-4  px-4 bg-indigo-500/5"
						>
							{/* ARTIKUL CARD */}






							<View
								className={`		
								flex-1  flex-row mt-1  space-x-1 rounded-xl items-center 
								${ask?.status === "new"
										?
										"bg-indigo-500/30"
										: ask?.status === "solved"
											? "border-emerald-500 bg-emerald-500/30"
											: ask?.status === "fail"
												? "border-rose-500 bg-rose-500/30"
												: null
									}
							`}




							>

								<View
									className="bg-white h-full items-center justify-center rounded-l-xl p-1"
								>
									<Image
										style={{
											height: 150,
											width: 150,
											resizeMode: "contain"
										}}
										className="rounded-xl"
										source={{ uri: `https://sharik.ua/images/elements_big/${artikul?.artikul}_m1.jpg` }}
									/>
								</View>

								<View
									className="p-2 space-y-1 items-start flex-1
							"
								>
									<Text
										className="text-xl text-white italic"
										numberOfLines={4}
									>
										{
											artsCurrent?.find((art) => art.artikul === ask.artikul)?.nameukr.slice(10)
											|| ask?.artikul
											|| null
										}
									</Text>



									<Text
										className="text-2xl text-center text-orange-300 py-2"
										numberOfLines={5}
									>
										<Ionicons name="location-outline" size={24} color="#fdba74" />
										{artikul?.zone}
									</Text>


									<View
										className="space-x-1 flex-row items-center justify-center"
									>
										<MaterialCommunityIcons name="balloon" size={24} color="#fde047" />
										{isLoadingRemains
											?
											<ActivityIndicator size="large" color={colors500.amber} />
											:
											<Text
												className="text-xl text-yellow-100 py-1"
											>Зранку: {remains ? remains[title] : ""}</Text>

										}
									</View>




									<View
										className="space-x-1 flex-row items-center justify-center"
									>
										<MaterialCommunityIcons name="balloon" size={24} color="#86efac" />

										<Text
											className="text-xl text-green-100 py-1"
										>
											Зараз: 	{ostatok}
										</Text>

									</View>




									<View
										className="space-x-2 ml-1 flex-row items-center justify-center"
									>
										<FontAwesome5 name="warehouse" size={16} color="#7dd3fc" />
										<Text
											className="text-xl text-sky-100 py-1 "
										>
											Склад:{` `}
											{isLoadingPoses
												?
												<ActivityIndicator size="large" color={colors500.indigo} />
												:
												posesWithArtikul?.reduce((a, b) => a + parseInt(b.quant), 0)
											}
										</Text>

									</View>


									<View
										className="space-x-2 ml-1 flex-row items-center justify-center"
									>
										<FontAwesome5 name="warehouse" size={16} color="#d1fae5" />
										<Text
											className="text-xl text-emerald-100 py-1 "
										>
											Погреби:{` `}
											{isLoadingPoses
												?
												<ActivityIndicator size="large" color={colors500.indigo} />
												:
												posesWithArtikul?.filter(pos => pos.sklad === "pogrebi")
													.reduce((a, b) => a + parseInt(b.quant), 0)
											}
										</Text>

									</View>






								</View>






							</View>










							{/* ACTIONS LIST */}



							{ask?.actions?.length > 0
								?
								<View
									className="p-2 border border-sky-500 rounded-xl space-y-2"
								>

									{ask?.actions?.map((action, i) => <Text
										key={i}
										className=" p-2 text-xl text-white  italic bg-sky-500/20 rounded-xl"

									>
										{i + 1}. {action}
									</Text>)}
								</View>
								:
								null
							}







							{/* POSES LIST */}



							{isLoadingPoses ?
								<ActivityIndicator size="large" color={colors500.indigo} />
								:
								posesWithArtikul.length > 0
									?
									<View
										className="space-y-4 ">

										<Text
											className="text-center text-teal-100 text-3xl"

										>
											Позиції: {" "}

											{posesWithArtikul.length}

										</Text>

										{posesWithArtikul?.sort((a, b) => {
											if (a.sklad < b.sklad) {
												return 1;
											}
											if (a.sklad > b.sklad) {
												return -1;
											}

											// names must be equal
											return 0;
										}

										)


											?.map(pos =>

												<TouchableOpacity
													onPress={() => {
														setShowModalUpdateAskPos(true);
														setSelectedPos(pos)
														setAskPosBoxesFinalValue(pos?.boxes)
														setAskPosQuantFinalValue(pos?.quant)
														setAskPosBoxesValue("");
														setAskPosQuantValue("");
														setSelectedPosPalletTitle(allPallets?.find((pallet) => pallet._id === pos?.pallet)?.title)
													}}
													key={pos._id}
												>
													<View

														className=" border border-amber-100 bg-indigo-500/10 rounded-xl "
													>
														<View
															className={` flex-1 
												   ${pos.sklad === "pogrebi"
																	?
																	"bg-emerald-500/50"
																	:
																	pos.sklad === "merezhi" ?
																		"bg-yellow-200/20" :
																		null
																}
												 p-2 flex-row justify-center items-center  rounded-t-xl 
												 `}
														>

															<MaterialCommunityIcons name="shipping-pallet" size={32} color="#fef3c7" />
															<Text
																className="text-amber-100 text-3xl"
															>
																{allPallets?.find((pallet) => pallet._id === pos?.pallet)?.title}
															</Text>
														</View>




														<View
															className=" flex-1 flex-row p-2 border-t border-amber-100"
														>


															<View
																className=" flex-1 flex-row justify-start items-center"
															>
																<MaterialCommunityIcons name="balloon" size={24} color="#7dd3fc" />
																<Text
																	className="text-sky-300 font-bold text-2xl rounded"
																>
																	{pos?.quant}
																</Text>

															</View>


															<View
																className="  flex-1 flex-row justify-end items-center"
															>
																<Feather name="box" size={24} color="#fde047" />
																<Text
																	className="text-yellow-300 font-bold text-2xl rounded"
																>
																	{pos?.boxes}
																</Text>

															</View>



														</View>


													</View>

												</TouchableOpacity>



											)}
									</View>
									:
									<Text
										className="text-3xl text-center text-teal-100"
									>
										Артикула немає на запасах
									</Text>

							}

						</View>

					</ScrollView>
			}






		</ScreenContainer >
	)
}