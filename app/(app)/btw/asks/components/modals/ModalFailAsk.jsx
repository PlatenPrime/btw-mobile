import { View, Text, ActivityIndicator, Modal, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors500 } from '../../../../../../constants/Colors'

import { LinearGradient } from 'expo-linear-gradient';


export default function ModalDeleteAsk({
	showModalFailAsk,
	setShowModalFailAsk,
	ask,
	isFailingAsk,
	handleFailAskById,
}) {
	return (
		<Modal
			animationType="slide"
			visible={showModalFailAsk}


		>

			<LinearGradient colors={['#f43f5e', '#1e1b4b',]} >
				<View
					className=" h-full justify-around p-4 "
				>
					<Text className="text-white text-3xl  text-center" >
						Відмовити у виконанні запиту на {ask?.artikul}?
					</Text>




					{isFailingAsk && <ActivityIndicator size="large" color={colors500.rose} />}



					<View className="flex flex-row justify-around space-x-4 mb-4" >

						<TouchableOpacity
							className=" p-4 border border-red-500 flex items-center justify-center rounded-2xl "
							onPress={() => { setShowModalFailAsk(false) }}>
							<Text className=" text-white text-xl"   >
								СКАСУВАТИ
							</Text>
						</TouchableOpacity>


						<TouchableOpacity

							className="p-4   flex items-center justify-center rounded-2xl border border-green-500"
							onPress={() => {
								handleFailAskById()
							}}

						>
							<Text className=" text-white text-xl" >
								ВІДМОВИТИ
							</Text>
						</TouchableOpacity>

					</View>

				</View>
			</LinearGradient>

		</Modal>
	)
}