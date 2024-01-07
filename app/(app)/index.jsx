import { StyleSheet, Text, View, Button, StatusBar, ActivityIndicator, Image, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, Stack, useRouter } from 'expo-router'
import { ScreenContainer } from '../../components'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { colors500 } from '../../constants/Colors'
import useAuthStore from '../../stores/authStore'
import useCheckAuth from '../../hooks/useCheckAuth'
import axios from 'axios'
import { sendMessageToTelegram, sendMessageToUser } from '../../utils/sendMessagesTelegram'



export default function Page() {


	const { userAS, isLoading } = useCheckAuth()


	const router = useRouter()

	const { logout, user, token, roles, getRoles } = useAuthStore()

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


	useEffect(() => {
		const fetchRoles = async () => {
			try {
				const roles = await getRoles()
				console.log("ROLES: ", roles);

			} catch (error) {
				console.log(error);

			} finally {

			}
		}

		fetchRoles()

	}, [])



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


				<View className=" justify-start items-stretch space-y-4 p-4" >


					<TouchableOpacity
						onPress={handleLogout}
					>

						{isLogouting
							?
							<ActivityIndicator size="large" color="#ef4444" />
							:
							<View
								className=" border-2  border-red-500 bg-red-500/20  rounded-2xl"
							>
								<Text
									className="text-3xl  text-red-100 p-4 text-center  "
								>
									ВИХІД
								</Text>
							</View>
						}


					</TouchableOpacity>



					<View
						className="flex justify-center items-center bg-sky-500/20 p-8 rounded-2xl"
					>

						<Text
							className="text-3xl text-white"
						>
							{user?.fullname}

						</Text>


						<Text
							className="text-2xl text-sky-100 italic"
						>

							{roles?.find(role => role.value === user?.role)?.name}

						</Text>



					</View>





				</View>

			}




			{/* <TextInput
				className="bg-blue-200 p-8"
				onChangeText={(text) => setInput(text)}

			/>
			<TouchableOpacity
				className="bg-green-500 p-4 "
				onPress={() => sendMessageToUser(input, "5602938230")}
			>
				<Text
					className="text-center"
				>Send Message</Text>
			</TouchableOpacity> */}



		</ScreenContainer>
	)
}

const styles = StyleSheet.create({})