import React, { useEffect, useState } from 'react';
import { View, Text, Button, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScreenContainer } from '../../../components';

import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useRowStore } from '.././../../stores/rowsStore';
import { Link } from 'expo-router';

import { useGlobalStore } from "../../../stores/globalStore";



export default function Stocks() {

	const rows = useRowStore((state) => state.rows);
	const getAllRows = useRowStore((state) => state.getAllRows);

	const { showButtonModal, toggleShowButtonModal } = useGlobalStore()




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
				<Text className="text-white">
					Buttons
				</Text>
			</View>


			{isRowLoading ? <Text className="text-3xl text-white text-center" >Загрузка...</Text> :


				<ScrollView>
					{rows?.length > 0 ?


						<View
							className="space-y-4 p-2"
						>

							{rows?.map(item => <Link
								key={item._id}
								href={`/btw/stocks/${item._id}`}
								className="border-4 border-orange-500 rounded 
				bg-orange-500/70
				text-center 
				 text-2xl text-white font-bold
				my-2 p-2 
				shadow-2xl shadow-orange-500
				"
							>
								<Text >
									{item.title}
								</Text>
							</Link>)}


						</View>


						:
						<Text className="text-xl text-white">
							Рядів немає
						</Text>

					}
				</ScrollView>

			}



		</ScreenContainer >
	)
}