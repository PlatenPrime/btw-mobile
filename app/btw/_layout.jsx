import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function Layout() {
	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={
					{
						headerTitle: "BTW",
					}
				}
			/>
			<Stack.Screen
				name="stocks"
				options={{
					headerShown: false
				}}
			/>
			<Stack.Screen
				name="arts"
				options={
					{
						title: "Артикули",
						headerShown: false,
					}
				}
			/>
			<Stack.Screen
				name="asks"
				options={
					{
						title: "Запити",
						headerShown: false,
					}
				}
			/>
			<Stack.Screen
				name="pallets"
				options={
					{
						headerShown: false,
						title: "Палети",
					}
				}
			/>
		</Stack>
	)
}