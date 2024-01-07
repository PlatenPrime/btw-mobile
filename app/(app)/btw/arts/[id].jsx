import { View, Text, ActivityIndicator, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import useArtikulStore from '../../../../stores/artsStore';
import { usePosesStore } from '../../../../stores/posesStore';
import { usePalletStore } from '../../../../stores/palletsStore';
import { getArtDataBtrade } from "../../../../utils/getArtDataBtrade"
import { ScreenContainer } from '../../../../components';
import { ScrollView } from 'react-native-gesture-handler';
import { colors500 } from '../../../../constants/Colors';
import { Ionicons, MaterialCommunityIcons, FontAwesome5, Feather } from '@expo/vector-icons';
import { useGetRemains } from "../../../../hooks/useGetRemains"












export default function AskPage() {

	const { id } = useLocalSearchParams()
	const router = useRouter()
	const { remains, isLoadingRemains, errorRemains } = useGetRemains()

	const { getArtikulById } = useArtikulStore();
	const { getPosesByArtikul, posesWithArtikul } = usePosesStore();
	const { allPallets, getAllPallets } = usePalletStore();



	// STATES

	const [artikul, setArtikul] = useState(null)
	const [ostatok, setOstatok] = useState(null)
	const [isLoadingArtikul, setIsLoadingArtikul] = useState(false)
	const [isLoadingPoses, setIsLoadingPoses] = useState(false)


	const title = artikul?.artikul

	// EFFECTS

	useEffect(() => {


		const fetchArtikul = async () => {
			try {
				setIsLoadingArtikul(true)
				const artikul = await getArtikulById(id)
				const { quant: ostatok } = await getArtDataBtrade(artikul?.artikul)
				setArtikul(artikul)
				setOstatok(ostatok)
			} catch (error) {
				console.log(error)
			} finally {
				setIsLoadingArtikul(false)
			}

		}

		fetchArtikul()

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

				await getAllPallets()



			} catch (error) {
				console.log(error)
			} finally {

			}
		}


		fetchPallets()

	}, [])



	return (
		<ScreenContainer>
			<Stack.Screen
				options={{
					headerTitle: () => <Text className="text-center font-bold text-3xl text-white p-3" >
						{title}
					</Text>,

				}}
			/>
			{isLoadingArtikul ?
				<ActivityIndicator size="large" color={colors500.sky} />
				:


				<ScrollView
					className="flex-1 space-y-2 p-4 bg-sky-500/5"
				>


					{/* ARTIKUL CARD */}

					<View
						className=" flex-1  flex-row mt-1  space-x-1 bg-sky-500/25   rounded-xl items-center"
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
								className="text-xl text-white italic "
								numberOfLines={4}
							>
								{artikul?.nameukr.slice(10)}
							</Text>



							<Text
								className="text-2xl text-orange-300 py-2"
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
									>Ранок: {remains ? remains[title] : ""}</Text>

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
										<ActivityIndicator size="large" color={colors500.sky} />
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
										<ActivityIndicator size="large" color={colors500.sky} />
										:
										posesWithArtikul?.filter(pos => pos.sklad === "pogrebi")
											.reduce((a, b) => a + parseInt(b.quant), 0)
									}
								</Text>

							</View>


							<View
								className="space-x-2 ml-1 flex-row items-center justify-center"
							>
								<FontAwesome5 name="warehouse" size={16} color="#fef9c3" />
								<Text
									className="text-xl text-yellow-100 py-1 "
								>
									Мережі:{` `}
									{isLoadingPoses
										?
										<ActivityIndicator size="large" color={colors500.sky} />
										:
										posesWithArtikul?.filter(pos => pos.sklad === "merezhi")
											.reduce((a, b) => a + parseInt(b.quant), 0)
									}
								</Text>

							</View>


						</View>

					</View>


					{/* PALLETS WITH ARTIKULS LIST */}


					<View
						className="flex-1 space-y-2  py-4  rounded-xl "
					>

						<Text
							className="  text-amber-100 text-3xl text-center"
						>
							Палети
						</Text>

						{isLoadingPoses ?

							<ActivityIndicator size="large" color={colors500.amber} />

							:

							posesWithArtikul?.length > 0

								?


								<View
									className=" space-y-4 py-4"
								>

									{posesWithArtikul?.map((pos) =>

										<TouchableOpacity
											key={pos._id}
											className={`${pos.sklad === "pogrebi" ? "bg-green-500/20" : "bg-yellow-500/20"}
											
											flex-row justify-between
											p-2 flex-1   rounded-xl`}
											onPress={() => router.push(`/(app)/btw/pallets/${allPallets?.find((pallet) => pallet._id === pos?.pallet)?._id}/`)}

										>




											<View
												className=" justify-between"
											>


												<View
													className=" flex-row justify-start items-center "
												>

													<MaterialCommunityIcons name="shipping-pallet" size={24} color="#fff" />
													<Text
														className="text-white text-2xl"
													>
														{allPallets?.find((pallet) => pallet._id === pos?.pallet)?.title}
													</Text>
												</View>


												<View
													className="flex-row items-center space-x-2"
												>
													<FontAwesome5 name="warehouse" size={16} color="#fff" />
													<Text
														className="text-white text-base"
													>
														{`${pos.sklad === "pogrebi" ? "Погреби" : pos.sklad === "merezhi" ? "Мережі" : null}`}
													</Text>
												</View>


											</View>






											<View
												className=" justify-between"
											>

												<View
													className="   flex-row justify-end items-center"
												>
													<Text
														className="text-yellow-100 font-bold text-2xl rounded"
													>
														{pos?.boxes}
													</Text>

													<Feather name="box" size={24} color="#fef9c3" />

												</View>

												<View
													className="  flex-row justify-end items-center"
												>
													<Text
														className="text-sky-100 font-bold text-2xl rounded"
													>
														{pos?.quant}
													</Text>
													<MaterialCommunityIcons name="balloon" size={24} color="#e0f2fe" />


												</View>


											</View>



										</TouchableOpacity>




									)}


								</View>

								:

								<Text
									className="  text-amber-100 text-xl text-center"
								>
									Артикула на запасах немає

								</Text>

						}


					</View>




				</ScrollView>
			}
		</ScreenContainer >
	)
}