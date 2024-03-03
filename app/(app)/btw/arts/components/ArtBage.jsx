import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'

export default function ArtBage({
	art,
	onPress
}) {
	return (
		<View
			key={art._id}
			className="flex-row space-x-2 bg-sky-500/20  w-full rounded-xl mb-4"
		>


			<View
				className="justify-center bg-white rounded-l-xl p-1"
			>
				<Image
					style={{
						height: 100,
						width: 100,
						resizeMode: "contain"
					}}
					className="rounded-xl"
					source={{ uri: `https://sharik.ua/images/elements_big/${art.artikul}_m1.jpg` }}
				/>

			</View>



			<TouchableOpacity
				className="flex-1 justify-center"
				onPress={onPress}
			>
				<Text
					className="text-white text-xl p-1  "
					numberOfLines={3}
				>
					{art.nameukr}
				</Text>
			</TouchableOpacity>


		</View>
	)
}