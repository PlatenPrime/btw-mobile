import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { colors500 } from "../../constants/Colors"

export default function Layout() {
	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					title: "Погреби",
					headerTintColor: "white",
					headerTitleAlign: "center",
					headerTitleStyle: {
						fontWeight: "bold",
						fontSize: 36,
						color: "white"
					},
					headerStyle: {
						backgroundColor: colors500?.blue
					}
				}}
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