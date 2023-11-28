import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, Modal, ActivityIndicator } from 'react-native';
import { ScreenContainer } from '../../../components';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { useRowStore } from '.././../../stores/rowsStore';
import { Link } from 'expo-router';
import { colors500 } from '../../../constants/Colors'
import { useGlobalStore } from "../../../stores/globalStore";
import ModalCreateRow from "./components/modals/modalCreateRow"



export default function Stocks() {

	const { createRow, rows, getAllRows } = useRowStore();
	const { showButtonGroup, setShowButtonGroup } = useGlobalStore()





	const [isRowsLoading, setIsRowsLoading] = useState(false)
	const [isCreatingRow, setIsCreatingRow] = useState(false)
	const [showModalCreateRow, setShowModalCreateRow] = useState(false)
	const [newRowTitle, setNewRowTitle] = useState("")


	useEffect(() => {
		// При монтировании компонента получите все Row
		async function fetchRows() {
			try {
				setIsRowsLoading(true)
				const allRows = await getAllRows();
				console.log(allRows);



			} catch (error) {
				console.log(error)
			} finally {
				setIsRowsLoading(false)
			}
		}


		fetchRows()

		setShowButtonGroup(false)

		return () => {
			setShowButtonGroup(false)
		}


	}, []);



	async function handleCreateRow(rowTitle) {

		try {
			setIsCreatingRow(true)
			await createRow(rowTitle);


		} catch (error) {
			alert('Ошибка при создании ряда:', error);
		} finally {
			setIsCreatingRow(false)
			setShowModalCreateRow(false)

		}

	}




	return (
		<ScreenContainer>

			{showButtonGroup && <View
				className="p-4 space-y-2 bg-black/50"

			>


				<Pressable
					className="flex  justify-between items-center 
					py-2 rounded-lg
					border border-emerald-500
				
					"

					onPress={() => { setShowModalCreateRow(true) }}>

					<Text className="text-2xl text-emerald-300 items-center justify-center " >

						Створити ряд

					</Text>
				</Pressable>


			</View>}



			{/* MODAL CREATE ROW */}


			<ModalCreateRow

				showModalCreateRow={showModalCreateRow}
				setShowModalCreateRow={setShowModalCreateRow}
				newRowTitle={newRowTitle}
				setNewRowTitle={setNewRowTitle}
				isCreatingRow={isCreatingRow}
				handleCreateRow={handleCreateRow}
			/>


			{/* ROW LIST */}




			{isRowsLoading ? <Text className="text-3xl text-white text-center" >
				<ActivityIndicator size="large" color="#f97316" />
			</Text> :


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
				 p-2 
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