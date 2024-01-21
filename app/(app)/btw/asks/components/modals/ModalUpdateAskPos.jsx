import { View, Text, ActivityIndicator, TextInput, Modal, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors500 } from '../../../../../../constants/Colors'
import { ScrollView } from 'react-native-gesture-handler'
import { SelectList } from 'react-native-dropdown-select-list'
import { Feather, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'

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
				className="space-y-8 justify-between  bg-indigo-950 h-full p-2 "
			>



				<Text className="text-white text-3xl  text-center bg-indigo-900 rounded-xl" >
					Зняття позиції з палети {selectedPosPalletTitle}
				</Text>





				<ScrollView
					className="space-y-4 flex-1"
				>


					<View
						className="flex-1 flex-row items-center justify-between p-2
						bg-blue-500/20 rounded-xl
						
						"
					>

						<Text className="text-white text-2xl  text-center" >
							Зараз:
						</Text>

						<View
							className="flex-row items-center"
						>
							<MaterialCommunityIcons name="balloon" size={24} color="#7dd3fc" />

							<Text className="text-sky-300 text-2xl  text-center" >
								{selectedPos?.quant}
							</Text>

						</View>

						<View
							className="flex-row items-center"
						>
							<Feather name="box" size={24} color="#fde047" />
							<Text className="text-yellow-300 text-2xl  text-center" >
								{selectedPos?.boxes}
							</Text>
						</View>


					</View>






					<View
						className="flex-1 flex-row items-center justify-between p-2
						bg-green-500/20 rounded-xl
						"
					>

						<Text className="text-white text-2xl  text-center" >
							Стане:
						</Text>




						<View
							className="flex-row items-center"
						>
							<MaterialCommunityIcons
								name="balloon"
								size={24}
								color={`${askPosQuantFinalValue < 0
									?
									"#ef4444"
									:
									"#7dd3fc"

									}`} />

							<Text
								className={`${askPosQuantFinalValue < 0
									?
									"text-red-500 "
									:
									"text-sky-300 "

									} text-2xl  text-center`}
							>
								{askPosQuantFinalValue}
							</Text>

						</View>


						<View
							className="flex-row items-center"
						>
							<Feather
								name="box"
								size={24}
								color={`${askPosBoxesFinalValue < 0
									?
									"#ef4444"
									:
									"#fde047"

									}`} />


							<Text
								className={`${askPosBoxesFinalValue < 0
									?
									"text-red-500 "
									:
									"text-yellow-300 "

									} text-2xl  text-center`}
							>
								{askPosBoxesFinalValue}
							</Text>
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









					<View
						className="space-y-4"
					>

						<View
							className="flex-row justify-end items-center rounded-full bg-blue-900/40 focus:bg-blue-700/50  p-3 "
						>
							<Text className="text-white text-center text-xl">Кількість:</Text>
							<TextInput
								onChangeText={(text => {
									setAskPosQuantValue(text)
									setAskPosQuantFinalValue(selectedPos?.quant - text)
								}

								)}
								value={askPosQuantValue}
								className=" w-full flex-1 text-center font-bold text-2xl text-white rounded-full italic"
								inputMode="numeric"

							/>
						</View>


						<View
							className="flex-row justify-end items-center rounded-full bg-blue-900/40 focus:bg-blue-700/50  p-3 "
						>
							<Text className="text-white text-center text-xl">Коробок:</Text>
							<TextInput
								onChangeText={(text => {
									setAskPosBoxesValue(text)
									setAskPosBoxesFinalValue(selectedPos?.boxes - text)
								}

								)}
								value={askPosBoxesValue}
								className=" w-full flex-1  text-center font-bold text-2xl text-white rounded-full italic"
								inputMode="numeric"

							/>
						</View>




					</View>






				</ScrollView>






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

						{isUpdatingAskPos

							?
							<ActivityIndicator size="large" color={colors500.indigo} />
							:
							<Text className=" text-white text-xl" >
								ЗНЯТИ
							</Text>
						}




					</TouchableOpacity>

				</View>

			</View>

		</Modal >
	)
}