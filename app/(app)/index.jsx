import { StyleSheet, Text, View, Button, StatusBar, ActivityIndicator, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Link, Stack, useRouter } from 'expo-router'
import { ScreenContainer } from '../../components'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { colors500 } from '../../constants/Colors'
import useAuthStore from '../../stores/authStore'
import useCheckAuth from '../../hooks/useCheckAuth'
import axios from 'axios'
import { sendMessageToTelegram } from '../../utils/sendMessagesTelegram'



export default function Page() {


	const { userAS, isLoading } = useCheckAuth()


	const router = useRouter()

	const { logout } = useAuthStore()

	const [isLogouting, setIsLogouting] = useState(false);




	const [input, setInput] = useState('')

	const handleSend = () => {
		sendMessageToTelegram(input)
		setInput('')

	}



	const handleLogout = async () => {
		try {
			setIsLogouting(true)

			await logout()

			router.replace("/")


		} catch (error) {
			console.error('Login error:', error);
		} finally {
			setIsLogouting(false)
		}
	};






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
						backgroundColor: colors500?.cyan
					},
					headerBackground: () => <View className="bg-sky-950   h-full">
						<Image source={require("../../assets/images/grad2.jpg")}
							className="w-full h-full absolute"
							blurRadius={10}
						/>

					</View>
				}}
			/>



			{userAS
				?
				<TouchableOpacity
					onPress={() => router.replace("/")}
				>
					<Text
						className="text-3xl text-green-500"
					>
						ВХІД
					</Text>
				</TouchableOpacity>


				:


				<View className="flex-col flex-1 justify-between items-center space-y-8 p-4" >
					
					<Text
						className="text-3xl text-center text-white"
					>
						Balloon Trade Warehouse App
					</Text>

					<Text
						className="text-8xl text-white"
					>
						BTW
					</Text>



					<TouchableOpacity
						onPress={handleLogout}
					>

						{isLogouting
							?
							<ActivityIndicator size="large" color="#ef4444" />
							:
							<Text
								className="text-3xl border  border-red-500 text-red-500 p-4 rounded-2xl"
							>
								ВИХІД
							</Text>

						}


					</TouchableOpacity>



				</View>

			}





		</ScreenContainer>
	)
}

const styles = StyleSheet.create({})