import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScreenContainer } from '../../../components'
import useAskStore from "../../../stores/asksStore"
import { useGlobalStore } from "../../../stores/globalStore";
import { ScrollView } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';

export default function AsksPage() {

	const router = useRouter()


	const { showButtonGroup, setShowButtonGroup } = useGlobalStore()
	const { asks, getAllAsks, } = useAskStore()

	const [isAsksLoading, setIsAsksLoading] = useState(false)




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










	return (
		<ScreenContainer>





			{isAsksLoading
				?
				<ActivityIndicator size="large" color="#f97316" />
				:

				<ScrollView
					className="space-y-2 p-2"

				>
					<Text className="text-white text-3xl text-center">{asks?.length}</Text>


					{asks?.map(ask => <TouchableOpacity
						key={ask._id}
						onPress={() => router.push(`btw/asks/${ask._id}/`)}
						className="border border-indigo-500 rounded-xl "
					>
						<Text
							className="text-center text-2xl text-white"
						>
							{ask.artikul}

						</Text>
						<Text
							className="text-center text-xl text-white"
						>
							{ask.createdAt}
						</Text>

						<Text
							className="text-center text-xl text-white"
						>
							{ask.updatedAt}

						</Text>




					</TouchableOpacity>)}




				</ScrollView>}

		</ScreenContainer>
	)
}