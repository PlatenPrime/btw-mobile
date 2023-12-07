import { StyleSheet, Text, View, Button, StatusBar } from 'react-native'
import React from 'react'
import { Link, Stack, useRouter } from 'expo-router'
import { ScreenContainer } from '../components'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { colors500 } from '../constants/Colors'



export default function Page() {


	const router = useRouter()





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
					onPress={() => router.push("/login")}
				>
					<Text
						className="text-3xl text-green-500"
					>
						ВХІД
					</Text>
				</TouchableOpacity>


			</View>
		</ScreenContainer>
	)
}

const styles = StyleSheet.create({})