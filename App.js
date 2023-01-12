import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, FlatList, Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';





import RowsPage from './pages/RowsPage';



const items = [
	{ id: '0', text: 'View' },
	{ id: '1', text: 'Text' },
	{ id: '2', text: 'Image' },
	{ id: '3', text: 'ScrollView' },
	{ id: '4', text: 'ListView' },
]



export default function App() {

	const [text, setText] = useState('')



	return (


		<View style={styles.container}>


			<FlatList

				data={items}
				renderItem={({ item }) => <Text style={styles.row}>{item.text}</Text>}
				keyExtractor={(item) => item.id}
			/>

			<RowsPage />



		</View>


	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",

	},
	text: {
		color: 'rgb(59,108,212)',
		fontSize: 42,
		fontWeight: '100',
		textAlign: 'center',
	},
	box: {
		width: 150,
		height: 150,
		backgroundColor: '#3B6CD4',
		borderWidth: 1,
		borderColor: 'black',
		borderRadius: 4,
	},
	image: {
		width: 200,
		height: 200,
	},
	small: {
		width: 200,
		height: 200,
		marginBottom: 10,
		marginRight: 10,
		backgroundColor: 'skyblue',
	},
	large: {
		width: 300,
		height: 300,
		marginBottom: 10,
		marginRight: 10,
		backgroundColor: 'steelblue',
	},
	row: {
		padding: 15,
		marginBottom: 5,
		backgroundColor: 'skyblue',
	},
})