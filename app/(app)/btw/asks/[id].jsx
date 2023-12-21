import { View, Text, ActivityIndicator, Image, TouchableOpacity } from 'react-native'
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









export default function AskPage() {

	const { id } = useLocalSearchParams()
	const router = useRouter()
	const { remains, isLoadingRemains, errorRemains } = useGetRemains()
	const { artsCurrent } = useGetArtsCurrent()
	const { user, users, getUsers } = useAuthStore()
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
				const posesByArtikul = await getPosesByArtikul(artikul?.artikul)

			} catch (error) {
				console.log(error)
			} finally {
				setIsLoadingPoses(false)
			}

		}

		fetchPosesByArtikul()

	}, [artikul])





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
				actions: [...ask?.actions, `З палети ${selectedPosPalletTitle} було знято: кульок  ${askPosQuantValue}, коробок ${askPosBoxesValue}`]
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
				solver: user?._id
			}

			const updatedAsk = await updateAskById(id, askUpdateData)
			setAsk(updatedAsk)



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
				solver: user?._id
			}

			const updatedAsk = await updateAskById(id, askUpdateData)
			setAsk(updatedAsk)



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
				className=" bg-black/50"

			>


				<TouchableOpacity
					className="bg-green-500/10 py-4 flex-row justify-center items-center"

					onPress={() => { setShowModalDoAsk(true) }}>

					<Text className="text-3xl text-green-300" >

						Виконати
					</Text>
				</TouchableOpacity>



				<TouchableOpacity
					className="bg-rose-500/10 py-4 flex-row justify-center items-center"

					onPress={() => { setShowModalFailAsk(true) }}>

					<Text className="text-3xl text-rose-200" >

						Відмовити
					</Text>
				</TouchableOpacity>




				<TouchableOpacity
					className="bg-red-500/50 py-4 flex-row justify-center items-center"

					onPress={() => { setShowModalDeleteAsk(true) }}>

					<Text className="text-3xl text-red-200" >

						Видалити
					</Text>
				</TouchableOpacity>


			</View>}










			{isLoadingAsk
				?
				<ActivityIndicator size="large" color={colors500.indigo} />
				:
				<ScrollView
				>

					<View
						className=" space-y-4  p-2 bg-indigo-500/5"
					>
						{/* ARTIKUL CARD */}

						<View
							className=" flex-1  flex-row mt-1  space-x-1 bg-indigo-500/5  border border-indigo-500 rounded-xl items-center"
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
									className="text-2xl text-white "
									numberOfLines={4}
								>
									{
										artsCurrent?.find((art) => art.artikul === ask.artikul)?.nameukr.slice(10)
										|| ask?.artikul
										|| null
									}
								</Text>



								<Text
									className="text-3xl text-orange-300 py-2"
									numberOfLines={5}
								>
									<Ionicons name="location-outline" size={36} color="#fdba74" />
									{artikul?.zone}
								</Text>


								<View
									className="space-x-1 flex-row items-center justify-center"
								>
									<MaterialCommunityIcons name="balloon" size={36} color="#fde047" />
									{isLoadingRemains
										?
										<ActivityIndicator size="large" color={colors500.amber} />
										:
										<Text
											className="text-3xl text-yellow-300 py-1"
										>{remains ? remains[title] : ""}</Text>

									}
								</View>




								<View
									className="space-x-1 flex-row items-center justify-center"
								>
									<MaterialCommunityIcons name="balloon" size={36} color="#86efac" />

									<Text
										className="text-3xl text-green-300 py-1"
									>
										{ostatok}
									</Text>

								</View>



								<View
									className="space-x-2 ml-1 flex-row items-center justify-center"
								>
									<FontAwesome5 name="warehouse" size={24} color="#7dd3fc" />
									<Text
										className="text-3xl text-sky-300 py-1 "
									>
										{isLoadingPoses ?
											<ActivityIndicator size="large" color={colors500.indigo} />
											:
											posesWithArtikul?.reduce((a, b) => a + parseInt(b.quant), 0)
										}
									</Text>
								</View>


							</View>

						</View>


						{/* ACTIONS LIST */}



						{ask?.actions?.length > 0
							?
							<View
								className="border border-green-700 rounded-xl"
							>

								{ask?.actions?.map((action, i) => <Text
									key={i}
									className=" p-2 text-xl text-green-200  italic"

								>
									{action}
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
									{posesWithArtikul.map(pos =>
										<View
											key={pos._id}
											className="flex-1 border border-indigo-500 bg-indigo-500/10 rounded-xl "
										>


											<View
												className=" flex-1 p-2 flex-row justify-center items-center  rounded-t-xl "
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
													className="  flex-1 flex-row justify-start items-center"
												>
													<Feather name="box" size={24} color="#fde047" />
													<Text
														className="text-yellow-300 font-bold text-2xl rounded"
													>
														{pos?.boxes}
													</Text>

												</View>

												<View
													className=" flex-2 flex-row justify-start items-center"
												>
													<MaterialCommunityIcons name="balloon" size={24} color="#7dd3fc" />
													<Text
														className="text-sky-300 font-bold text-2xl rounded"
													>
														{pos?.quant}
													</Text>

												</View>


											</View>



											<View
												className="bg-indigo-700 rounded-b-xl"
											>
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


												>
													<Text
														className="text-3xl text-center text-indigo-100"
													>
														Зняти
													</Text>
												</TouchableOpacity>
											</View>





										</View>
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