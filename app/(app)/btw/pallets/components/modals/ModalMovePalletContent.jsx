import { View, Text, ActivityIndicator, Modal, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors500 } from '../../../../../../constants/Colors'
import { SelectList } from 'react-native-dropdown-select-list'
import { ScrollView } from 'react-native-gesture-handler'
import { FontAwesome } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient';


export default function ModalMovePalletContent({
	showModalMovePalletContent,
	setShowModalMovePalletContent,
	pallet,
	palletTitle,
	allPallets,
	setSelectedPalletId,
	selectedPalletId,
	isMovingPalletContent,
	handleMovePalletContent
}) {
	return (
		<Modal
			animationType="slide"
			visible={showModalMovePalletContent}


		>
			{/* <LinearGradient colors={['#eab308', '#a16207ee']} > */}
				<View
					className=" 
				bg-slate-900
				h-full justify-between p-4 space-y-8"
				>
					<Text className="text-white text-3xl  text-center" >
						Переставляння палети {palletTitle}
					</Text>



					<ScrollView
						className="space-y-2 flex-1"

					>


						<View>

							<SelectList
								placeholder="Вибери палету"
								setSelected={(val) => setSelectedPalletId(val)}
								data={allPallets.map((item) => {
									return { key: item._id, value: item.title }
								}
								)}
								save="key"
								inputStyles={{ color: "white", fontSize: 24, height: 36, }}
								arrowicon={<FontAwesome name="chevron-down" size={16} color={'white'} />}
								boxStyles={{

									backgroundColor: "",
								}}

								dropdownItemStyles={{}}
								dropdownTextStyles={{ color: "white", fontSize: 36, textAlign: "center" }}

							/>
						</View>

						<View>
							<Text>{selectedPalletId}</Text>
							<Text>{pallet?._id}</Text>
						</View>


					</ScrollView>








					<View className="flex flex-row justify-around space-x-4" >

						<TouchableOpacity
							className=" p-4 w-1/2 bg-red-600  border border-red-500 flex items-center justify-center rounded-2xl "
							onPress={() => { setShowModalMovePalletContent(false) }}>
							<Text className=" text-white text-xl"   >
								СКАСУВАТИ
							</Text>
						</TouchableOpacity>


						<TouchableOpacity

							className={`p-4 w-1/2   flex items-center justify-center rounded-2xl border 
						
						${selectedPalletId && (pallet?._id !== selectedPalletId) ? "bg-green-600 border-green-600" : "bg-gray-600 border-gray-500"}`}
							onPress={selectedPalletId && (pallet?._id !== selectedPalletId) ? () =>  handleMovePalletContent(pallet._id, selectedPalletId) : null	}
						

						>
							{isMovingPalletContent
								?
								<ActivityIndicator size="large" color={colors500.green} />
								:
								<Text className=" text-white text-xl" >
									ПЕРЕСТАВИТИ
								</Text>

							}

						</TouchableOpacity>

					</View>

				</View>
			{/* </LinearGradient> */}

		</Modal>

	)
}