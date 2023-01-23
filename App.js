import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {  SafeAreaView, StyleSheet, Text } from 'react-native';
import RowsPage from './pages/RowsPage';









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
		backgroundColor: '#25292e',
		alignItems: 'center',
		justifyContent: 'center',
		
	},
	text: {
		color: "whitesmoke",
		fontSize: 32,
	}

})