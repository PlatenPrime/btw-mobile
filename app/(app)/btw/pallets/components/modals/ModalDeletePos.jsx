import { View, Text, ActivityIndicator, Modal, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors500 } from '../../../../../../constants/Colors'
import { LinearGradient } from 'expo-linear-gradient';

export default function ModalDeletePos({
	showModalDeletePos,
	setShowModalDeletePos,
	selectedPos,
	isDeletingPosById,
	handleDeletePosById,
}) {
	return (
		<Modal
			animationType="slide"
			visible={showModalDeletePos}


		>

			<LinearGradient colors={['#ef4444', '#0f172aee']} >


				<View
					className=" h-full justify-center p-4 space-y-8 "
				>
					<Text className="text-white text-3xl  text-center" >
						Видалити позицію {selectedPos?.artikul}?
					</Text>








					<View className="flex flex-row justify-around space-x-4" >

						<TouchableOpacity
							className="w-1/2 p-4 bg-red-600 border border-red-500 flex items-center justify-center rounded-2xl "
							onPress={() => { setShowModalDeletePos(false) }}>
							<Text className=" text-white text-xl"   >
								СКАСУВАТИ
							</Text>
						</TouchableOpacity>


						<TouchableOpacity

							className="w-1/2 p-4   flex items-center justify-center rounded-2xl bg-green-600 border border-green-500"
							onPress={() => {
								handleDeletePosById(selectedPos._id)
							}}

						>

							{isDeletingPosById ?
								<ActivityIndicator size="large" color={colors500.green} />
								:
								<Text className=" text-white text-xl" >
									ВИДАЛИТИ
								</Text>
							}

						</TouchableOpacity>

					</View>

				</View>

			</LinearGradient>
		</Modal>

	)
}