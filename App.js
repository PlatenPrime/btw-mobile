import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';










export default function App() {





	return (

		<SafeAreaView style={styles.container}>


			<Text style={styles.text} >Hello world!</Text>


		</SafeAreaView>
	);
}





const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',

	},
	text: {
		color: "black",
		fontSize: 32,
	}

})