import { View, Text, Modal, Pressable, ActivityIndicator } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { colors500 } from '../../../../../../constants/Colors'
import { LinearGradient } from 'expo-linear-gradient'



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

			{/* <LinearGradient colors={['#f97316', '#0f172aee']} > */}

				<View
					className="bg-slate-900 h-full justify-between p-4 "
				>
					<Text className="text-white text-3xl  text-center" >
						Створення палети для ряду {row?.title}
					</Text>



					<View
						className="flex-row justify-end items-center rounded-full bg-slate-700 focus:bg-slate-500 p-3 "
					>

						<TextInput
							onChangeText={(text => setNewPalletTitle(text))}
							value={newPalletTitle}
							className=" h-10 flex-1 text-2xl text-center text-white italic "
							autoFocus={true}
						/>
					</View>





					<View className="flex flex-row justify-around  space-x-4" >

						<Pressable
							className=" w-1/2 p-4 border bg-red-600 border-red-500 flex items-center justify-center rounded-2xl"
							onPress={() => { setShowModalCreatePallet(false) }}>
							<Text className=" text-white text-xl"   >
								СКАСУВАТИ
							</Text>
						</Pressable>


						<Pressable

							className={`w-1/2 p-4 flex items-center justify-center rounded-2xl border ${newPalletTitle ? "bg-green-600 border-green-500" : "bg-gray-600 border-gray-500"}`}
							onPress={() => {
								handleCreatePallet(newPalletTitle)
							}}
							disabled={!newPalletTitle || isCreatingPallet}
						>

							{isCreatingPallet ?
								<ActivityIndicator size="large" color={colors500.green} />
								:
								<Text className=" text-white text-xl" >
									СТВОРИТИ
								</Text>
							}
						</Pressable>

					</View>

				</View>
			{/* </LinearGradient> */}

		</Modal>
	)
}