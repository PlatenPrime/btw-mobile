import { View, Text } from 'react-native'
import React from 'react'
import { Stack, useRouter } from 'expo-router'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { Entypo } from '@expo/vector-icons';
import { useGlobalStore } from "../../../../stores/globalStore";
import { colors500 } from "../../../../constants/Colors"
import useCheckAuth from '../../../../hooks/useCheckAuth';
import { Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Layout() {

	useCheckAuth()


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
						<Entypo name="dots-three-vertical" size={24} color="white" />
					</TouchableOpacity>,
					headerTintColor: "white",
					headerTitleAlign: "center",
					headerTitleStyle: {
						fontWeight: "bold",
						fontSize: 36,
						color: "white"
					},

					headerBackground: () => <View className="bg-slate-700   h-full">
						<LinearGradient colors={['#334155', '#0f172a',]} >
							<View className="h-full"></View>
						</LinearGradient>

					</View>
				}}
			/>
			<Stack.Screen
				name="[id]"
				options={{
					title: "Ряд",
					headerRight: () => <TouchableOpacity
						onPress={toggleShowButtonGroup}>
						<Entypo name="dots-three-vertical" size={24} color="white" />
					</TouchableOpacity>,
					headerTintColor: "white",
					headerTitleAlign: "center",
					headerTitleStyle: {
						fontWeight: "bold",
						fontSize: 36,
						color: "white"
					},

					headerBackground: () => <View className="bg-orange-500   h-full">
						<LinearGradient colors={['#f97316', '#c2410c',]} >
							<View className="h-full"></View>
						</LinearGradient>
					</View>
				}}
			/>






		</Stack>
	)
}