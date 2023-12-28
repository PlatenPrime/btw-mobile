import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScreenContainer } from '../../components'
import { Stack } from 'expo-router'
import { colors500 } from '../../constants/Colors'
import useAuthStore from "../../stores/authStore"
import AsyncStorage from '@react-native-async-storage/async-storage'
import useCheckAuth from "../../hooks/useCheckAuth"
import { Image } from 'react-native'

export default function Profile() {

	useCheckAuth()



	const { user, token } = useAuthStore()





	return (
		<ScreenContainer>


			<Stack.Screen

				options={{

					headerTintColor: "white",
					headerTitleAlign: "center",
					headerTitleStyle: {
						fontWeight: "bold",
						fontSize: 36,
						color: "white"
					},
					headerBackground: () => <View className="bg-sky-950   h-full">
						<Image source={require("../../assets/images/grad2.jpg")}
							className="w-full h-full absolute"
							blurRadius={10}
						/>

					</View>
				}}
			/>




			<View
				className="flex justify-start items-center h-full"
			>

				<Text
					className="text-3xl text-white"
				>
					{user?.fullname}

				</Text>


				<Text
					className="text-3xl text-sky-300"
				>
					{user?.role}
				</Text>



			</View>
		</ScreenContainer>
	)
}