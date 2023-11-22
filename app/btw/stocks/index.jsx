import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScreenContainer from '../../../components/ScreenContainer';
import { Link } from 'expo-router';


export default function Stocks() {


	const [data, setData] = useState({})


	const storeData = async (value) => {
		try {
			const jsonValue = JSON.stringify(value);
			await AsyncStorage.setItem('rows', jsonValue);
		} catch (e) {
			// saving error
		}
	};


	const getData = async () => {
		try {
			const jsonValue = await AsyncStorage.getItem('rows');
			const res = jsonValue != null ? JSON.parse(jsonValue) : null;
			setData(res)
			return res
		} catch (e) {
			// error reading value
		}
	};



	return (
		<ScreenContainer>


			<Button title="Записать" onPress={() => storeData({
				row: "10-12",
				pallets: "mnogo"
			})} />
			<Button title="Прочитать" onPress={getData} />



			<Text
				className="text-2xl text-white text-center"
			>
				Список рядів на складі
			</Text>
			<Link
				href="/btw/stocks/10-12"
				className="text-orange-500 text-2xl"
			>
				Ряд 10-12
			</Link>
			<Link
				href="/btw/stocks/14-16"
				className="text-orange-500 text-2xl"
			>
				Ряд 14-16
			</Link>
			<Link
				href="/btw/stocks/17-19"
				className="text-orange-500 text-2xl"
			>
				Ряд 17-19
			</Link>

			<Text>{data?.row}</Text>
			<Text>{data?.pallets}</Text>







		</ScreenContainer>
	)
}