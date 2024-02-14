import { View, Text, Image } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { colors500 } from "../../../constants/Colors"
import { LinearGradient } from 'expo-linear-gradient';

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

					headerBackground: () => <View className="bg-blue-900   h-full">
						<LinearGradient colors={['#1d4ed8', '#1e3a8a',]} >
							<View className="h-full"></View>
						</LinearGradient>

					</View>
				}}
			/>
			<Stack.Screen
				name="rows"
				options={{
					title: "Ряди",
					headerShown: false
				}}
			/>
			<Stack.Screen
				name="stocks"
				options={{
					title: "Запаси",
					headerShown: false
				}}
			/>
			<Stack.Screen
				name="defs/index"
				options={{
					title: "Дефіцити",
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