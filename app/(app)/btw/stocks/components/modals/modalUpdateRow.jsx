import { View, Text, Modal, ActivityIndicator, TouchableOpacity } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { colors500 } from '../../../../../../constants/Colors'

export default function ModalUpdateRow({
	showModalUpdateRow,
	setShowModalUpdateRow,
	rowTitle,
	newRowTitle,
	setNewRowTitle,
	isUpdatingRowById,
	handleUpdateRowById
}) {
	return (
		<Modal
			animationType="slide"
			visible={showModalUpdateRow}


		>
			<View
				className="bg-black h-full justify-between p-4 "
			>
				<Text className="text-white text-3xl  text-center" >
					Перейменування ряду {rowTitle}
				</Text>

				<TextInput
					onChangeText={(text => setNewRowTitle(text))}
					value={newRowTitle}
					className="h-16 bg-gray-900 text-center font-bold text-2xl text-white rounded-full italic"
					autoFocus={true}
				/>


				{isUpdatingRowById && <ActivityIndicator size="large" color={colors500.lime} />}



				<View className="flex flex-row justify-around  space-x-4" >

					<TouchableOpacity
						className="w-1/2 p-4 border border-red-500 flex items-center justify-center rounded-2xl "
						onPress={() => { setShowModalUpdateRow(false) }}>
						<Text className=" text-white text-xl"   >
							СКАСУВАТИ
						</Text>
					</TouchableOpacity>


					<TouchableOpacity

						className={`w-1/2 p-4   flex items-center justify-center rounded-2xl border ${newRowTitle ? "border-green-500" : "border-gray-500"}`}
						onPress={() => {
							handleUpdateRowById(newRowTitle)
						}}
						disabled={!newRowTitle}
					>
						<Text className=" text-white text-xl" >
							ЗМІНИТИ
						</Text>
					</TouchableOpacity>

				</View>

			</View>


		</Modal>

	)
}