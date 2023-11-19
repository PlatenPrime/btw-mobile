import { View, Text, Button } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function Page() {
	return (
		<View style={{ flex: 1, justifyContent: "space-around", alignItems: "center" }} >

			<Link
				style={{
					alignItems: 'center',
					backgroundColor: 'orange',
					padding: 30,
					width: "100%"
				}}
				href="/btw/stocks" asChild >
				<TouchableOpacity
					style={{
						alignItems: 'center',
						backgroundColor: 'orange',
						padding: 30,
						width: "100%"
					}}
				>
					<Text>Запаси</Text>
				</TouchableOpacity>
			</Link>
			<Link href="/btw/arts" asChild >
				<Button title="Arts" />
			</Link>
			<Link href="/btw/asks" asChild >
				<Button title="Asks" />
			</Link>
		</View>
	)
}