import { View, Text, Image } from 'react-native'
import React from 'react'
import { Stack, useRouter } from 'expo-router'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { Entypo, Feather } from '@expo/vector-icons';
import { useGlobalStore } from "../../../../stores/globalStore";
import { colors500 } from "../../../../constants/Colors"
import { LinearGradient } from 'expo-linear-gradient';

export default function Layout() {


	const router = useRouter()

	const { showButtonGroup, toggleShowButtonGroup } = useGlobalStore()




	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					title: "Запити",
					headerRight: () => <TouchableOpacity
						onPress={toggleShowButtonGroup}>
						{/* <Feather name="menu" size={24} color="white" /> */}
					</TouchableOpacity>,
					headerTintColor: "white",
					headerTitleAlign: "center",
					headerTitleStyle: {
						fontWeight: "bold",
						fontSize: 36,
						color: "white"
					},
					headerBackground: () => <View className="bg-sky-950   h-full">
						<LinearGradient colors={['#4f46e5', '#0f172a',]} >
							<View className="h-full"></View>
						</LinearGradient>

					</View>
				}}
			/>
			<Stack.Screen
				name="[id]"
				options={{
					title: "Запит",
					headerRight: () => <TouchableOpacity
						onPress={toggleShowButtonGroup}>
						<Feather name="menu" size={24} color="white" />
					</TouchableOpacity>,
					headerTintColor: "white",
					headerTitleAlign: "center",
					headerTitleStyle: {
						fontWeight: "bold",
						fontSize: 36,
						color: "white"
					},
					headerBackground: () => <View className="bg-sky-950   h-full">
						<LinearGradient colors={['#4f46e5', '#0f172a',]} >
							<View className="h-full"></View>
						</LinearGradient>

					</View>
				}}
			/>
		</Stack>
	)
}