import { View, Text, ActivityIndicator, Modal, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors500 } from '../../../../../../constants/Colors'
import { LinearGradient } from 'expo-linear-gradient';

export default function ModalDeletePallet({
	showModalDeletePallet,
	setShowModalDeletePallet,
	palletTitle,
	isDeletingPalletById,
	handleDeletePalletById,
}) {
	return (
		<Modal
			animationType="slide"
			visible={showModalDeletePallet}


		>
			{/* <LinearGradient colors={['#ef4444', '#0f172aee']} > */}

				<View
					className="bg-slate-900 h-full justify-center space-y-8 p-4 "
				>
					<Text className="text-white text-3xl  text-center" >
						Видалити палету {palletTitle}?
					</Text>








					<View className="flex flex-row justify-around space-x-4" >

						<TouchableOpacity
							className="w-1/2 p-4 bg-red-600 border border-red-500 flex items-center justify-center rounded-2xl "
							onPress={() => { setShowModalDeletePallet(false) }}>
							<Text className=" text-white text-xl"   >
								СКАСУВАТИ
							</Text>
						</TouchableOpacity>


						<TouchableOpacity

							className="w-1/2  p-4   flex items-center justify-center rounded-2xl bg-green-600 border border-green-500"
							onPress={() => {
								handleDeletePalletById()
							}}

						>
							{isDeletingPalletById
								?
								<ActivityIndicator size="large" color={colors500.green} />
								:
								<Text className=" text-white text-xl" >
									ВИДАЛИТИ
								</Text>
							}

						</TouchableOpacity>

					</View>

				</View>
			{/* </LinearGradient> */}

		</Modal>
	)
}