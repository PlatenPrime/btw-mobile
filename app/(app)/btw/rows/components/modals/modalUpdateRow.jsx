import { View, Text, Modal, ActivityIndicator, TouchableOpacity } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { colors500 } from '../../../../../../constants/Colors'
import { LinearGradient } from 'expo-linear-gradient'

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
			{/* <LinearGradient colors={['#3b82f6', '#0f172aee']} > */}
				<View
					className="bg-slate-900 h-full justify-between p-4 "
				>
					<Text className="text-white text-3xl  text-center" >
						Перейменування ряду {rowTitle}
					</Text>



					<View
						className="flex-row justify-end items-center rounded-full bg-slate-700 focus:bg-slate-500  p-3 "
					>


						<TextInput
							onChangeText={(text => setNewRowTitle(text))}
							value={newRowTitle}
							className=" h-10 flex-1 text-3xl text-center text-white italic "
							autoFocus={true}
						/>


					</View>





					<View className="flex flex-row justify-around  space-x-4" >

						<TouchableOpacity
							className="w-1/2 p-4 bg-red-600 border border-red-500 flex items-center justify-center rounded-2xl "
							onPress={() => { setShowModalUpdateRow(false) }}>
							<Text className=" text-white text-xl"   >
								СКАСУВАТИ
							</Text>
						</TouchableOpacity>


						<TouchableOpacity

							className={`w-1/2 p-4   flex items-center justify-center rounded-2xl border ${newRowTitle ? "bg-green-600  border-green-500" : "bg-gray-600  border-gray-500"}`}
							onPress={() => {
								handleUpdateRowById(newRowTitle)
							}}
							disabled={!newRowTitle || isUpdatingRowById}
						>

							{isUpdatingRowById ?
								<ActivityIndicator size="large" color={colors500.lime} />
								:
								<Text className=" text-white text-xl" >
									ЗМІНИТИ
								</Text>
							}

						</TouchableOpacity>

					</View>

				</View>
			{/* </LinearGradient> */}

		</Modal>

	)
}