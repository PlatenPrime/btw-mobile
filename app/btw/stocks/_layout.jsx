import { View, Text } from 'react-native'
import React from 'react'
import { Stack, useRouter } from 'expo-router'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useGlobalStore } from "../../../stores/globalStore";

export default function Layout() {

	const router = useRouter()

	const { showButtonGroup, toggleShowButtonGroup } = useGlobalStore()


	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					title: "Ряди",
					headerRight: () => <TouchableOpacity
						onPress={toggleShowButtonGroup}>
						<Entypo name="dots-three-horizontal" size={24} color="white" />
					</TouchableOpacity>,
					headerTintColor: "white",
					headerTitleAlign: "center",
					headerTitleStyle: {
						fontWeight: "bold",
						fontSize: 36,
						color: "white"
					},
					headerStyle: {
						backgroundColor: "#f97516"
					}
				}}
			/>
			<Stack.Screen
				name="[id]"
				options={{
					title: "Ряд",
					headerRight: () => <TouchableOpacity
						onPress={toggleShowButtonGroup}>
						<Entypo name="dots-three-horizontal" size={24} color="white" />
					</TouchableOpacity>,
					headerTintColor: "white",
					headerTitleAlign: "center",
					headerTitleStyle: {
						fontWeight: "bold",
						fontSize: 36,
						color: "white"
					},
					headerStyle: {
						backgroundColor: "#f97516"
					}
				}}
			/>






		</Stack>
	)
}