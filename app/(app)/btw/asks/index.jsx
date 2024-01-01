import { View, Text, ActivityIndicator, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScreenContainer } from '../../../../components'
import useAskStore from "../../../../stores/asksStore"
import useAuthStore from "../../../../stores/authStore"
import { useGlobalStore } from "../../../../stores/globalStore";
import { ScrollView } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';
import { useGetArtsCurrent } from "../../../../hooks/useGetArtsCurrent"
import AskBage from "./components/AskBage"
import { ModalCreateAsk } from "./components/modals"
import { sendMessageToTelegram } from '../../../../utils/sendMessagesTelegram'
import { LinearGradient } from 'expo-linear-gradient';






export default function AsksPage() {

	const router = useRouter()
	const { artsCurrent, isLoadingArtsCurrent, errorLoadingArts } = useGetArtsCurrent()

	const { showButtonGroup, setShowButtonGroup } = useGlobalStore()
	const { asks, getAllAsks, createAsk } = useAskStore()
	const { user, users, getUsers } = useAuthStore()

	const [isAsksLoading, setIsAsksLoading] = useState(false)
	const [isAskCreating, setIsAskCreating] = useState(false)





	const [showModalCreateAsk, setShowModalCreateAsk] = useState(false)


	useEffect(() => {
		async function fetchAsks() {
			try {
				setIsAsksLoading(true)

				const allAsks = await getAllAsks();



				await getUsers()




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

			const createdAsk = await createAsk(newAskData)

			console.log("Created Ask: ", createdAsk);

			const user = users?.find(user => user._id === createdAsk?.asker)
			const artikul = createdAsk.artikul
			const quant = createdAsk.quant
			const com = createdAsk.com


			if (user?.role !== "PRIME") await sendMessageToTelegram(`
			${user?.fullname}: необхідно зняти ${artikul}.
			${quant ? `Кількість: ${quant} шт` : ""}
			${com ? `Коментарій: ${com} шт` : ""}
			`)




		} catch (error) {
			console.log(error)
		} finally {
			setIsAskCreating(false)
			setShowModalCreateAsk(false)
		}



	}













	return (
		<ScreenContainer>



			{showButtonGroup && <View
				className="  absolute z-10 w-full"
			>
				<LinearGradient colors={['#3730a3', '#1e1b4bee',]} >
				<TouchableOpacity
					className="flex  justify-between items-center 
					py-4  
					"
					onPress={() => { setShowModalCreateAsk(true) }}>

					<Text className="text-3xl text-white items-center justify-center " >

						Створити запит

					</Text>
				</TouchableOpacity>

				</LinearGradient>

			</View>
			}




			<ModalCreateAsk
				showModalCreateAsk={showModalCreateAsk}
				setShowModalCreateAsk={setShowModalCreateAsk}
				isAskCreating={isAskCreating}
				artsCurrent={artsCurrent}
				handleCreateAsk={handleCreateAsk}
				user={user}
			/>










			{isAsksLoading
				?
				<ActivityIndicator size="large" color="#6366f1" />
				:

				<ScrollView

				>

					<View
						className="space-y-4 p-4">

						{asks?.map(ask =>
							<View
								className="flex-1"
								key={ask._id}
							>
								<AskBage

									ask={ask}
									artsCurrent={artsCurrent}
									users={users}
								/>
							</View>
						)}

					</View>

				</ScrollView>}


		</ScreenContainer>
	)
}