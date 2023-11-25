import { View, Text, Modal, Pressable, ActivityIndicator } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { colors500 } from '../../../../../constants/Colors'

export default function ModalCreateRow({
	showModalCreateRow,
	setShowModalCreateRow,
	newRowTitle,
	setNewRowTitle,
	isCreatingRow,
	handleCreateRow
}) {
	return (
		<Modal
			animationType="slide"
			visible={showModalCreateRow}

		>

			<View
				className="bg-black h-full justify-between p-4 "
			>


				<Text className="text-white text-3xl  text-center" >Створення ряду</Text>



				<TextInput
					onChangeText={(text => setNewRowTitle(text))}
					value={newRowTitle}
					className="h-16 bg-gray-900 text-center font-bold text-2xl text-white rounded-full italic"
					autoFocus={true}
				/>

				{isCreatingRow && <ActivityIndicator size="large" color={colors500.emerald} />}


				<View className="flex flex-row justify-around text-white text-xl" >
					<Pressable
						className="p-4 border border-red-500 flex items-center justify-center rounded-2xl"
						onPress={() => { setShowModalCreateRow(false) }}>
						<Text className=" text-white text-xl"   >СКАСУВАТИ</Text>
					</Pressable>
					<Pressable

						className={`p-4 flex items-center justify-center rounded-2xl border ${newRowTitle ? "border-green-500" : "border-gray-500"}`}


						onPress={() => {
							handleCreateRow(newRowTitle)

						}}
						disabled={!newRowTitle}
					>

						<Text className=" text-white text-xl" >СТВОРИТИ</Text>
					</Pressable>

				</View>

			</View>

		</Modal>


	)
}