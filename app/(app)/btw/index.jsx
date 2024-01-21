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
					border border-orange-500
					bg-orange-400/20 rounded-xl "
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
					border border-emerald-500
					bg-emerald-400/20 rounded-xl "
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
					border-2 border-sky-500
					bg-sky-400/20 rounded-xl "
				>
					<Text
						className="text-center text-3xl text-sky-100"
					>
						Артикули
					</Text>
				</TouchableOpacity>




				<TouchableOpacity
					onPress={() => router.push("/btw/asks/")}
					className=" flex-1 justify-center  
					border-2 border-indigo-500
					bg-indigo-400/20 rounded-xl "
				>

					<Text
						className="text-center text-indigo-100 text-3xl "
					>
						Запити
					</Text>

				</TouchableOpacity>








			</View>
		</ScreenContainer >


	)
}