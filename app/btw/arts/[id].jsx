import { View, Text, ActivityIndicator, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import useArtikulStore from '../../../stores/artsStore';
import { usePosesStore } from '../../../stores/posesStore';
import { usePalletStore } from '../../../stores/palletsStore';
import { getArtDataBtrade } from "../../../utils/getArtDataBtrade"
import { ScreenContainer } from '../../../components';
import { ScrollView } from 'react-native-gesture-handler';
import { colors500 } from '../../../constants/Colors';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';













export default function AskPage() {

	const { id } = useLocalSearchParams()

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
					headerTitle: () => <Text className="text-center text-2xl text-white p-3" >
						{title}
					</Text>
				}}
			/>
			{isLoadingArtikul ?
				<ActivityIndicator size="large" color={colors500.sky} />
				:
				<ScrollView>

					<View
						className=" flex-row p-1 space-x-1 bg-sky-500/20 rounded-xl items-center"
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
								numberOfLines={2}
							>
								{artikul?.nameukr.slice(9)}
							</Text>

							<Text
								className="text-3xl text-orange-300 p-2"
								numberOfLines={5}
							>
								<Ionicons name="location-outline" size={36} color="#fdba74" />
								{artikul?.zone}
							</Text>


							<Text
								className="text-3xl text-rose-300 p-1"

							>

								<MaterialCommunityIcons name="balloon" size={36} color="#fda4af" />
								Утро
							</Text>




							<View
								className="space-x-1 flex-row items-center justify-center"
							>
								<MaterialCommunityIcons name="balloon" size={36} color="#86efac" />

								<Text
									className="text-3xl text-green-300 p-1"

								>
									{ostatok}
								</Text>

							</View>



							<View
								className="space-x-1 flex-row items-center justify-center"
							>
								<FontAwesome5 name="warehouse" size={24} color="#7dd3fc" />
								<Text
									className="text-3xl text-sky-300 p-1 "
								>
									{posesWithArtikul?.reduce((a, b) => a + parseInt(b.quant), 0)}
								</Text>
							</View>


						</View>

					</View>

















				</ScrollView>
			}
		</ScreenContainer >
	)
}