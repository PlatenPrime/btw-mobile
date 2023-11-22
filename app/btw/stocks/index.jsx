import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScreenContainer } from '../../../components';

import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useRowStore } from '.././../../stores/rowsStore';
import { Link } from 'expo-router';



export default function Stocks() {

	const rows = useRowStore((state) => state.rows);
	const getAllRows = useRowStore((state) => state.getAllRows);
	const [isRowLoading, setIsRowLoading] = useState(false)



	useEffect(() => {
		// При монтировании компонента получите все Row
		async function fetchRows() {
			try {
				setIsRowLoading(true)
				await getAllRows();


			} catch (error) {
				console.log(error)
			} finally {
				setIsRowLoading(false)
			}
		}


		fetchRows()
	}, []);


	console.log(rows)


	return (
		<ScreenContainer>
			<View>
				<Text
					className="text-3xl text-white text-center"
				>
					Ряди
				</Text>

				{isRowLoading ? <Text>Загрузка...</Text> :
					<View>
						{rows?.length > 0 ?


							<FlatList
								data={rows}
								renderItem={({ item }) => <Link
									href={`/btw/stocks/${item._id}`}
									className="border border-orange-500 rounded text-center text-xl text-white my-2 p-4 "
								>
									<Text >
										{item.title}
									</Text>
								</Link>}
							/>

							:
							<Text className="text-xl text-white">
								Рядів немає
							</Text>

						}
					</View>

				}





			</View>






		</ScreenContainer >
	)
}