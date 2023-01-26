import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { ArtPage } from './pages/ArtPage';










export default function App() {





	return (

		<SafeAreaView style={styles.container}>


			<ArtPage />


		</SafeAreaView>
	);
}





const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		marginVertical: 50,

	},
	text: {
		color: "black",
		fontSize: 32,
	}

})