import { View, Text, ActivityIndicator, Modal, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors500 } from '../../../../../constants/Colors'

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
			<View
				className="bg-black h-full justify-between p-4 "
			>
				<Text className="text-white text-3xl  text-center" >
					Видалення позиції {selectedPos?.artikul}
				</Text>




				{isDeletingPosById && <ActivityIndicator size="large" color={colors500.red} />}



				<View className="flex flex-row justify-around space-x-4" >

					<TouchableOpacity
						className=" p-4 border border-red-500 flex items-center justify-center rounded-2xl "
						onPress={() => { setShowModalDeletePos(false) }}>
						<Text className=" text-white text-xl"   >
							СКАСУВАТИ
						</Text>
					</TouchableOpacity>


					<TouchableOpacity

						className="p-4   flex items-center justify-center rounded-2xl border border-green-500"
						onPress={() => {
							handleDeletePosById(selectedPos._id)
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