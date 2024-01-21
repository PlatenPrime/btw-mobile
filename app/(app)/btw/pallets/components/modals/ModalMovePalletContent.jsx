import { View, Text, ActivityIndicator, Modal, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors500 } from '../../../../../../constants/Colors'
import { SelectList } from 'react-native-dropdown-select-list'
import { ScrollView } from 'react-native-gesture-handler'
import { FontAwesome } from '@expo/vector-icons'


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
			<View
				className=" bg-indigo-900 to-90% 
				
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


				</ScrollView>








				<View className="flex flex-row justify-around space-x-4" >

					<TouchableOpacity
						className=" p-4 w-1/2  border border-red-500 flex items-center justify-center rounded-2xl "
						onPress={() => { setShowModalMovePalletContent(false) }}>
						<Text className=" text-white text-xl"   >
							СКАСУВАТИ
						</Text>
					</TouchableOpacity>


					<TouchableOpacity

						className={`p-4 w-1/2   flex items-center justify-center rounded-2xl border 
						
						${pallet?._id !== selectedPalletId ? "border-green-500" : "border-gray-500"}`}
						onPress={() => {
							handleMovePalletContent(pallet._id, selectedPalletId)
						}}
						disabled={pallet?._id === selectedPalletId}

					>
						{isMovingPalletContent
							?
							<ActivityIndicator size="large" color={colors500.violet} />
							:
							<Text className=" text-white text-xl" >
								ПЕРЕСТАВИТИ
							</Text>

						}





					</TouchableOpacity>

				</View>

			</View>


		</Modal>

	)
}