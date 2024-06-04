import { View, Text, Button, ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link, useRouter } from 'expo-router'
import { ScreenContainer } from '../../../components'
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { LinearGradient } from 'expo-linear-gradient';





export default function Page() {


	const router = useRouter()






	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<ScreenContainer>





				<View
					className=" justify-between h-full space-y-4 p-4"
				>

					<LinearGradient
						colors={['rgb(100 116 139 )', 'rgb(30 41 59)',]}
						className="flex-1 justify-center rounded-2xl "
					>
						<TouchableOpacity
							onPress={() => router.push("/btw/rows/")}
							className=""
						>
							<Text
								className="text-center text-3xl text-white"
							>
								Ряди
							</Text>

						</TouchableOpacity>
					</LinearGradient>



					<LinearGradient
						colors={['rgb(16 185 129 )', 'rgb(6 78 59)',]}
						className=" flex-1 justify-center 
					 rounded-2xl "
					>
						<TouchableOpacity
							onPress={() => router.push("/btw/stocks/")}

						>

							<Text
								className="text-center text-3xl text-white"
							>
								Запаси
							</Text>

						</TouchableOpacity>
					</LinearGradient>





					<LinearGradient
						colors={['rgb(14 165 233)', 'rgb(12 74 110 )',]}
						className=" flex-1 justify-center 
					 rounded-2xl "
					>
						<TouchableOpacity
							onPress={() => router.push("/btw/arts/")}
						>
							<Text
								className="text-center text-3xl text-white"
							>
								Артикули
							</Text>
						</TouchableOpacity>
					</LinearGradient>




					<LinearGradient
						colors={['rgb(99 102 241)', 'rgb(49 46 129  )',]}
						className=" flex-1 justify-center 
					 rounded-2xl "
					>
						<TouchableOpacity
							onPress={() => router.push("/btw/asks/")}
						>
							<Text
								className="text-center text-white text-3xl "
							>
								Запити
							</Text>
						</TouchableOpacity>
					</LinearGradient>




					<LinearGradient
						colors={['rgb(236 72 153 )', 'rgb(131 24 67 )',]}
						className=" flex-1 justify-center 
					 rounded-2xl "
					>
						<TouchableOpacity
							onPress={() => router.push("/btw/asks/")}
						>
							<Text
								className="text-center text-white text-3xl "
							>
								Дефіцити
							</Text>
						</TouchableOpacity>
					</LinearGradient>



				</View>
			</ScreenContainer >
		</GestureHandlerRootView>


	)
}