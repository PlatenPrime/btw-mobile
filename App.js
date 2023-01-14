import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, FlatList, Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';








export default function App() {

	const [text, setText] = useState('')



	return (


		<View style={styles.container}>

			<Text style={styles.text} >Hello world!</Text>

		</View>


	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#25292e',
		alignItems: 'center',
		justifyContent: 'center',
	},
	text: {
		color: "whitesmoke",
		fontSize: 32,
	}

})