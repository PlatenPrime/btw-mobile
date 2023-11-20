import { View, Text } from 'react-native'
import React from 'react'
import ScreenContainer from '../../../components/ScreenContainer'
import { Link } from 'expo-router'

export default function Stocks() {
	return (
		<ScreenContainer>
			<Text
				className="text-2xl text-white text-center"
			>
				Список рядів на складі
			</Text>
			<Link
				href="/btw/stocks/10-12"
				className="text-orange-500 text-2xl"
			>
				Ряд 10-12
			</Link>
			<Link
				href="/btw/stocks/14-16"
				className="text-orange-500 text-2xl"
			>
				Ряд 14-16
			</Link>
			<Link
				href="/btw/stocks/17-19"
				className="text-orange-500 text-2xl"
			>
				Ряд 17-19
			</Link>

		</ScreenContainer>
	)
}