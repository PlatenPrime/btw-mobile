import { View, Text, TouchableOpacity, TextInput, ActivityIndicator, Image } from 'react-native'
import React from 'react'
import { ScreenContainer } from '../components'
import { Stack, useRouter } from 'expo-router'
import { colors500 } from "../constants/Colors"
import useAuthStore from '../stores/authStore'
import { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import useCheckAuth from "../hooks/useCheckAuth"
import { LinearGradient } from 'expo-linear-gradient'


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
						<LinearGradient colors={['#242424', '#0c0d0d',]} >
							<View className="h-full"></View>
						</LinearGradient>

					</View>
				}}
			/>




			{user
				?


				<View
					className=" h-full start p-6 space-y-8"
				>

					<View
						className=" p-4 rounded-xl"
					>

						<Text className="text-sky-100 text-center text-[160px] font-bold ">BTW</Text>
						<Text className="text-sky-100 text-center text-3xl ">Balloon Trade Warehouse App</Text>
					</View>
					<LinearGradient
					colors={['rgb(14 165 233 )', '#0369a1',]}
					className="rounded-xl"
					>
						<TouchableOpacity
							className="  bg-gradient-to-b from-sky-500/50 to-sky-700 rounded-xl  p-10"
							onPress={() => router.replace("/(app)/btw")}

						>
							<Text className="text-sky-100 text-center text-5xl ">Погреби</Text>
						</TouchableOpacity>
					</LinearGradient>
				</View>

				:


				<ScrollView
					className="p-4 space-y-4"
				>


					<View
						className="flex-row justify-end items-center rounded-full bg-slate-700 focus:bg-slate-500 p-3 "
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
						className="flex-row justify-end items-center rounded-full bg-slate-700 focus:bg-slate-500 p-3 "
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
						className={` p-4  ${username && password ? "border-green-500 bg-green-500/50" : "border-gray-500  bg-gray-500/20"}  flex items-center justify-center rounded-2xl `}
						onPress={handleLogin}
						disabled={!username || !password}
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




					{!isLogining &&
						<Text className="text-rose-500 text-xl italic text-center">
							{error}
						</Text>


					}







				</ScrollView>

			}



		</ScreenContainer >
	)
}