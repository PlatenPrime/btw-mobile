import React, { useEffect, useState } from 'react';
import { Button, FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';


const baseURL = 'https://btw-server-1.up.railway.app/api';





const Item = ({ title }) => (
	<View style={styles.item}>
		<Text style={styles.title}>{title}</Text>
	</View>
);



const RowsPage = () => {

	const [rows, setRows] = useState([])

	const [array, setArray] = useState([

		{ "name": "Vasia", "number": 1 },
		{ "name": "Kolia", "number": 2 },
		{ "name": "Petia", "number": 3 },


	])


	const fetchRows = async () => {

		try {
			const response = await fetch(`${baseURL}/rows`);
			const json = await response.json();
			setRows(json.rows);
			console.log(json.rows)


		}

		catch (error) {

		} finally {
			console.log("Загрузилось")
		}


	}

	useEffect(() => {
		fetchRows();
	}, [])



	return (

		<View>
			<Text>
				Здесь будет грузиться список рядов
				{rows.length && rows[0]["title"]}
			</Text>





			<FlatList

				data={array}
				renderItem={({ item }) => <Item title={item["name"]} />}
				keyExtractor={(item) => item["number"]}
			/>

		</View>

	);
};


const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",

	},
	
})




export default RowsPage;