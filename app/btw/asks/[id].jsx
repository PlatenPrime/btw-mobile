import { View, Text, ActivityIndicator, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { useGetRemains } from '../../../hooks/useGetRemains'
import { usePalletStore } from '../../../stores/palletsStore'
import { usePosesStore } from '../../../stores/posesStore'
import { ScreenContainer } from '../../../components'
import { getArtDataBtrade } from '../../../utils/getArtDataBtrade'
import useAskStore from '../../../stores/asksStore'
import { ScrollView } from 'react-native-gesture-handler'
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { useGetArtsCurrent } from '../../../hooks/useGetArtsCurrent'
import { colors500 } from '../../../constants/Colors';









export default function AskPage() {

	const { id } = useLocalSearchParams()
	const router = useRouter()
	const { remains, isLoadingRemains, errorRemains } = useGetRemains()
	const { artsCurrent } = useGetArtsCurrent()




	const { getAskById, updateAskById } = useAskStore()
	const { allPallets, getAllPallets } = usePalletStore();
	const { getPosesByArtikul, posesWithArtikul, updatePosWithArtikulById } = usePosesStore();



	const [ask, setAsk] = useState(null)
	const [ostatok, setOstatok] = useState(null)


	const [isLoadingPoses, setIsLoadingPoses] = useState(false)
	const [isLoadingAsk, setIsLoadingAsk] = useState(false)
	const [isUpdatingPos, setIsUpdatingPos] = useState(false)

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






















	return (
		<ScreenContainer>
			<Stack.Screen
				options={{
					headerTitle: () => <Text className="text-center font-bold text-3xl text-white p-3" >
						{title}
					</Text>,

				}}
			/>

			{isLoadingAsk
				?
				<ActivityIndicator size="large" color={colors500.indigo} />
				:
				<ScrollView
					className=" space-y-2 p-2 bg-indigo-500/5"
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