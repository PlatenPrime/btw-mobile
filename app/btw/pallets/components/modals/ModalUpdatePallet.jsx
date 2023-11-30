import { View, Text, ActivityIndicator, Modal, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { colors500 } from '../../../../../constants/Colors'
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
				className="bg-black h-full justify-between p-4 "
			>
				<Text className="text-white text-3xl  text-center" >
					Перейменування палети {palletTitle}
				</Text>

				<TextInput
					onChangeText={(text => setNewPalletTitle(text))}
					value={newPalletTitle}
					className="h-16 bg-gray-900 text-center font-bold text-2xl text-white rounded-full italic"
					autoFocus={true}
				/>


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