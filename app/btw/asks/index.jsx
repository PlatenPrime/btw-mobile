import { View, Text, ActivityIndicator, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScreenContainer } from '../../../components'
import useAskStore from "../../../stores/asksStore"
import { useGlobalStore } from "../../../stores/globalStore";
import { ScrollView } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';
import { useGetArtsCurrent } from "../../../hooks/useGetArtsCurrent"
import AskBage from "./components/AskBage"
import { ModalCreateAsk } from "./components/modals"


export default function AsksPage() {

	const router = useRouter()
	const { artsCurrent, isLoadingArtsCurrent, errorLoadingArts } = useGetArtsCurrent()

	const { showButtonGroup, setShowButtonGroup } = useGlobalStore()
	const { asks, getAllAsks, createAsk } = useAskStore()

	const [isAsksLoading, setIsAsksLoading] = useState(false)
	const [isAskCreating, setIsAskCreating] = useState(false)




	const [showModalCreateAsk, setShowModalCreateAsk] = useState(false)


	useEffect(() => {
		async function fetchAsks() {
			try {
				setIsAsksLoading(true)
				const allAsks = await getAllAsks();

			} catch (error) {
				console.log(error)
			} finally {
				setIsAsksLoading(false)
			}
		}


		fetchAsks()

		setShowButtonGroup(false)

		return () => {
			setShowButtonGroup(false)
		}


	}, []);






	async function handleCreateAsk(newAskData) {
		try {
			setIsAskCreating(true)

			await createAsk(newAskData)

		} catch (error) {
			console.log(error)
		} finally {
			setIsAskCreating(true)
			setShowModalCreateAsk(false)
		}



	}









	return (
		<ScreenContainer>



			{showButtonGroup && <View
				className="p-4 space-y-2 "
			>
				<TouchableOpacity
					className="flex  justify-between items-center 
					py-2 rounded-lg 
					"
					onPress={() => { setShowModalCreateAsk(true) }}>

					<Text className="text-2xl text-emerald-300 items-center justify-center " >

						Створити запит

					</Text>
				</TouchableOpacity>



			</View>
			}




			<ModalCreateAsk
				showModalCreateAsk={showModalCreateAsk}
				setShowModalCreateAsk={setShowModalCreateAsk}
				isAskCreating={isAskCreating}
				artsCurrent={artsCurrent}
				handleCreateAsk={handleCreateAsk}
			/>





			{isAsksLoading
				?
				<ActivityIndicator size="large" color="#6366f1" />
				:

				<ScrollView

				>

					<View
						className="space-y-4 p-2">

						{asks?.map(ask =>
							<View
								className="flex-1"
								key={ask._id}
							>
								<AskBage
									ask={ask}
									artsCurrent={artsCurrent}
								/>
							</View>
						)}

					</View>

				</ScrollView>}


		</ScreenContainer>
	)
}