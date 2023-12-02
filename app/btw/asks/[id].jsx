import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

export default function AskPage() {

	const { id } = useLocalSearchParams()


	return (
		<View>
			<Text
				className="text-center text-2xl"
			>
				{id}
			</Text>
		</View >
	)
}