import { View, Text, ActivityIndicator, Modal, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors500 } from '../../../../../../constants/Colors'


export default function ModalDeleteAsk({
	showModalFailAsk,
	setShowModalFailAsk,
	ask,
	isFailingAsk,
	handleFailAskById,
}) {
	return (
		<Modal
			animationType="slide"
			visible={showModalFailAsk}


		>
			<View
				className="bg-rose-500/80 h-full justify-between p-4 "
			>
				<Text className="text-white text-3xl  text-center" >
					Відмова у виконанні запиту на {ask?.artikul}
				</Text>




				{isFailingAsk && <ActivityIndicator size="large" color={colors500.rose} />}



				<View className="flex flex-row justify-around space-x-4 mb-4" >

					<TouchableOpacity
						className=" p-4 border border-red-500 flex items-center justify-center rounded-2xl "
						onPress={() => { setShowModalFailAsk(false) }}>
						<Text className=" text-white text-xl"   >
							СКАСУВАТИ
						</Text>
					</TouchableOpacity>


					<TouchableOpacity

						className="p-4   flex items-center justify-center rounded-2xl border border-green-500"
						onPress={() => {
							handleFailAskById()
						}}

					>
						<Text className=" text-white text-xl" >
							ВІДМОВИТИ
						</Text>
					</TouchableOpacity>

				</View>

			</View>


		</Modal>
	)
}