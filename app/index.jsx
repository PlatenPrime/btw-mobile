import { View, Text, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'
import React, { useEffect, useLayoutEffect } from 'react'
import { ScreenContainer } from '../components'
import { Stack, useRouter } from 'expo-router'
import { colors500 } from "../constants/Colors"
import useAuthStore from '../stores/authStore'
import { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'




export default function Login() {

	const router = useRouter()

	const { getMe, setUser, user } = useAuthStore();


	const [isLoading, setIsLoading] = useState(false)
	const [count, setCount] = useState(0)



	useLayoutEffect(() => {

		const checkAuthFunc = async () => {

			try {
				setIsLoading(true)

				const user = JSON.parse(await AsyncStorage.getItem('user'));



				if (!user) {
					router.replace("login")
				}

				setUser(user);

				await getMe();


				if (user) {
					router.replace("/(app)/")
				}


				setCount(prev => prev + 1)

			} catch (error) {
				// Если произошла ошибка или пользователь не аутентифицирован,
				// перенаправляем на страницу входа

			} finally {
				setIsLoading(false)
			}

		}


		checkAuthFunc()



	}, [])






	return (
		<ScreenContainer>



			<Stack.Screen

				options={{
					title: "BTW",
					headerTintColor: "white",
					headerTitleAlign: "center",
					headerBackTitleVisible: false,
					headerTitleStyle: {
						fontWeight: "bold",
						fontSize: 36,
						color: "white"
					},
					headerStyle: {
						backgroundColor: colors500?.violet
					}
				}}
			/>


			<ScrollView
				className="p-4 space-y-4"
			>




				{isLoading ?
					<Text className="text-3xl text-center text-red-500 ">ЗАУШААШУА</Text>
					:
					<Text className="text-3xl text-center text-green-500 ">ЗАУШААШУА</Text>
				}


				<Text className="text-3xl text-center text-green-500 ">{user?.fullname}</Text>
				<Text className="text-3xl text-center text-green-500 ">{count}</Text>


			</ScrollView>





		</ScreenContainer>
	)
}