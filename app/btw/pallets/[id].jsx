import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, Stack, useLocalSearchParams } from 'expo-router'
import { ScreenContainer } from '../../../components'
import { usePalletStore } from '../../../stores/palletsStore'
import { usePosesStore } from '../../../stores/posesStore'
import { useGlobalStore } from '../../../stores/globalStore'
import { ScrollView } from 'react-native-gesture-handler'

export default function PalletPage() {

	const { id } = useLocalSearchParams()


	const { getPalletById } = usePalletStore();
	const { poses, getPalletPoses } = usePosesStore()
	const { showButtonGroup, setShowButtonGroup } = useGlobalStore()

	const [pallet, setPallet] = useState(null)
	const [palletTitle, setPalletTitle] = useState(pallet?.title)

	const [isPalletLoading, setIsPalletLoading] = useState(false)







	// EFFECTS


	useEffect(() => {

		try {
			setIsPalletLoading(true)
			async function fetchPallet() {
				const pallet = await getPalletById(id)
				setPallet(pallet)
				setPalletTitle(pallet?.title)
			}

			async function fetchPalletPoses() {
				await getPalletPoses(id)
			}

			fetchPallet()
			fetchPalletPoses()

		} catch (error) {
			console.log(error);

		} finally {
			setIsPalletLoading(false)
		}



	}, [id])


	useEffect(() => {

		setShowButtonGroup(false)

		return () => {
			setShowButtonGroup(false)
		}

	}, []);



	return (
		<ScreenContainer>
			<Stack.Screen
				options={{
					headerTitle: () => <Text className="text-center text-2xl text-white p-3" >
						{pallet?.title}
					</Text>
				}}
			/>


			{/* POSES */}


			{isPalletLoading ? <ActivityIndicator size="large" color="#f59e0b" /> :

				<ScrollView>
					{poses?.length > 0 ?

						<View
							className="space-y-4 p-2"
						>
							{poses?.map((item) => <View
								key={item._id}
								className="border-4 border-amber-500 rounded 
	bg-amber-500/70
	 font-bold
	 p-2
	 justify-center items-center
	 shadow-2xl shadow-amber-500
	 "
							>
								<Text
									className="text-white  text-2xl justify-center items-center"
								>
									{item.artikul}
								</Text>
							</View>)}


						</View>


						:
						<Text className="text-xl text-white text-center">
							Позицій немає
						</Text>

					}




				</ScrollView>
			}



		</ScreenContainer>
	)
}