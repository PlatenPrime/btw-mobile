import { View, Text, Modal, Pressable, ActivityIndicator, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors500 } from '../../../../../../constants/Colors'
import { LinearGradient } from 'expo-linear-gradient'


export default function ModalDeleteRow({
	showModalDeleteRow,
	setShowModalDeleteRow,
	rowTitle,
	isDeletingRowById,
	handleDeleteRowById
}) {
	return (
		<Modal
			animationType="slide"
			visible={showModalDeleteRow}


		>
			{/* <LinearGradient colors={['#ef4444', '#0f172aee']} > */}


				<View
					className="bg-slate-900 h-full justify-center space-y-8 p-4 "
				>
					<Text className="text-white text-3xl  text-center" >
						Видалити ряд {rowTitle}?
					</Text>








					<View className="flex flex-row justify-around space-x-4 mb-4" >

						<TouchableOpacity
							className="w-1/2 p-4 bg-red-600 border border-red-500  items-center justify-center rounded-2xl "
							onPress={() => { setShowModalDeleteRow(false) }}>
							<Text className=" text-white text-xl"   >
								СКАСУВАТИ
							</Text>
						</TouchableOpacity>


						<TouchableOpacity

							className=" w-1/2 p-4   items-center justify-center rounded-2xl bg-green-600 border border-green-500"
							onPress={() => {
								handleDeleteRowById()
							}}
							disabled={isDeletingRowById}

						>
							{isDeletingRowById ?
								<ActivityIndicator size="large" color={colors500.red}
								/>
								:
								<Text className=" text-white text-xl" >
									ВИДАЛИТИ
								</Text>
							}

						</TouchableOpacity>

					</View>

				</View>
			{/* </LinearGradient> */}

		</Modal>

	)
}