import { View, Text, ActivityIndicator, TextInput, Modal, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { colors500 } from '../../../../../constants/Colors'
import { ScrollView } from 'react-native-gesture-handler'
import { SelectList } from 'react-native-dropdown-select-list'
import { FontAwesome } from '@expo/vector-icons'





export default function ModalCreatePos(
	{
		showModalCreatePos,
		setShowModalCreatePos,
		isCreatingPos,
		artsCurrent,
		handleCreatePos
	}
) {



	const [newPosArtikul, setNewPosArtikul] = useState("")
	const [newPosQuant, setNewPosQuant] = useState("")
	const [newPosBoxes, setNewPosBoxes] = useState("")
	const [newPosDate, setNewPosDate] = useState("")
	const [newPosSklad, setNewPosSklad] = useState("")





	const listSklad = [{
		key: "pogrebi",
		value: "Погреби",
	},
	{
		key: "merezhi",
		value: "Мережі",
	},]














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





				<ScrollView
					className="space-y-2 flex-1"

				>

					<View
						className=" flex-1 flex-row  rounded-l-xl"
					>

						<View
							className="  bg-white h-full items-center justify-center rounded-l-xl p-1"
						>
							<Image
								style={{
									height: 100,
									width: 100,
									resizeMode: "contain"
								}}
								className="rounded-xl"
								source={{ uri: `https://sharik.ua/images/elements_big/${newPosArtikul.trim()}_m1.jpg` }}
							/>
						</View>

						<View
							className="flex-1  p-1 justify-center border border-sky-500 bg-sky-500/10 rounded-r-xl"
						>
							<Text
								className="text-white text-xl text-center italic"
								numberOfLines={4}
							>
								{artsCurrent?.find((art) => art.artikul === newPosArtikul)?.nameukr}
							</Text>
						</View>

					</View>


					<View
						className="space-y-2"
					>

						<View
							className="flex-1 flex-row items-center justify-start space-x-1"
						>
							<Text className="text-white text-center text-xl">Артикул:</Text>
							<TextInput
								onChangeText={(text => setNewPosArtikul(text))}
								value={newPosArtikul}
								className="h-16 w-full flex-1 bg-gray-900 text-center font-bold text-2xl text-white rounded-full italic"
								autoFocus={true}
							/>
						</View>

						<View
							className="flex-1 flex-row items-center justify-start space-x-1"
						>
							<Text className="text-white text-center text-xl">Кількість:</Text>
							<TextInput
								onChangeText={(text => setNewPosQuant(text))}
								value={newPosQuant}
								className="h-16 w-full flex-1 bg-gray-900 text-center font-bold text-2xl text-white rounded-full italic"
								inputMode="numeric"

							/>
						</View>

						<View
							className="flex-1 flex-row items-center justify-start space-x-1"
						>
							<Text className="text-white text-center text-xl">Коробок:</Text>
							<TextInput
								onChangeText={(text => setNewPosBoxes(text))}
								value={newPosBoxes}
								className="h-16 w-full flex-1 bg-gray-900 text-center font-bold text-2xl text-white rounded-full italic"
								inputMode="numeric"

							/>
						</View>

						<View
							className="flex-1 flex-row items-center justify-start space-x-1"
						>
							<Text className="text-white text-center text-xl">Дата:</Text>
							<TextInput
								onChangeText={(text => setNewPosDate(text))}
								value={newPosDate}
								className="h-16 w-full flex-1 bg-gray-900 text-center font-bold text-2xl text-white rounded-full italic"
								placeholder="MM-РРРР"
								placeholderTextColor="gray"

							/>
						</View>





						<View>

							<SelectList
								placeholder="Вибери склад"
								setSelected={(val) => setNewPosSklad(val)}
								data={listSklad}
								save="key"
								inputStyles={{ color: "white", fontSize: 24, }}
								arrowicon={<FontAwesome name="chevron-down" size={16} color={'white'} />}
								boxStyles={{

									backgroundColor: "",
								}}
								search={false}
								dropdownItemStyles={{}}
								dropdownTextStyles={{ color: "white", fontSize: 24, }}
								defaultOption={{ key: 'pogrebi', value: 'Погреби' }}
							/>
						</View>




					</View>


				</ScrollView>


				{isCreatingPos && <ActivityIndicator size="large" color={colors500.teal} />}







				<View className=" px-2 flex-row justify-around  space-x-2" >

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
							handleCreatePos({
								newPosArtikul,
								newPosQuant,
								newPosBoxes,
								newPosDate,
								newPosSklad
							})
							setNewPosArtikul("")
							setNewPosQuant("")
							setNewPosBoxes("")
							setNewPosDate("")
							setNewPosSklad({ key: 'pogrebi', value: 'Погреби' })


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