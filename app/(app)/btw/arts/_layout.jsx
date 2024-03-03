import { View, Text, Image } from 'react-native'
import React from 'react'
import { Stack, useRouter } from 'expo-router'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Entypo } from '@expo/vector-icons';
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
					title: "Артикули",
					headerRight: () => <TouchableOpacity
						onPress={toggleShowButtonGroup}>
						{/* <Entypo name="dots-three-vertical" size={24} color="white" /> */}
					</TouchableOpacity>,
					headerTintColor: "white",
					headerTitleAlign: "center",
					headerTitleStyle: {
						fontWeight: "bold",
						fontSize: 36,
						color: "white"
					},
					headerBackground: () => <View className="bg-sky-950   h-full">
						<LinearGradient colors={['#0284c7', '#075985',]} >
							<View className="h-full"></View>
						</LinearGradient>

					</View>
				}}
			/>
			<Stack.Screen
				name="[id]"
				options={{
					title: "Артикул",
					headerRight: () => <TouchableOpacity
						onPress={toggleShowButtonGroup}>
						{/* <Entypo name="dots-three-vertical" size={24} color="white" /> */}
					</TouchableOpacity>,
					headerTintColor: "white",
					headerTitleAlign: "center",
					headerTitleStyle: {
						fontWeight: "bold",
						fontSize: 36,
						color: "white"
					},
					headerBackground: () => <View className="bg-sky-950   h-full">
						<LinearGradient colors={['#0284c7', '#075985',]} >
							<View className="h-full"></View>
						</LinearGradient>

					</View>
				}}
			/>
		</Stack>
	)
}