import { View, Text, Button, ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link, useRouter } from 'expo-router'
import { ScreenContainer } from '../../../components'
import useCheckAuth from "../../../hooks/useCheckAuth"

export default function Page() {


	const router = useRouter()

	useCheckAuth()




	return (
		<ScreenContainer>




			
			<View
				className="flex-1 justify-start h-full space-y-4 p-4"
			>



				<TouchableOpacity
					onPress={() => router.push("/btw/stocks/")}
					className="h-1/3 flex-1 justify-center 
					border border-orange-400
					bg-orange-400/10 rounded-xl "
				>

					<Text
						className="text-center text-5xl text-orange-100"
					>
						Запаси
					</Text>

				</TouchableOpacity>





				<TouchableOpacity
					onPress={() => router.push("/btw/arts/")}
					className=" h-1/3 flex-1 justify-center 
					border-2 border-sky-500
					bg-sky-500/10 rounded-xl "
				>
					<Text
						className="text-center text-5xl text-sky-100"
					>
						Артикули
					</Text>
				</TouchableOpacity>




				<TouchableOpacity
					onPress={() => router.push("/btw/asks/")}
					className="h-1/3 flex-1 justify-center  
					border-2 border-indigo-500
					bg-indigo-500/10 rounded-xl "
				>

					<Text
						className="text-center text-indigo-100 text-5xl "
					>
						Запити
					</Text>

				</TouchableOpacity>


			</View>
		</ScreenContainer >


	)
}