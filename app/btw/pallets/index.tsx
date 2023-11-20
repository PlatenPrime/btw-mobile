import { View, Text } from 'react-native'
import React from 'react'
import ScreenContainer from '../../../components/ScreenContainer'
import { Link } from 'expo-router'

export default function PalletsPage() {
	return (
		<ScreenContainer>
			<Text
				className="text-2xl text-white text-center"
			>
				Список палет в ряді
			</Text>
			<Link
				href="/btw/pallets/10-12-1-1"
				className="text-amber-500 text-2xl"
			>
				Палета 10-12-1-1
			</Link>
			<Link
				href="/btw/pallets/10-12-1-2"
				className="text-amber-500 text-2xl"
			>
				Палета 10-12-1-2
			</Link>
			<Link
				href="/btw/pallets/10-12-2-1"
				className="text-amber-500 text-2xl"
			>
				Палета 10-12-2-1
			</Link>

		</ScreenContainer>
	)
}