import { View, Text, ActivityIndicator, Modal, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { colors500 } from '../../../../../../constants/Colors'
import { TextInput } from 'react-native-gesture-handler'
import { LinearGradient } from 'expo-linear-gradient';

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


			<LinearGradient colors={['#3b82f6', '#0f172aee']} >

				<View
					className=" h-full justify-between p-4 "
				>
					<Text className="text-white text-3xl  text-center" >
						Перейменування палети {palletTitle}
					</Text>

					<View
						className="flex-row justify-end items-center rounded-full bg-blue-900/40 focus:bg-blue-700/50 p-3 "
					>


						<TextInput
							onChangeText={(text => setNewPalletTitle(text))}
							value={newPalletTitle}
							className=" flex-1 text-3xl text-center text-white italic "
							autoFocus={true}
						/>
					</View>





					<View className="flex flex-row justify-around  space-x-4" >

						<TouchableOpacity
							className="w-1/2 p-4 border bg-red-600 border-red-500 flex items-center justify-center rounded-2xl "
							onPress={() => { setShowModalUpdatePallet(false) }}>
							<Text className=" text-white text-xl"   >
								СКАСУВАТИ
							</Text>
						</TouchableOpacity>


						<TouchableOpacity

							className={`w-1/2 p-4   flex items-center justify-center rounded-2xl border ${newPalletTitle ? "border-green-600 bg-green-600" : "border-gray-500 bg-gray-500"}`}
							onPress={() => {
								handleUpdatePalletById(newPalletTitle)
							}}
							disabled={!newPalletTitle}
						>
							{isUpdatingPalletById ?
								<ActivityIndicator size="large" color={colors500.lime} />
								:
								<Text className=" text-white text-xl" >
									ЗМІНИТИ
								</Text>

							}



						</TouchableOpacity>

					</View>

				</View>
			</LinearGradient>

		</Modal>
	)
}