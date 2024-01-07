import { View, Text, ActivityIndicator, Modal, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors500 } from '../../../../../../constants/Colors'

import { LinearGradient } from 'expo-linear-gradient';



export default function ModalSolveAsk({
	showModalSolveAsk,
	setShowModalSolveAsk,
	ask,
	isSolvingAsk,
	handleSolveAskById,
}) {
	return (
		<Modal
			animationType="slide"
			visible={showModalSolveAsk}


		>

			<LinearGradient colors={['#15803d', '#1e1b4b',]} >

				<View
					className=" h-full justify-around p-4 "
				>
					<Text className="text-white text-3xl  text-center" >
						Виконати запит на {ask?.artikul}?
					</Text>




					{isSolvingAsk && <ActivityIndicator size="large" color={colors500.green} />}



					<View className="flex flex-row justify-around space-x-4 mb-4" >

						<TouchableOpacity
							className=" p-4 border border-red-500 flex items-center justify-center rounded-2xl "
							onPress={() => { setShowModalSolveAsk(false) }}>
							<Text className=" text-white text-xl"   >
								СКАСУВАТИ
							</Text>
						</TouchableOpacity>


						<TouchableOpacity

							className="p-4   flex items-center justify-center rounded-2xl border border-green-500"
							onPress={() => {
								handleSolveAskById()
							}}

						>
							<Text className=" text-white text-xl" >
								ВИКОНАТИ
							</Text>
						</TouchableOpacity>

					</View>

				</View>
			</LinearGradient>

		</Modal>
	)
}