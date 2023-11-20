import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function Layout() {
	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					title: "Arts"
				}}
			/>
			<Stack.Screen
				name="[id]"
				options={{
					headerTitle: "Art details"
				}}
			/>
		</Stack>
	)
}