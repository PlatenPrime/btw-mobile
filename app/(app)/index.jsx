import { StyleSheet, Text, View, Button, StatusBar, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { Link, Stack, useRouter } from 'expo-router'
import { ScreenContainer } from '../../components'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { colors500 } from '../../constants/Colors'
import useAuthStore from '../../stores/authStore'
import useCheckAuth from '../../hooks/useCheckAuth'



export default function Page() {





	const router = useRouter()

	const { logout } = useAuthStore()

	const [isLogouting, setIsLogouting] = useState(false);




	const handleLogout = async () => {
		try {
			setIsLogouting(true)

			await logout()

			router.replace("login")


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
					}
				}}
			/>


			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
				<Text
					className="text-5xl text-white"
				>
					BTW
				</Text>


				<TouchableOpacity
					onPress={() => router.replace("login")}
				>
					<Text
						className="text-3xl text-green-500"
					>
						ВХІД
					</Text>
				</TouchableOpacity>


				<TouchableOpacity
					onPress={handleLogout}
				>

					{isLogouting
						?
						<ActivityIndicator size="large" color="#ef4444" />
						:
						<Text
							className="text-3xl text-red-500"
						>
							ВИХІД
						</Text>

					}


				</TouchableOpacity>



			</View>
		</ScreenContainer>
	)
}

const styles = StyleSheet.create({})