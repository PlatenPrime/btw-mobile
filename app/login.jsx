import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { ScreenContainer } from '../components'
import { Stack, useRouter } from 'expo-router'
import { colors500 } from "../constants/Colors"
import useAuthStore from '../stores/authStore'
import { useState } from 'react'


export default function Login() {


	const { login } = useAuthStore();
	const router = useRouter()


	const [formData, setFormData] = useState({
		username: '',
		password: '',
	});

	const [isLogining, setIsLogining] = useState(false);
	const [error, setError] = useState(null);
	const [showPassword, setShowPassword] = useState(false);




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
						backgroundColor: colors500?.green
					}
				}}
			/>


			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >






			</View>
		</ScreenContainer>
	)
}