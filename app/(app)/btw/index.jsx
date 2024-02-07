import { View, Text, Button, ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link, useRouter } from 'expo-router'
import { ScreenContainer } from '../../../components'

import { LinearGradient } from 'expo-linear-gradient';





export default function Page() {


	const router = useRouter()






	return (
		<ScreenContainer>





			<View
				className=" justify-between h-full space-y-4 p-4"
			>


				<TouchableOpacity
					onPress={() => router.push("/btw/rows/")}
					className=" flex-1 justify-center 
					
					bg-orange-700 rounded-2xl "
				>

					<Text
						className="text-center text-3xl text-white"
					>
						Ряди
					</Text>

				</TouchableOpacity>


				<TouchableOpacity
					onPress={() => router.push("/btw/stocks/")}
					className=" flex-1 justify-center 
					
					bg-emerald-700 rounded-2xl "
				>

					<Text
						className="text-center text-3xl text-white"
					>
						Запаси
					</Text>

				</TouchableOpacity>




				<TouchableOpacity
					onPress={() => router.push("/btw/arts/")}
					className="  flex-1 justify-center 
				
					bg-sky-600 rounded-2xl "
				>
					<Text
						className="text-center text-3xl text-white"
					>
						Артикули
					</Text>
				</TouchableOpacity>




				<TouchableOpacity
					onPress={() => router.push("/btw/asks/")}
					className=" flex-1 justify-center  
				
					bg-indigo-700 rounded-2xl "
				>

					<Text
						className="text-center text-white text-3xl "
					>
						Запити
					</Text>

				</TouchableOpacity>








			</View>
		</ScreenContainer >


	)
}