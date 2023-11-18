import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

export default function Page() {
	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
			<Text>Home Page</Text>
			<Link href="/register/" asChild >
				<Button title="Open Register Page" />
			</Link>
			<Link href="/one" asChild >
				<Button title="Open Tab One" />
			</Link>
		</View>
	)
}

const styles = StyleSheet.create({})