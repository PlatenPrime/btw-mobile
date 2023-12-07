import { View, Text } from 'react-native'
import React from 'react'
import { ScreenContainer } from '../components'
import { Stack } from 'expo-router'
import { colors500 } from '../constants/Colors'

export default function Profile() {
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
					headerStyle: {
						backgroundColor: colors500?.pink
					}
				}}
			/>




			<View
				className="flex justify-center items-center h-full"
			>

				<Text
					className="text-3xl text-sky-300"
				>
					Prime
				</Text>
			</View>
		</ScreenContainer>
	)
}