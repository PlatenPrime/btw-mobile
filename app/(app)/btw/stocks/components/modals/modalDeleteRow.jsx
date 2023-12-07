import { View, Text, Modal, Pressable, ActivityIndicator } from 'react-native'
import React from 'react'
import { colors500 } from '../../../../../../constants/Colors'
import { TouchableOpacity } from 'react-native-gesture-handler'


export default function ModalDeleteRow({
	showModalDeleteRow,
	setShowModalDeleteRow,
	rowTitle,
	isDeletingRowById,
	handleDeleteRowById
}) {
	return (
		<Modal
			animationType="slide"
			visible={showModalDeleteRow}


		>
			<View
				className="bg-black h-full justify-between p-4 "
			>
				<Text className="text-white text-3xl  text-center" >
					Видалення ряду {rowTitle}
				</Text>




				{isDeletingRowById && <ActivityIndicator size="large" color={colors500.red} />}



				<View className="flex flex-row justify-around space-x-4" >

					<TouchableOpacity
						className="w-1/2 p-4 border border-red-500 flex items-center justify-center rounded-2xl "
						onPress={() => { setShowModalDeleteRow(false) }}>
						<Text className=" text-white text-xl"   >
							СКАСУВАТИ
						</Text>
					</TouchableOpacity>


					<TouchableOpacity

						className="w-1/2 p-4   flex items-center justify-center rounded-2xl border border-green-500"
						onPress={() => {
							handleDeleteRowById()
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