import { View, Text } from 'react-native'
import React from 'react'
import { ScreenContainer } from '../../../components'
import { Link } from 'expo-router'

export default function AsksPage() {
	return (
		<ScreenContainer>
			<Text
				className="text-2xl text-white text-center"
			>
				Список запитів
			</Text>
			<Link
				href="/btw/asks/1102-0260"
				className="text-yellow-500 text-2xl"
			>
				Запит на 1102-0260
			</Link>
			<Link
				href="/btw/asks/1207-1898"
				className="text-yellow-500 text-2xl"
			>
				Запит на 1207-1898
			</Link>
			<Link
				href="/btw/asks/3103-1264"
				className="text-yellow-500 text-2xl"
			>
				Запит на 3103-1264
			</Link>

		</ScreenContainer>
	)
}