import { View, Text, ActivityIndicator, Modal, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors500 } from '../../../../../../constants/Colors'


export default function ModalClearPallet({

	showModalClearPallet,
	setShowModalClearPallet,
	palletTitle,
	isClearingPalletById,
	handleClearPalletById,

}) {
	return (
		<Modal
			animationType="slide"
			visible={showModalClearPallet}


		>
			<View
				className="bg-black h-full justify-between p-4 "
			>
				<Text className="text-white text-3xl  text-center" >
					Очищення палети {palletTitle}
				</Text>




				{isClearingPalletById && <ActivityIndicator size="large" color={colors500.rose} />}



				<View className="flex flex-row justify-around space-x-4" >

					<TouchableOpacity
						className=" p-4 border border-red-500 flex items-center justify-center rounded-2xl "
						onPress={() => { setShowModalClearPallet(false) }}>
						<Text className=" text-white text-xl"   >
							СКАСУВАТИ
						</Text>
					</TouchableOpacity>


					<TouchableOpacity

						className="p-4   flex items-center justify-center rounded-2xl border border-green-500"
						onPress={() => {
							handleClearPalletById()
						}}

					>
						<Text className=" text-white text-xl" >
							ОЧИСТИТИ
						</Text>
					</TouchableOpacity>

				</View>

			</View>


		</Modal>
	)
}