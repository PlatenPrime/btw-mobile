import { View, Text } from 'react-native'
import React from 'react'
import {ScreenContainer }from '../components'

export default function Profile() {
	return (
		<ScreenContainer>
			<View
				className="flex justify-center items-center h-full"
			>

				<Text
					className="text-3xl text-sky-300"
				>
					Prime
				</Text>
			</View>
		</ScreenContainer>
	)
}