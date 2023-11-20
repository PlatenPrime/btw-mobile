import { View, Text, Button, ImageBackground } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { TouchableOpacity } from 'react-native-gesture-handler'
import ScreenContainer from '../../components/ScreenContainer'

export default function Page() {
	return (
		<ScreenContainer>
			<View
			className="flex justify-center h-full space-y-8 p-2"
			>

				<Link
					href="/btw/stocks/"
					asChild
					className=" flex justify-center py-8 bg-orange-500 rounded"
				>

					<Text
						className="text-center text-3xl text-white"
					>
						Запаси
					</Text>

				</Link>

				<Link
					href="/btw/arts"
					asChild
					className=" flex justify-center py-8 bg-sky-500 rounded "
				>
					<TouchableOpacity
						className="  "
					>
						<Text
							className="text-center text-3xl text-white"
						>
							Артикули
						</Text>
					</TouchableOpacity>
				</Link>

				<Link
					href="/btw/asks"
					asChild
					className=" flex justify-center py-8 bg-yellow-500 rounded "
				>
					<TouchableOpacity
						className="  "
					>
						<Text
							className="text-center text-3xl text-white"
						>
							Запити
						</Text>
					</TouchableOpacity>
				</Link>
			</View>
		</ScreenContainer >


	)
}