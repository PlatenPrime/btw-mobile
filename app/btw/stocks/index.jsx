import React, { useEffect, useState } from 'react';
import { View, Text, Button, Pressable, Modal, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScreenContainer } from '../../../components';

import { FlatList, ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { useRowStore } from '.././../../stores/rowsStore';
import { Link } from 'expo-router';

import { useGlobalStore } from "../../../stores/globalStore";



export default function Stocks() {

	const { createRow, rows, getAllRows } = useRowStore();
	const { showButtonGroup, setShowButtonGroup } = useGlobalStore()





	const [isRowsLoading, setIsRowsLoading] = useState(false)
	const [showModalCreateRow, setShowModalCreateRow] = useState(false)
	const [newRowTitle, setNewRowTitle] = useState("")


	useEffect(() => {
		// При монтировании компонента получите все Row
		async function fetchRows() {
			try {
				setIsRowsLoading(true)
				await getAllRows();


			} catch (error) {
				console.log(error)
			} finally {
				setIsRowsLoading(false)
			}
		}


		fetchRows()

		setShowButtonGroup(false)




	}, []);



	async function handleCreateRow(rowTitle) {

		try {
			await createRow(rowTitle);


		} catch (error) {
			alert('Ошибка при создании ряда:', error);
		} finally {
			setShowModalCreateRow(false)

		}

	}




	return (
		<ScreenContainer>

			{showButtonGroup && <View
				className="p-4"

			>


				<Pressable
					className=" justify-center items-center 
					py-2 rounded-lg
					border border-emerald-500"

					onPress={() => { setShowModalCreateRow(true) }}>
					<Text className="text-white" >Створити ряд</Text>
				</Pressable>


			</View>}



			<Modal
				animationType="slide"

				visible={showModalCreateRow}
				onRequestClose={() => {
					Alert.alert('Modal has been closed.');
					setShowModalCreateRow(!showModalCreateRow);
				}}
				className="justify-center items-center"
				
				>


				<TextInput
					onChangeText={(text => setNewRowTitle(text))}
					value={newRowTitle}
					className="h-16 bg-gray-700 text-center text-2xl text-white"
					autoFocus={true}
				/>


				<View className="flex flex-row justify-between" >
					<Pressable
						className="p-8 bg-green-500/50"
						onPress={() => { setShowModalCreateRow(false) }}>
						<Text  >CREATE ROW</Text>
					</Pressable>
					<Pressable
						className="p-8 bg-red-500/50"
						onPress={() => { setShowModalCreateRow(false) }}>
						<Text  >CLOSE MODAL</Text>
					</Pressable>
				</View>



			</Modal>




			{isRowsLoading ? <Text className="text-3xl text-white text-center" >Загрузка...</Text> :


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