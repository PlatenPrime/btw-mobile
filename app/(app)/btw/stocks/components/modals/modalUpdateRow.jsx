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



				<View
					className="flex-row justify-end items-center rounded-full bg-gray-700/50 focus:bg-gray-700 p-3 "
				>


					<TextInput
						onChangeText={(text => setNewRowTitle(text))}
						value={newRowTitle}
						className="pl-6 h-10 flex-1 text-2xl text-center text-white italic "
						autoFocus={true}
					/>


				</View>



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