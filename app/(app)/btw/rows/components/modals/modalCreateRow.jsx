import { View, Text, Modal, Pressable, ActivityIndicator, TouchableOpacity } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { colors500 } from '../../../../../../constants/Colors'
import { LinearGradient } from 'expo-linear-gradient'


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
			<LinearGradient colors={['#64748b', '#020617ee',]} >
				<View
					className=" h-full justify-between p-4 "
				>


					<Text className="text-orange-400 text-4xl  text-center" >Створення ряду</Text>

					<View
						className="flex-row justify-end items-center rounded-full bg-gray-700/50 focus:bg-gray-900/50 p-3 "
					>


						<TextInput
							onChangeText={(text => setNewRowTitle(text))}
							value={newRowTitle}
							className=" h-10 flex-1 text-2xl text-center text-white italic "
							autoFocus={true}
						/>
					</View>

					{isCreatingRow && <ActivityIndicator size="large" color={colors500.emerald} />}


					<View className="flex flex-row justify-around text-white text-xl space-x-2" >
						<TouchableOpacity
							className="w-1/2 p-4 border border-red-500 flex items-center justify-center rounded-2xl"
							onPress={() => { setShowModalCreateRow(false) }}>
							<Text className=" text-white text-xl"   >СКАСУВАТИ</Text>
						</TouchableOpacity>



						<TouchableOpacity

							className={`w-1/2 p-4 flex items-center justify-center rounded-2xl border ${newRowTitle ? "border-green-500" : "border-gray-500"}`}
							onPress={() => {
								handleCreateRow(newRowTitle)
							}}
							disabled={!newRowTitle}
						>
							<Text className=" text-white text-xl" >СТВОРИТИ</Text>
						</TouchableOpacity>

					</View>

				</View>
			</LinearGradient>
		</Modal>


	)
}