import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';






export default function PositionBage({
	pos, artsCurrent, onUpdate, onDelete
}) {
	return (
		<View
			className="flex-1 border-2 border-teal-500 rounded-xl space-y-2 mb-4"
			key={pos._id}
		>


			<View
				className="flex-1 flex-row border-b border-white"
			>

				<View
					className="w-1/4  bg-white h-full items-center justify-center rounded-tl-xl p-1"
				>
					<Image
						style={{
							height: 80,
							width: 80,
							resizeMode: "contain"
						}}
						className="rounded-xl"
						source={{ uri: `https://sharik.ua/images/elements_big/${pos.artikul}_m1.jpg` }}
					/>
				</View>

				<View
					className="flex-1  p-1 justify-center bg-sky-950 rounded-tr-xl"
				>
					<Text
						className="text-white text-xl text-center italic"
						numberOfLines={4}
					>
						{artsCurrent?.find((art) => art.artikul === pos.artikul)?.nameukr}
					</Text>
				</View>

			</View>



			<View
				className="flex-1 flex-row justify-between px-2"
			>

				<View
					className="flex-row items-center space-x-1"
				>

					<Feather name="box" size={24} color="#fde047" />
					<Text
						className="text-amber-300  font-bold text-2xl "
					>
						{pos.boxes}
					</Text>
				</View>


				<View
					className="flex-row items-center space-x-1"
				>


					<MaterialCommunityIcons name="balloon" size={24} color="#7dd3fc" />
					<Text
						className="text-sky-300  font-bold text-2xl "
					>
						{pos.quant}
					</Text>
				</View>


			</View>




			<View
				className="flex-1 flex-row items-center justify-around border-t border-slate-50 bg-teal-900 rounded-b-xl p-2"
			>

				<TouchableOpacity
					className=""
					onPress={() => onUpdate()}
				>
					<Text
						className="text-blue-100 text-xl"
					>
						Редагувати
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					onPress={() => onDelete()}
				>
					<Text
						className="text-red-300 text-xl"
					>
						Видалити
					</Text>
				</TouchableOpacity>


			</View>


		</View>
	)
}