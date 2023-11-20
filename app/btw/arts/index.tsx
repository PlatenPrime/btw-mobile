import { View, Text } from 'react-native'
import React from 'react'
import ScreenContainer from '../../../components/ScreenContainer'
import { Link } from 'expo-router'

export default function ArtsPage() {
	return (
		<ScreenContainer>
			<Text
				className="text-2xl text-white text-center"
			>
				Список артикулів
			</Text>
			<Link
				href="/btw/arts/1102-0260"
				className="text-sky-500 text-2xl"
			>
				1102-0260
			</Link>
			<Link
				href="/btw/arts/1207-1898"
				className="text-sky-500 text-2xl"
			>
				1207-1898
			</Link>
			<Link
				href="/btw/arts/3103-1264"
				className="text-sky-500 text-2xl"
			>
				3103-1264
			</Link>

		</ScreenContainer>
	)
}