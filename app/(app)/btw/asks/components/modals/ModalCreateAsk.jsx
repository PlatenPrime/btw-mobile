import { View, Text, Modal, Image, TextInput, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { colors500 } from "../../../../../../constants/Colors"

import { LinearGradient } from 'expo-linear-gradient';






export default function ModalCreateAsk({
	showModalCreateAsk,
	setShowModalCreateAsk,
	isAskCreating,
	artsCurrent,
	handleCreateAsk,
	user

}) {


	const [newAskArtikul, setNewAskArtikul] = useState('')
	const [newAskQuant, setNewAskQuant] = useState('')
	const [newAskCom, setNewAskCom] = useState('')







	return (
		<Modal
			animationType="slide"
			visible={showModalCreateAsk}
			className="bg-red-700"
		>
			<LinearGradient colors={['#3730a3', '#1e1b4b',]} >





				<View
					className="space-y-4 justify-between   h-full p-2 "
				>




					<Text className="text-white text-3xl  text-center" >
						Створення запиту на зняття
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
									source={{ uri: `https://sharik.ua/images/elements_big/${newAskArtikul.trim()}_m1.jpg` }}
								/>
							</View>

							<View
								className={`flex-1 space-y-2 p-1 justify-center border ${artsCurrent?.find((art) => art.artikul === newAskArtikul) ? "border-sky-500 bg-sky-500/20" : "border-red-500 bg-red-500/20"}   rounded-r-xl`}
							>
								<Text
									className="text-white text-xl text-center italic"
									numberOfLines={4}
								>
									{artsCurrent?.find((art) => art.artikul === newAskArtikul)?.nameukr
										?
										artsCurrent?.find((art) => art.artikul === newAskArtikul)?.nameukr
										:
										newAskArtikul
									}
								</Text>
							</View>

						</View>


						<View
							className="space-y-2"
						>

							<View
								className="flex-row justify-end items-center rounded-full bg-gray-700/50 focus:bg-gray-900/50 p-3 "
							>

								<Text className="text-white text-center text-xl">Артикул:</Text>
								<TextInput
									onChangeText={(text => setNewAskArtikul(text.trim()))}
									value={newAskArtikul}
									className=" h-10 flex-1 text-2xl text-center text-white italic "
									autoFocus={true}
								/>
							</View>

							<View
								className="flex-row justify-end items-center rounded-full bg-gray-700/50 focus:bg-gray-900/50 p-3 "
							>
								<Text className="text-white text-center text-xl">Кількість:</Text>
								<TextInput
									onChangeText={(text => setNewAskQuant(text))}
									value={newAskQuant}
									className=" h-10 flex-1 text-2xl text-center text-white italic "
									inputMode="numeric"

								/>
							</View>
							<View
								className="flex-row justify-end items-center rounded-full bg-gray-700/50 focus:bg-gray-900/50 p-3 "
							>
								<Text className="text-white text-center text-xl">Комент:</Text>
								<TextInput
									onChangeText={(text => setNewAskCom(text))}
									value={newAskCom}
									className=" h-10 flex-1 text-2xl text-center text-white italic "


								/>
							</View>




						</View>


					</ScrollView>


					{isAskCreating && <ActivityIndicator size="large" color={colors500.indigo} />}







					<View className=" px-2 flex-row justify-around mb-4  space-x-2" >

						<TouchableOpacity
							className="w-1/2 p-4 border border-red-500 flex items-center justify-center rounded-2xl "
							onPress={() => { setShowModalCreateAsk(false) }}>
							<Text className=" text-white text-xl"   >
								СКАСУВАТИ
							</Text>
						</TouchableOpacity>


						<TouchableOpacity

							className={`w-1/2 p-4   flex items-center justify-center rounded-2xl border ${newAskArtikul ? "border-green-500" : "border-gray-500"}`}
							onPress={() => {
								handleCreateAsk({
									artikul: newAskArtikul,
									quant: +newAskQuant,
									com: newAskCom,
									asker: user?._id,
									status: "new"
								})
								setNewAskArtikul("")
								setNewAskQuant("")
								setNewAskCom("")

							}}
							disabled={!newAskArtikul}
						>
							<Text className=" text-white text-xl" >
								СТВОРИТИ
							</Text>
						</TouchableOpacity>

					</View>

				</View>
			</LinearGradient>
		</Modal>
	)
}