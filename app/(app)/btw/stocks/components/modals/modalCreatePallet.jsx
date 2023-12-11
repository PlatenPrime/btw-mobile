import { View, Text, Modal, Pressable, ActivityIndicator } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { colors500 } from '../../../../../../constants/Colors'



export default function ModalCreatePallet({
	showModalCreatePallet,
	setShowModalCreatePallet,
	row,
	newPalletTitle,
	setNewPalletTitle,
	isCreatingPallet,
	handleCreatePallet
}) {
	return (
		<Modal
			animationType="slide"
			visible={showModalCreatePallet}


		>
			<View
				className="bg-black h-full justify-between p-4 "
			>
				<Text className="text-white text-3xl  text-center" >
					Створення палети для ряду {row?.title}
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

				{isCreatingPallet && <ActivityIndicator size="large" color={colors500.emerald} />}



				<View className="flex flex-row justify-around  space-x-4" >

					<Pressable
						className=" w-1/2 p-4 border border-red-500 flex items-center justify-center rounded-2xl"
						onPress={() => { setShowModalCreatePallet(false) }}>
						<Text className=" text-white text-xl"   >
							СКАСУВАТИ
						</Text>
					</Pressable>


					<Pressable

						className={`w-1/2 p-4 flex items-center justify-center rounded-2xl border ${newPalletTitle ? "border-green-500" : "border-gray-500"}`}
						onPress={() => {
							handleCreatePallet(newPalletTitle)
						}}
						disabled={!newPalletTitle}
					>
						<Text className=" text-white text-xl" >
							СТВОРИТИ
						</Text>
					</Pressable>

				</View>

			</View>


		</Modal>
	)
}