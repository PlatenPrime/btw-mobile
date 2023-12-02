import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';







export default function AskBage({
	ask,
	artsCurrent

}) {

	const router = useRouter()

	const createdAtDateObject = new Date(ask.createdAt)
	const updatedAtDateObject = new Date(ask.updatedAt)


	return (

		<TouchableOpacity
			onPress={() => router.push(`btw/asks/${ask._id}/`)}
			className="border border-indigo-500 rounded-xl "
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
						source={{ uri: `https://sharik.ua/images/elements_big/${ask.artikul}_m1.jpg` }}
					/>
				</View>

				<View
					className="flex-1  justify-center bg-sky-500 rounded-tr-xl"
				>
					<Text
						className="text-white text-2xl text-center italic p-1"
						numberOfLines={4}
					>
						{
							artsCurrent?.find((art) => art.artikul === ask.artikul)?.nameukr
							|| ask.artikul
							|| null
						}
					</Text>


					{ask.quant ? <View
						className=" p-1 flex-1 flex-row items-center justify-center"
					>
						<MaterialCommunityIcons name="balloon" size={24} color="white" />
						<Text
							className="text-center text-2xl text-white font-bold "
						>
							{ask.quant}
						</Text>
					</View>
						:
						null
					}




				</View>

			</View>



			<View
				className="flex-row items-center justify-center 2 p-1"
			>
				<Text
					className="text-white text-xl "
				>
					Статус: {ask.status}
				</Text>

			</View>








			<View
				className="flex-row "
			>
				<View
					className="w-1/2 flex-row items-center space-x-2 p-1"
				>
					<FontAwesome5 name="pray" size={24} color="white" />
					<Text
						className="text-white text-xl"
					>
						Имя пользователя wfwfw wfwwfwf
					</Text>
				</View>

				<View
					className="w-1/2 bg-yellow-500 flex-row items-center justify-center"
				>
					<Text
						className="text-center text-xl text-white p-1"
						numberOfLines={4}
					>
						{createdAtDateObject.toLocaleString()}
					</Text>
				</View>


			</View>





			<View
				className="flex-row items-center space-x-2 p-1"
			>
				<MaterialCommunityIcons name="account-arrow-down-outline" size={24} color="white" />
				<Text
					className="text-white text-xl"
				>
					Имя пользователя
				</Text>
				<Text
					className="text-center text-xl text-white"
				>
					{updatedAtDateObject.toLocaleString()}

				</Text>
			</View>






		</TouchableOpacity>

	)
}