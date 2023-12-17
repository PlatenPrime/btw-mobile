import { View, Text, Image } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Entypo } from '@expo/vector-icons'
import { useGlobalStore } from '../../../../stores/globalStore'
import { colors500 } from "../../../../constants/Colors"

export default function Layout() {



	const { showButtonGroup, toggleShowButtonGroup } = useGlobalStore()





	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					title: "Палети"
				}}
			/>
			<Stack.Screen
				name="[id]"
				options={{
					title: "Палета база",
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
					headerBackground: () => <View className="bg-sky-950   h-full">
						<Image source={require("../../../../assets/images/grad7.jpg")}
							className="w-full h-full absolute"
							blurRadius={10}
						/>
					</View>
				}}
			/>

		</Stack>
	)
}