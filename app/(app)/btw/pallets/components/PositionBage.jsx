import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Feather, MaterialCommunityIcons, Fontisto, FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';






export default function PositionBage({
	pos, artsCurrent, onUpdate, onDelete
}) {


	const router = useRouter()







	return (
		<View
			className="flex-1  border-2 border-teal-500 rounded-xl  mb-6"
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

				<TouchableOpacity
					className="flex-1  p-1 justify-center bg-sky-900/50 rounded-tr-xl"
					onPress={() => { if (artsCurrent?.find((art) => art.artikul === pos.artikul)) { router.push(`/(app)/btw/arts/${artsCurrent?.find((art) => art.artikul === pos.artikul)?._id}/`) } }}
				>
					<Text
						className="text-sky-100 text-2xl text-center italic"
						numberOfLines={4}
					>
						{
							artsCurrent?.find((art) => art.artikul === pos.artikul)?.nameukr
							|| pos.artikul
							|| null
						}
					</Text>
				</TouchableOpacity>

			</View>



			<View
				className="flex-1 flex-row justify-between p-2  bg-teal-500/10 "
			>

				<View
					className="flex-row items-center space-x-1"
				>


					<MaterialCommunityIcons name="balloon" size={24} color="#7dd3fc" />
					<Text
						className="text-sky-300  font-bold text-3xl "
					>
						{pos.quant}
					</Text>
				</View>


				<View
					className="flex-row items-center space-x-1"
				>

					<Feather name="box" size={24} color="#fde047" />
					<Text
						className="text-amber-300  font-bold text-3xl "
					>
						{pos.boxes}
					</Text>
				</View>




			</View>




			<View
				className="flex-1 flex-row justify-between items-center p-2 border-t border-slate-50   bg-teal-500/10"
			>

				<View
					className="flex-row items-center space-x-1"
				>

					<FontAwesome5 name="warehouse" size={24} color={`${pos.sklad === "merezhi"
						?
						"#fef3c7"
						:
						pos.sklad === "pogrebi"
							?
							"#86efac"
							:
							"#ffffff"
						}`} />
					<Text
						className={`${pos.sklad === "merezhi"
							?
							"text-amber-100"
							:
							pos.sklad === "pogrebi"
								?
								"text-green-300"
								:
								null
							}   font-bold text-2xl `}
					>
						{pos.sklad === "merezhi"
							?
							"Мережі"
							:
							pos.sklad === "pogrebi"
								?
								"Погреби"
								:
								null
						}
					</Text>
				</View>


				<View
					className="flex-row items-center space-x-1"
				>


					<Fontisto name="date" size={24} color="#fca5a5" />
					<Text
						className="text-red-300  font-bold text-2xl "
					>
						{pos.date}
					</Text>
				</View>


			</View>

			{pos.com
				?
				<View
					className="flex-1 flex-row items-center justify-around border-t border-slate-50 rounded-b-xl p-2"
				>

					<Text
						className="text-2xl italic text-white"
					>
						{pos.com}
					</Text>

				</View>

				:
				null}






			<View
				className="flex-1 flex-row items-center justify-around border-t  border-slate-50 rounded-b-xl "
			>

				<TouchableOpacity
					className="bg-blue-700/10 p-3 rounded-bl-xl w-full flex-1"
					onPress={() => onUpdate()}
				>
					<Text
						className="text-blue-500 text-center text-2xl"
					>
						Редагувати
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					className="bg-red-700/10 p-3 rounded-br-xl w-full flex-1"
					onPress={() => onDelete()}
				>
					<Text
						className="text-red-500 text-center text-2xl"
					>
						Видалити
					</Text>
				</TouchableOpacity>


			</View>


		</View >
	)
}