import { View, Text, ActivityIndicator, TextInput, Modal, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { colors500 } from '../../../../../constants/Colors'
import { ScrollView } from 'react-native-gesture-handler'



export default function ModalCreatePos(
	{
		showModalCreatePos,
		setShowModalCreatePos,
		isCreatingPos,
		newPosArtikul,
		setNewPosArtikul,
		newPosQuant,
		setNewPosQuant,
		newPosBoxes,
		setNewPosBoxes,
		newPosDate,
		setNewPosDate,
		newPosSklad,
		setNewPosSklad,
		artsCurrent,
		handleCreatePos
	}
) {
	return (
		<Modal
			animationType="slide"
			visible={showModalCreatePos}
		>


			<View
				className="space-y-4 justify-between  bg-black h-full p-2 "
			>



				<Text className="text-white text-3xl  text-center" >
					Створення позиції
				</Text>



				<ScrollView>

					<View
						className=" flex-1 flex-row  rounded-l-xl"
					>

						<View
							className="  bg-white h-full items-center justify-center rounded-l-xl p-1"
						>
							<Image
								style={{
									height: 80,
									width: 80,
									resizeMode: "contain"
								}}
								className="rounded-xl"
								source={{ uri: `https://sharik.ua/images/elements_big/${newPosArtikul.trim()}_m1.jpg` }}
							/>
						</View>

						<View
							className="flex-1  p-1 justify-center bg-sky-950 rounded-r-xl"
						>
							<Text
								className="text-white text-xl text-center italic"
								numberOfLines={4}
							>
								{artsCurrent?.find((art) => art.artikul === newPosArtikul)?.nameukr}
							</Text>
						</View>

					</View>


					<View>


						<Text className="text-white text-center text-xl">Артикул:</Text>
						<TextInput
							onChangeText={(text => setNewPosArtikul(text))}
							value={newPosArtikul}
							className="h-16 bg-gray-900 text-center font-bold text-2xl text-white rounded-full italic"
							autoFocus={true}
						/>


						<Text className="text-white text-center text-xl">Кількість:</Text>
						<TextInput
							onChangeText={(text => setNewPosQuant(text))}
							value={newPosQuant}
							className="h-16 bg-gray-900 text-center font-bold text-2xl text-white rounded-full italic"
							inputMode="numeric"

						/>



					</View>


				</ScrollView>


				{isCreatingPos && <ActivityIndicator size="large" color={colors500.teal} />}







				<View className="flex-1 px-2 flex-row justify-around  space-x-2" >

					<TouchableOpacity
						className="w-1/2 p-4 border border-red-500 flex items-center justify-center rounded-2xl "
						onPress={() => { setShowModalCreatePos(false) }}>
						<Text className=" text-white text-xl"   >
							СКАСУВАТИ
						</Text>
					</TouchableOpacity>


					<TouchableOpacity

						className={`w-1/2 p-4   flex items-center justify-center rounded-2xl border ${newPosArtikul ? "border-green-500" : "border-gray-500"}`}
						onPress={() => {
							handleCreatePos()
						}}
						disabled={!newPosArtikul}
					>
						<Text className=" text-white text-xl" >
							СТВОРИТИ
						</Text>
					</TouchableOpacity>

				</View>

			</View>


		</Modal>
	)
}