import { View, Text, ActivityIndicator, Modal, TouchableOpacity  } from 'react-native'
import React from 'react'
import { colors500 } from '../../../../../../constants/Colors'


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
			<View
				className="bg-red-950 h-full justify-between p-4 "
			>
				<Text className="text-white text-3xl  text-center" >
					Видалення палети {palletTitle}
				</Text>




				{isDeletingPalletById && <ActivityIndicator size="large" color={colors500.red} />}



				<View className="flex flex-row justify-around space-x-4" >

					<TouchableOpacity
						className=" p-4 border border-red-500 flex items-center justify-center rounded-2xl "
						onPress={() => { setShowModalDeletePallet(false) }}>
						<Text className=" text-white text-xl"   >
							СКАСУВАТИ
						</Text>
					</TouchableOpacity>


					<TouchableOpacity

						className="p-4   flex items-center justify-center rounded-2xl border border-green-500"
						onPress={() => {
							handleDeletePalletById()
						}}

					>
						<Text className=" text-white text-xl" >
							ВИДАЛИТИ
						</Text>
					</TouchableOpacity>

				</View>

			</View>


		</Modal>
	)
}