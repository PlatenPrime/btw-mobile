import { View, Text, ActivityIndicator, Modal, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { colors500 } from '../../../../../../constants/Colors'
import { TextInput } from 'react-native-gesture-handler'

export default function ModalUpdatePallet(
	{
		showModalUpdatePallet,
		setShowModalUpdatePallet,
		palletTitle,
		isUpdatingPalletById,
		handleUpdatePalletById

	}
) {


	const [newPalletTitle, setNewPalletTitle] = useState(palletTitle)




	return (
		<Modal
			animationType="slide"
			visible={showModalUpdatePallet}


		>
			<View
				className="bg-lime-950 h-full justify-between p-4 "
			>
				<Text className="text-white text-3xl  text-center" >
					Перейменування палети {palletTitle}
				</Text>

				<View
					className="flex-row justify-end items-center rounded-full bg-gray-700/50 focus:bg-gray-700 p-3 "
				>


					<TextInput
						onChangeText={(text => setNewPalletTitle(text))}
						value={newPalletTitle}
						className="pl-6 h-10 flex-1 text-2xl text-center text-white italic "
						autoFocus={true}
					/>
				</View>

				{isUpdatingPalletById && <ActivityIndicator size="large" color={colors500.lime} />}



				<View className="flex flex-row justify-around  space-x-4" >

					<TouchableOpacity
						className="w-1/2 p-4 border border-red-500 flex items-center justify-center rounded-2xl "
						onPress={() => { setShowModalUpdatePallet(false) }}>
						<Text className=" text-white text-xl"   >
							СКАСУВАТИ
						</Text>
					</TouchableOpacity>


					<TouchableOpacity

						className={`w-1/2 p-4   flex items-center justify-center rounded-2xl border ${newPalletTitle ? "border-green-500" : "border-gray-500"}`}
						onPress={() => {
							handleUpdatePalletById(newPalletTitle)
						}}
						disabled={!newPalletTitle}
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