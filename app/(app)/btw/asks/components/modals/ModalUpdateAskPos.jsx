import { View, Text, ActivityIndicator, TextInput, Modal, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors500 } from '../../../../../../constants/Colors'
import { ScrollView } from 'react-native-gesture-handler'
import { SelectList } from 'react-native-dropdown-select-list'
import { FontAwesome } from '@expo/vector-icons'

export default function ModalUpdateAskPos({
	showModalUpdateAskPos,
	setShowModalUpdateAskPos,
	selectedPos,
	selectedPosPalletTitle,
	askPosBoxesFinalValue,
	setAskPosBoxesFinalValue,
	askPosQuantFinalValue,
	setAskPosQuantFinalValue,
	askPosBoxesValue,
	setAskPosBoxesValue,
	askPosQuantValue,
	setAskPosQuantValue,
	isUpdatingAskPos,
	handleUpdateAskPos
}) {





	return (
		<Modal
			animationType="slide"
			visible={showModalUpdateAskPos}
		>
			<View
				className="space-y-4 justify-between  bg-black h-full p-2 "
			>



				<Text className="text-white text-3xl  text-center" >
					Зняття позиції з палети {selectedPosPalletTitle}
				</Text>





				<ScrollView
					className="space-y-2 flex-1"
				>


					<View
						className="flex-1 flex-row items-center justify-between"
					>
						<Text className="text-white text-2xl  text-center" >
							Зараз
						</Text>



						<Text className="text-yellow-500 text-2xl  text-center" >
							{selectedPos?.boxes}
						</Text>



						<Text className="text-sky-500 text-2xl  text-center" >
							{selectedPos?.quant}
						</Text>

					</View>


					<View
						className="flex-1 flex-row items-center justify-between"
					>
						<Text className="text-white text-2xl  text-center" >
							Стане
						</Text>



						<Text className="text-yellow-500 text-2xl  text-center" >
							{askPosBoxesFinalValue}
						</Text>



						<Text className="text-sky-500 text-2xl  text-center" >
							{askPosQuantFinalValue}
						</Text>

					</View>













					<View
						className="space-y-2"
					>

						<View
							className="flex-1 flex-row items-center justify-start space-x-1"
						>
							<Text className="text-white text-center text-xl">Коробок:</Text>
							<TextInput
								onChangeText={(text => {
									setAskPosBoxesValue(text)
									setAskPosBoxesFinalValue(selectedPos?.boxes - text)
								}

								)}
								value={askPosBoxesValue}
								className="h-16 w-full flex-1 bg-gray-900 text-center font-bold text-2xl text-white rounded-full italic"
								inputMode="numeric"

							/>
						</View>


						<View
							className="flex-1 flex-row items-center justify-start space-x-1"
						>
							<Text className="text-white text-center text-xl">Кількість:</Text>
							<TextInput
								onChangeText={(text => {
									setAskPosQuantValue(text)
									setAskPosQuantFinalValue(selectedPos?.quant - text)
								}

								)}
								value={askPosQuantValue}
								className="h-16 w-full flex-1 bg-gray-900 text-center font-bold text-2xl text-white rounded-full italic"
								inputMode="numeric"

							/>
						</View>


					</View>


					{askPosBoxesFinalValue < 0 && <Text
						className="text-center text-2xl border border-red-600 text-red-600 p-2 rounded-xl"
					>
						Коробки в мінусі
					</Text>}


					{askPosQuantFinalValue < 0 && <Text
						className="text-center text-2xl border border-red-600 text-red-600 p-2 rounded-xl"
					>
						Недостатньо позиції
					</Text>}


			

				</ScrollView>


				{isUpdatingAskPos && <ActivityIndicator size="large" color={colors500.indigo} />}



				<View className=" px-2 flex-row justify-around  space-x-2" >

					<TouchableOpacity
						className="w-1/2 p-4 border border-red-500 flex items-center justify-center rounded-2xl "
						onPress={() => { setShowModalUpdateAskPos(false) }}>
						<Text className=" text-white text-xl"   >
							СКАСУВАТИ
						</Text>
					</TouchableOpacity>


					<TouchableOpacity

						className={`w-1/2 p-4   flex items-center justify-center rounded-2xl border ${!askPosQuantValue ||
							askPosBoxesFinalValue < 0 ||
							askPosQuantFinalValue < 0
							? 
							"border-gray-500" 
							: 
							"border-green-500"}`}
						onPress={() => {
							handleUpdateAskPos()
						}}
						disabled={
							!askPosQuantValue ||
							askPosBoxesFinalValue < 0 ||
							askPosQuantFinalValue < 0


						}
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