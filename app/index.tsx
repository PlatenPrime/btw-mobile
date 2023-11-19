import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

export default function Page() {
	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
			<Text>Home Page</Text>
			<Link href="/one" asChild >
				<Button title="Open Tab One" />
			</Link>
			<Text
				className="text-3xl text-red-600"
			>
				Ljsouihggsrg
			</Text>
		</View>
	)
}

const styles = StyleSheet.create({})