import { View, Text, ActivityIndicator, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScreenContainer } from '../../../components'
import useAskStore from "../../../stores/asksStore"
import { useGlobalStore } from "../../../stores/globalStore";
import { ScrollView } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';
import { useGetArtsCurrent } from "../../../hooks/useGetArtsCurrent"
import AskBage from "./components/AskBage"


export default function AsksPage() {

	const router = useRouter()
	const { artsCurrent, isLoadingArtsCurrent, errorLoadingArts } = useGetArtsCurrent()

	const { showButtonGroup, setShowButtonGroup } = useGlobalStore()
	const { asks, getAllAsks, createAsk } = useAskStore()

	const [isAsksLoading, setIsAsksLoading] = useState(false)
	const [isAsksCreating, setIsAsksCreating] = useState(false)

	const [newAskArtikul, setNewAskArtikul] = useState('')
	const [newAskQuant, setNewAskQuant] = useState('')


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






	async function handleCreateAsk() {
		try {
			setIsAsksCreating(true)
			const newAskData = {
				artikul: newAskArtikul,
				quant: newAskQuant,
				status: "new"
			}

			await createAsk(newAskData)



		} catch (error) {
			console.log(error)
		} finally {
			setIsAsksCreating(true)
			setShowModalCreateAsk(false)
		}



	}









	return (
		<ScreenContainer>





			{isAsksLoading
				?
				<ActivityIndicator size="large" color="#6366f1" />
				:

				<ScrollView
					className="space-y-2 p-2"

				>
					<Text className="text-indigo-500 text-3xl text-center">{asks?.length}</Text>


					{asks?.map(ask => <AskBage
						key={ask._id}
						ask={ask}
						artsCurrent={artsCurrent}
					/>
					)}




				</ScrollView>}

		</ScreenContainer>
	)
}