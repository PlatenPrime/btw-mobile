import { View, Text, ActivityIndicator, TextInput, Modal, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors500 } from '../../../../../../constants/Colors'
import { ScrollView } from 'react-native-gesture-handler'
import { SelectList } from 'react-native-dropdown-select-list'
import { FontAwesome } from '@expo/vector-icons'

export default function ModalUpdatePos({
	showModalUpdatePos,
	setShowModalUpdatePos,
	selectedPos,
	artsCurrent,
	isUpdatingPosById,
	handleUpdatePosById
}) {




	const [updatePosQuantValue, setUpdatePosQuantValue] = useState("")
	const [updatePosBoxesValue, setUpdatePosBoxesValue] = useState("")
	const [updatePosDateValue, setUpdatePosDateValue] = useState("")
	const [updatePosSkladValue, setUpdatePosSkladValue] = useState("")
	const [updatePosComValue, setUpdatePosComValue] = useState("")


	const listSklad = [{
		key: "pogrebi",
		value: "Погреби",
	},
	{
		key: "merezhi",
		value: "Мережі",
	},]




	useEffect(() => {
		setUpdatePosQuantValue(selectedPos?.quant?.toString())
		setUpdatePosBoxesValue(selectedPos?.boxes?.toString())
		setUpdatePosDateValue(selectedPos?.date)
		setUpdatePosSkladValue(selectedPos?.sklad)
		setUpdatePosComValue(selectedPos?.com)

	}, [selectedPos])









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
								source={{ uri: `https://sharik.ua/images/elements_big/${selectedPos?.artikul.trim()}_m1.jpg` }}
							/>
						</View>

						<View
							className="flex-1  p-1 justify-center border border-sky-500 bg-sky-500/10 rounded-r-xl"
						>
							<Text
								className="text-white text-xl text-center italic"
								numberOfLines={4}
							>
								{artsCurrent?.find((art) => art.artikul === selectedPos?.artikul)?.nameukr}
							</Text>
						</View>

					</View>


					<View
						className="space-y-2"
					>

						<View
							className="flex-row justify-end items-center rounded-full bg-gray-700/50 focus:bg-gray-700 p-3 "
						>
							<Text className="text-white text-center text-xl">Кількість:</Text>
							<TextInput
								onChangeText={(text => setUpdatePosQuantValue(text))}
								value={updatePosQuantValue}
								className=" h-10 flex-1 text-2xl text-center text-white italic "
								inputMode="numeric"

							/>
						</View>

						<View
							className="flex-row justify-end items-center rounded-full bg-gray-700/50 focus:bg-gray-700 p-3 "
						>

							<Text className="text-white text-center text-xl">Коробок:</Text>
							<TextInput
								onChangeText={(text => setUpdatePosBoxesValue(text))}
								value={updatePosBoxesValue}
								className=" h-10 flex-1 text-2xl text-center text-white italic "
								inputMode="numeric"

							/>
						</View>

						<View
							className="flex-row justify-end items-center rounded-full bg-gray-700/50 focus:bg-gray-700 p-3 "
						>

							<Text className="text-white text-center text-xl">Дата:</Text>
							<TextInput
								onChangeText={(text => setUpdatePosDateValue(text))}
								value={updatePosDateValue}
								className=" h-10 flex-1 text-2xl text-center text-white italic "
								placeholder="MM.РР"
								placeholderTextColor="gray"

							/>
						</View>





						<View>

							<SelectList
								placeholder="Вибери склад"
								setSelected={(val) => setUpdatePosSkladValue(val)}
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
								defaultOption={
									listSklad.find(opt => opt.key === updatePosSkladValue) ?
										listSklad.find(opt => opt.key === updatePosSkladValue) :
										{ key: "pogrebi", value: "Погреби", }
								}
							/>
						</View>


						<View
							className="flex-row justify-end items-center rounded-full bg-gray-700/50 focus:bg-gray-700 p-3 "
						>

							<Text className="text-white text-center text-xl">Комент:</Text>
							<TextInput
								onChangeText={(text => setUpdatePosComValue(text))}
								value={updatePosComValue}
								className=" h-10 flex-1 text-2xl text-center text-white italic "
								placeholder="..."
								placeholderTextColor="gray"

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
							handleUpdatePosById(selectedPos?._id,
								{
									quant: updatePosQuantValue,
									boxes: updatePosBoxesValue,
									date: updatePosDateValue,
									sklad: updatePosSkladValue,
									com: updatePosComValue,
								}
							)
							setUpdatePosQuantValue("")
							setUpdatePosBoxesValue("")
							setUpdatePosDateValue("")
							setUpdatePosComValue("")
							setUpdatePosSkladValue({ key: 'pogrebi', value: 'Погреби' })
						}}

					>
						<Text className=" text-white text-xl" >
							ЗМІНИТИ
						</Text>
					</TouchableOpacity>

				</View>

			</View>

		</Modal >
	)
}