import { View, Text, TouchableOpacity, TextInput, ActivityIndicator, Image } from 'react-native'
import React from 'react'
import { ScreenContainer } from '../components'
import { Stack, useRouter } from 'expo-router'
import { colors500 } from "../constants/Colors"
import useAuthStore from '../stores/authStore'
import { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import useCheckAuth from "../hooks/useCheckAuth"


export default function Login() {



	const { userAS, isLoading } = useCheckAuth()
	const { user } = useAuthStore()





	const { login } = useAuthStore();
	const router = useRouter()




	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")

	const [isLogining, setIsLogining] = useState(false);
	const [error, setError] = useState("");








	const handleLogin = async () => {
		try {
			setIsLogining(true)

			const user = await login({ username, password })

			if (!user) {
				setError("Невдала спроба авторизації")
			}

			if (user) { router.replace("/(app)/") }




		} catch (error) {
			console.error('Login error:', error);
		} finally {
			setIsLogining(false)
		}
	};







	return (
		<ScreenContainer>



			<Stack.Screen

				options={{
					title: "Авторизація",
					headerTintColor: "white",
					headerTitleAlign: "center",
					headerBackTitleVisible: false,
					headerTitleStyle: {
						fontWeight: "bold",
						fontSize: 36,
						color: "white"
					},
			
					headerBackground: () => <View className="bg-sky-950   h-full">
						<Image source={require("../assets/images/grad2.jpg")}
							className="w-full h-full absolute"
							blurRadius={10}
						/>

					</View>
				}}
			/>




			{user
				?


				<View
					className="flex-1 h-full justify-center p-6 space-y-8"
				>

					<View>

						<Text className="text-sky-100 text-center text-8xl ">BTW</Text>
						<Text className="text-sky-100 text-center text-3xl ">Balloon Trade Warehouse App</Text>
					</View>

					<TouchableOpacity
						className="border-4 border-sky-500 bg-sky-500/10 rounded-xl  p-10"
						onPress={() => router.replace("/(app)/")}

					>
						<Text className="text-sky-100 text-center text-5xl ">Погреби</Text>
					</TouchableOpacity>
				</View>

				:


				<ScrollView
					className="p-4 space-y-4"
				>


					<View
						className="flex-row justify-end items-center rounded-full bg-gray-700/50 focus:bg-gray-700 p-3 "
					>

						<Text className="text-gray-200 text-center text-xl">Логін:</Text>


						<TextInput

							onChangeText={(text => setUsername(text))}
							value={username}
							className="pl-6 h-10 flex-1 text-xl text-white italic "
							autoFocus={true}
						/>



					</View>



					<View
						className="flex-row justify-end items-center rounded-full bg-gray-700/50 focus:bg-gray-700 p-3 "
					>

						<Text className="text-gray-200 text-center text-xl">Пароль:</Text>



						<TextInput

							className="pl-6 h-10 flex-1 text-xl text-white italic  "
							onChangeText={(text => setPassword(text))}
							value={password}
							type="password"

						/>



					</View>




					<TouchableOpacity
						className={` p-4 border ${username ? "border-green-500" : "border-gray-500"}  flex items-center justify-center rounded-2xl `}
						onPress={handleLogin}
						disabled={!username}
					>

						{isLogining
							?
							<ActivityIndicator size="large" color="#22c55e" />
							:
							<Text
								className="text-3xl  text-white"
							>
								ВХІД
							</Text>

						}



					</TouchableOpacity>




					{isLogining
						?
						<ActivityIndicator size="large" color="#22c55e" />
						:
						<Text className="text-rose-500 text-xl italic text-center">
							{error}
						</Text>


					}







				</ScrollView>

			}



		</ScreenContainer >
	)
}