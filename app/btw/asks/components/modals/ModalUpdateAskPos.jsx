import { View, Text, ActivityIndicator, TextInput, Modal, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors500 } from '../../../../../constants/Colors'
import { ScrollView } from 'react-native-gesture-handler'
import { SelectList } from 'react-native-dropdown-select-list'
import { FontAwesome } from '@expo/vector-icons'

export default function ModalUpdateAskPos({
	showModalUpdatePos,
	setShowModalUpdatePos,
	selectedPos,
	isUpdatingPosById,
	handleUpdatePosById
}) {









	async function handleUpdateAskPos() {

		try {
			setIsUpdatingAskPos(true)

			const posUpdateData = {
				boxes: finalValuePosBoxes,
				quant: finalValuePosQuant,

			}

			const askUpdateData = {
				...ask,
				actions: [...ask?.actions, `
				З палети ${selectedPosPalletTitle} було знято: кульок  ${askValuePosQuant}, 
				коробок ${askValuePosBoxes}
				`]
			}

			console.log(askUpdateData);

			const updatedPos = await updatePosWithArtikulById(selectedPos._id, posUpdateData)
			console.log(updatedPos)


			const updatedAsk = await updateAskById(id, askUpdateData)
			console.log(updatedAsk)
			if (updatedAsk) setAsk(updatedAsk)




		} catch (error) {
			console.log(error)
		} finally {
			setIsUpdatingPos(false)
			setShowModalAsk(false)
		}

	}









	return (
		<Modal
			animationType="slide"
			visible={showModalUpdatePos}
		>
			<View
				className="space-y-4 justify-between  bg-black h-full p-2 "
			>



				<Text className="text-white text-3xl  text-center" >
					Редагування позиції {selectedPos?.artikul}
				</Text>





				<ScrollView
					className="space-y-2 flex-1"

				>



					<View
						className="space-y-2"
					>

						<View
							className="flex-1 flex-row items-center justify-start space-x-1"
						>
							<Text className="text-white text-center text-xl">Кількість:</Text>
							<TextInput
								onChangeText={(text => setUpdatePosQuantValue(text))}
								value={updatePosQuantValue}
								className="h-16 w-full flex-1 bg-gray-900 text-center font-bold text-2xl text-white rounded-full italic"
								inputMode="numeric"

							/>
						</View>

						<View
							className="flex-1 flex-row items-center justify-start space-x-1"
						>
							<Text className="text-white text-center text-xl">Коробок:</Text>
							<TextInput
								onChangeText={(text => setUpdatePosBoxesValue(text))}
								value={updatePosBoxesValue}
								className="h-16 w-full flex-1 bg-gray-900 text-center font-bold text-2xl text-white rounded-full italic"
								inputMode="numeric"

							/>
						</View>





					</View>


				</ScrollView>


				{isUpdatingPosById && <ActivityIndicator size="large" color={colors500.teal} />}







				<View className=" px-2 flex-row justify-around  space-x-2" >

					<TouchableOpacity
						className="w-1/2 p-4 border border-red-500 flex items-center justify-center rounded-2xl "
						onPress={() => { setShowModalUpdatePos(false) }}>
						<Text className=" text-white text-xl"   >
							СКАСУВАТИ
						</Text>
					</TouchableOpacity>


					<TouchableOpacity

						className={`w-1/2 p-4   flex items-center justify-center rounded-2xl border border-green-500`}
						onPress={() => {
							handleUpdateAskPos()
						}}

					>
						<Text className=" text-white text-xl" >
							ЗНЯТИ
						</Text>
					</TouchableOpacity>

				</View>

			</View>

		</Modal >
	)
}