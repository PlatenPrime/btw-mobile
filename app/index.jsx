import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import {ScreenContainer} from '../components'

export default function Page() {
	return (
		<ScreenContainer>
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
				<Text
					className="text-5xl text-white"
				>
					BTW
				</Text>

			</View>
		</ScreenContainer>
	)
}

const styles = StyleSheet.create({})