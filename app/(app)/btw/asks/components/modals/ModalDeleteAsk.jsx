import { View, Text, ActivityIndicator, Modal, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors500 } from '../../../../../../constants/Colors'


import { LinearGradient } from 'expo-linear-gradient';


export default function ModalDeleteAsk({
	showModalDeleteAsk,
	setShowModalDeleteAsk,
	ask,
	isDeletingAskById,
	handleDeleteAskById,
}) {
	return (
		<Modal
			animationType="slide"
			visible={showModalDeleteAsk}


		>

			{/* <LinearGradient colors={['#b91c1c', '#450a0aee',]} > */}

				<View
					className="bg-slate-900 h-full justify-center space-y-8 p-4 "
				>
					<Text className="text-white text-3xl  text-center" >
						Видалити запит на {ask?.artikul}?
					</Text>








					<View className="flex flex-row justify-around space-x-4" >

						<TouchableOpacity
							className="w-1/2 p-4 bg-red-600 border border-red-500 flex items-center justify-center rounded-2xl "
							onPress={() => { setShowModalDeleteAsk(false) }}>
							<Text className=" text-white text-xl"   >
								СКАСУВАТИ
							</Text>
						</TouchableOpacity>


						<TouchableOpacity

							className="w-1/2 p-4   flex items-center justify-center rounded-2xl bg-green-600 border border-green-500"
							onPress={() => {
								handleDeleteAskById()
							}}

						>

							{isDeletingAskById ?

								<ActivityIndicator size="large" color={colors500.green} />
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