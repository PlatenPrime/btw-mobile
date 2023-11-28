import { View, Text, ActivityIndicator, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import useArtikulStore from '../../../stores/artsStore';
import { usePosesStore } from '../../../stores/posesStore';
import { usePalletStore } from '../../../stores/palletsStore';
import { getArtDataBtrade } from "../../../utils/getArtDataBtrade"
import { ScreenContainer } from '../../../components';
import { ScrollView } from 'react-native-gesture-handler';
import { colors500 } from '../../../constants/Colors';
import { Ionicons, MaterialCommunityIcons, FontAwesome5, Feather } from '@expo/vector-icons';













export default function AskPage() {

	const { id } = useLocalSearchParams()
	const router = useRouter()

	const { getArtikulById } = useArtikulStore();
	const { getPosesByArtikul, posesWithArtikul } = usePosesStore();
	const { pallets, getAllPallets } = usePalletStore();



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

				const pallets = await getAllPallets()
				console.log(pallets)


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
					className="flex-1 space-y-2 py-1"
				>


					{/* ARTIKUL CARD */}

					<View
						className=" flex-1  flex-row mt-1 p-1 space-x-1 bg-sky-500/5  border border-sky-500 rounded-xl items-center"
					>


						<View
							className="bg-white h-full items-center justify-center rounded-xl"
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
								{artikul?.nameukr.slice(10)}
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

								<Text
									className="text-3xl text-yellow-300 py-1"
								>
									Утро
								</Text>

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
									{posesWithArtikul?.reduce((a, b) => a + parseInt(b.quant), 0)}
								</Text>
							</View>


						</View>

					</View>


					{/* PALLETS WITH ARTIKULS LIST */}


					<View
						className="flex-1 space-y-2 p-1 bg-amber-100/5  border border-amber-100 rounded-xl "
					>

						<Text
							className="mt-2  text-amber-100 text-3xl text-center"
						>
							Палети
						</Text>

						{isLoadingPoses ?

							<ActivityIndicator size="large" color={colors500.amber} />

							:


							<View
								className=" p-2 space-y-4"
							>

								{posesWithArtikul?.map((pos) =>

									<TouchableOpacity
										key={pos._id}
										className="p-2 flex-1 flex-row items-center justify-between border border-amber-100 rounded-xl"
										onPress={() => router.push(`/btw/pallets/${pallets?.find((pallet) => pallet._id === pos?.pallet)?._id}/`)}

									>

										<View
											className="w-1/2 flex-1 flex-row justify-start items-center "
										>

											<MaterialCommunityIcons name="shipping-pallet" size={32} color="#fef3c7" />
											<Text
												className="text-amber-100 text-2xl"
											>
												{pallets?.find((pallet) => pallet._id === pos?.pallet)?.title}
											</Text>
										</View>

										<View
											className="w-1/2 flex-1 flex-row"
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



									</TouchableOpacity>




								)}


							</View>



						}


					</View>




				</ScrollView>
			}
		</ScreenContainer >
	)
}