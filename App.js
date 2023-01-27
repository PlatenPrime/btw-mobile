import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { ArtPage } from './pages/ArtPage';










export default function App() {





	return (

		<View style={styles.container}>


			<ArtPage />


		</View>
	);
}





const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 64,

	},
	text: {
		color: "black",
		fontSize: 32,
	}

})