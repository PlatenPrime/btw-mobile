import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';


const baseURL = 'https://btw-server-2.up.railway.app/api';






const RowsPage = () => {

	const [rows, setRows] = useState([])


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

			{/* {rows.length && <FlatList

				data={rows}
				renderItem={({ row }) =>   <Text style={styles.row}>{row["title"]}</Text>}
				keyExtractor={(row) => row._id}
			/>} */}

		</View>

	);
};


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




export default RowsPage;