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

			<LinearGradient colors={['#15803d', '#052e16ee',]} >

				<View
					className=" h-full justify-center space-y-8 p-4 "
				>
					<Text className="text-white text-3xl  text-center" >
						Виконати запит на {ask?.artikul}?
					</Text>






					<View className="flex flex-row justify-around space-x-4 mb-4" >

						<TouchableOpacity
							className=" w-1/2 p-4 bg-red-600 border border-red-500 flex items-center justify-center rounded-2xl "
							onPress={() => { setShowModalSolveAsk(false) }}>
							<Text className=" text-white text-xl"   >
								СКАСУВАТИ
							</Text>
						</TouchableOpacity>


						<TouchableOpacity

							className=" w-1/2 p-4   flex items-center justify-center rounded-2xl bg-green-600  border border-green-500"
							onPress={() => {
								handleSolveAskById()
							}}
							disabled={isSolvingAsk}

						>
							{isSolvingAsk ?
								<ActivityIndicator size="large" color={colors500.green} />
								:
								<Text className=" text-white text-xl" >

									ВИКОНАТИ
								</Text>
							}


						</TouchableOpacity>

					</View>

				</View>
			</LinearGradient>

		</Modal>
	)
}