import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, Text, TextInput, View } from 'react-native';



const baseURL = 'https://btw-server-1.up.railway.app/api';






export const ArtPage = () => {

	const [arts, setArts] = useState([]);
	const [art, setArt] = useState("")

	const photoLink = `https://sharik.ua/images/elements_big/${art.trim()}_m1.jpg`;

	const link = `https://sharik.ua/ua/search/?q=${art.trim()}`



	// FETCH Arts

	const fetchArts = async () => {
		try {

			const { data } = await axios.get(`https://btw-server-1.up.railway.app/api/arts`);
			setArts(data.arts)


		} catch (error) {
			console.log(error)
		}
	}


	useEffect(() => {
		fetchArts()

	}, [])


	let item = arts.find(item => item.title === art.trim());







	return (
		<View style={styles.containerArtPage} >


			<View
				style={styles.inputContainer}>
				<TextInput
					placeholder="Введи артикул"
					editable
					onChangeText={text => setArt(text)}
					style={styles.input}
				/>
			</View>





			<Image source={{ uri: photoLink }}
				style={styles.image} />

			<Text style={styles.text} >{item && item["name"]}</Text>
			<Text style={styles.text} >{item && item["title"]}</Text>
			<Text style={styles.text} >{item && item["zone"]}</Text>


		</View>
	);
};



const styles = StyleSheet.create({
	containerArtPage: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	text: {
		color: "black",
		fontSize: 32,
	},
	inputContainer: {
		backgroundColor: "#ccc",
		borderColor: '#000000',
		borderBottomWidth: 1,
	},
	input: {
		padding: 10,
		color: "red",
		fontSize: 32,
	},
	image: {
		width: 200,
		height: 200,
	}
});