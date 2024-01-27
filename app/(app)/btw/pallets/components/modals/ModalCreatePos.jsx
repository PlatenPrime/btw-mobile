import { View, Text, ActivityIndicator, TextInput, Modal, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { colors500 } from '../../../../../../constants/Colors'
import { ScrollView } from 'react-native-gesture-handler'
import { SelectList } from 'react-native-dropdown-select-list'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient';




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
	const [newPosCom, setNewPosCom] = useState("")





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
				className="space-y-4 justify-between  bg-teal-950 h-full p-2 "
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
							className={`flex-1 space-y-2 p-1 justify-center border ${artsCurrent?.find((art) => art.artikul === newPosArtikul) ? "border-sky-500 bg-sky-500/20" : "border-red-500 bg-red-500/20"}   rounded-r-xl`}
						>
							<Text
								className="text-white text-xl text-center italic"
								numberOfLines={4}
							>
								{artsCurrent?.find((art) => art.artikul === newPosArtikul)?.nameukr}
							</Text>

							{artsCurrent?.find((art) => art.artikul === newPosArtikul) &&
								<Text
									className="text-white text-2xl text-orange-300 font-bold text-center italic p-2 rounded-xl bg-orange-500/10"
									numberOfLines={4}
								>
									<Ionicons name="location-outline" size={24} color="#fdba74" />
									{artsCurrent?.find((art) => art.artikul === newPosArtikul)?.zone}
								</Text>}


						</View>

					</View>


					<View
						className="space-y-2"
					>

						<View
							className="flex-row justify-end items-center rounded-full bg-blue-900/40 focus:bg-blue-700/50 p-3 "
						>
							<Text className="text-white text-center text-xl">Артикул:</Text>
							<TextInput
								onChangeText={(text => setNewPosArtikul(text.trim()))}
								value={newPosArtikul}
								className=" h-10 flex-1 text-2xl text-center text-white italic "
								autoFocus={true}
							/>
						</View>






						<View
							className="flex-row justify-end items-center rounded-full bg-blue-900/40 focus:bg-blue-700/50  p-3 "
						>

							<Text className="text-white text-center text-xl">Кількість:</Text>
							<TextInput
								onChangeText={(text => setNewPosQuant(text.trim()))}
								value={newPosQuant}
								className=" h-10 flex-1 text-2xl text-center text-white italic "
								inputMode="numeric"

							/>
						</View>

						{!isNaN(newPosQuant) ? null : <Text className="text-red-500 text-xl text-center ">Кількість товару не в форматі числа </Text>}

						<View
							className="flex-row justify-end items-center rounded-full bg-blue-900/40 focus:bg-blue-700/50  p-3 "
						>
							<Text className="text-white text-center text-xl">Коробок:</Text>
							<TextInput
								onChangeText={(text => setNewPosBoxes(text.trim()))}
								value={newPosBoxes}
								className=" h-10 flex-1 text-2xl text-center text-white italic "
								inputMode="numeric"

							/>
						</View>


						{!isNaN(newPosBoxes) ? null : <Text className=" text-red-500 text-xl  text-center ">Кількість коробок не в форматі числа </Text>}

						<View
							className="flex-row justify-end items-center rounded-full bg-blue-900/40 focus:bg-blue-700/50 p-3 "
						>

							<Text className="text-white text-center text-xl">Дата:</Text>
							<TextInput
								onChangeText={(text => setNewPosDate(text))}
								value={newPosDate}
								className=" h-10 flex-1 text-2xl text-center text-white italic "
								placeholder="MM.РР"
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
								dropdownTextStyles={{ color: "white", fontSize: 24, textAlign: "center" }}
								defaultOption={{ key: 'pogrebi', value: 'Погреби' }}
							/>
						</View>


						<View
							className="flex-row justify-end items-center rounded-full bg-blue-900/40 focus:bg-blue-700/50 p-3 "
						>
							<Text className="text-white text-center text-xl">Комент:</Text>
							<TextInput
								onChangeText={(text => setNewPosCom(text))}
								value={newPosCom}
								className=" h-10 flex-1 text-2xl text-center text-white italic "
								placeholder="...."
								placeholderTextColor="gray"

							/>
						</View>





					</View>


				</ScrollView>










				<View className=" px-2 py-4 flex-row justify-around  space-x-2" >

					<TouchableOpacity
						className="w-1/2 p-4 border border-red-500 flex items-center justify-center rounded-2xl "
						onPress={() => { setShowModalCreatePos(false) }}>
						<Text className=" text-white text-xl"   >
							СКАСУВАТИ
						</Text>
					</TouchableOpacity>


					<TouchableOpacity

						className={`w-1/2 p-4   flex items-center justify-center rounded-2xl border ${newPosArtikul && newPosQuant && newPosBoxes ? "border-green-500" : "border-gray-500"}`}
						onPress={() => {
							handleCreatePos({
								newPosArtikul,
								newPosQuant,
								newPosBoxes,
								newPosDate,
								newPosSklad,
								newPosCom,

							})
							setNewPosArtikul("")
							setNewPosQuant("")
							setNewPosBoxes("")
							setNewPosDate("")
							setNewPosSklad({ key: 'pogrebi', value: 'Погреби' }),
								setNewPosCom("")


						}}
						disabled={!newPosArtikul || !newPosQuant || !newPosBoxes}
					>


						{isCreatingPos
							?
							<ActivityIndicator size="large" color={colors500.green} />
							:
							<Text className=" text-white text-xl" >
								СТВОРИТИ
							</Text>
						}


					</TouchableOpacity>

				</View>

			</View>


		</Modal>
	)
}