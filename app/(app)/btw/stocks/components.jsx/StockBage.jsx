import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'

export default function StockBage(
	{
		pos,
		onPress,
		artsCurrent,

	}
) {



	return (
		<View
			key={pos._id}
			className="flex-row space-x-2 bg-emerald-500/20  w-full rounded-xl mb-4"
		>






			<TouchableOpacity
				className="flex-1 justify-center"
				onPress={onPress}
			>




				<View
					className="flex-row flex-1"

				>

					<View
						className="justify-center bg-white rounded-tl-xl p-1"
					>
						<Image
							style={{
								height: 100,
								width: 100,
								resizeMode: "contain"
							}}
							className="rounded-xl"
							source={{ uri: `https://sharik.ua/images/elements_big/${pos.artikul}_m1.jpg` }}
						/>

					</View>


					<View
					className="flex-1  bg-sky-500/10 "
					>

						<Text
							className="text-white text-2xl p-1 text-center "
							numberOfLines={3}
						>
							{pos.artikul}
						</Text>




						{artsCurrent?.find(art => art.artikul === pos.artikul)
							?
							<Text
								className="text-white text-center text-base p-1 italic "
								numberOfLines={3}
							>
								{artsCurrent?.find(art => art.artikul === pos.artikul)?.nameukr?.slice(10)}
							</Text>
							: null}

					</View>



				</View>













				<View
					className="flex-1 flex-row justify-between space-x-1"

				>



					<View
						className=" w-1/2 flex-1  flex-row justify-center items-center rounded-xl "
					>
						<MaterialCommunityIcons name="shipping-pallet" size={16} color="#fff" />
						<Text
							className="text-white text-2xl p-1  "
							numberOfLines={3}
						>
							{pos.palletTitle}
						</Text>
					</View>




					<View
						className=" w-1/2 p-2   justify-between items-center rounded-b-xl  rounded-xl "
					>

						<View
							className=" flex-row items-center justify-end  rounded-xl"
						>
							<MaterialCommunityIcons name="balloon" size={12} color="#e0f2fe" />
							<Text
								className="text-teal-100 text-xl "
							>
								{pos.quant}
							</Text>

						</View>

						<View
							className=" flex-row items-center justify-end space-x-2"
						>
							<Feather name="box" size={12} color="#facc15" />
							<Text
								className="text-yellow-400 text-xl "
							>
								{pos.boxes}
							</Text>

						</View>


					</View>



				</View>






			</TouchableOpacity>


		</View>
	)
}