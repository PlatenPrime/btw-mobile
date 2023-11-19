import { View, Text, Button } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function Page() {
	return (
		<View className="bg-sky-500/40 h-full" >

			<Link
				
				href="/btw/stocks" asChild >
				<TouchableOpacity
					className="border border-orange-500 p-4 rounded"
				>
					<Text>Запаси</Text>
				</TouchableOpacity>
			</Link>
			<Link href="/btw/arts" asChild >
				<Button title="Arts" />
			</Link>
			<Text
				className="text-3xl text-red-600"
			>
				Ljsouihggsrg
			</Text>
			<Link href="/btw/asks" asChild >
				<Button title="Asks" />
			</Link>
		</View>
	)
}