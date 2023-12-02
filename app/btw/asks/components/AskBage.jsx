import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'

export default function AskBage({
	ask,
	artsCurrent

}) {

	const router = useRouter()




	return (
		<TouchableOpacity
			key={ask._id}
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
					className="flex-1  p-1 justify-center bg-sky-500 rounded-tr-xl"
				>
					<Text
						className="text-white text-xl text-center italic"
						numberOfLines={4}
					>
						{
							artsCurrent?.find((art) => art.artikul === ask.artikul)?.nameukr
							|| ask.artikul
							|| null
						}
					</Text>
				</View>

			</View>




			<Text
				className="text-center text-2xl text-white"
			>
				{ask.artikul}

			</Text>
			<Text
				className="text-center text-xl text-white"
			>
				{ask.createdAt}
			</Text>

			<Text
				className="text-center text-xl text-white"
			>
				{ask.updatedAt}

			</Text>




		</TouchableOpacity>
	)
}