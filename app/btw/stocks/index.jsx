import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRowStore } from '../../../stores/rowsStore';
import ScreenContainer from '../../../components/ScreenContainer';
import { Link } from 'expo-router';
import { FlatList } from 'react-native-gesture-handler';
import axios from 'axios';

export default function Stocks() {
	const rows = useRowStore((state) => state.rows);
	const getAllRows = useRowStore((state) => state.getAllRows);

	const [isRowLoading, setIsRowLoading] = useState(true);
	const [rowsData, setRowsData] = useState([]);


	useEffect(() => {
		async function fetchRows() {
			try {
				setIsRowLoading(true);
				await getAllRows();
			} catch (error) {
				console.log(error);
			} finally {
				setIsRowLoading(false);
			}
		}

		fetchRows();
	}, []);

	useEffect(() => {
		async function fetchRowsData() {
			try {
				setIsRowLoading(true);
				const res = await axios.get('https://btw-server.up.railway.app/api/rows');
				setRowsData(res?.data?.rows)
				console.log(res?.data?.rows);

			} catch (error) {
				console.log(error);
			} finally {
				setIsRowLoading(false);
			}
		}

		fetchRowsData();
	}, []);








	return (
		<ScreenContainer>
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


			<Text className="text-white text-2xl">{rows?.length}</Text>
			<Text className="text-white text-2xl">{rowsData?.length}</Text>

			<View style={{ marginTop: 10 }}>
				<FlatList
					data={rowsData}
					keyExtractor={(item) => item._id}
					renderItem={({ item }) => (
						<Text style={{ fontSize: 16, color: 'white' }}>{item.title}</Text>
					)}
					extraData={rows}
				/>
			</View>




		</ScreenContainer>
	)
}