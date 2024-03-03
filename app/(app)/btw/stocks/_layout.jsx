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
					title: "Запаси",
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
					headerBackground: () => <View className="bg-emerald-800   h-full">
						<LinearGradient colors={['#10b981', '#0f172a',]} >
							<View className="h-full"></View>
						</LinearGradient>

					</View>
				}}
			/>

		</Stack>
	)
}