import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, Modal, ActivityIndicator, TouchableOpacity } from 'react-native';
import { ScreenContainer } from '../../../../components';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { useRowStore } from '../.././../../stores/rowsStore';
import { Link, useRouter } from 'expo-router';
import { colors500 } from '../../../../constants/Colors'
import { useGlobalStore } from "../../../../stores/globalStore";
import ModalCreateRow from "./components/modals/modalCreateRow"




export default function Stocks() {


	const router = useRouter()







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


				<TouchableOpacity
					className="flex  justify-between items-center 
					py-2 rounded-lg
				
				
					"

					onPress={() => { setShowModalCreateRow(true) }}>

					<Text className="text-2xl text-emerald-300 items-center justify-center " >

						Створити ряд

					</Text>
				</TouchableOpacity>


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




			{isRowsLoading
				?
				<ActivityIndicator size="large" color="#f97316" />
				:
				<ScrollView>
					{rows?.length > 0 ?


						<View
							className="space-y-4 p-4"
						>

							{rows?.map(item => <TouchableOpacity
								key={item._id}
								onPress={() => router.push(`/(app)/btw/stocks/${item._id}`)}

								className=" flex-1 justify-center items-center
								border-2 border-orange-500
				bg-orange-500/10 py-4 rounded-xl	"
							>
								<Text
									className="text-5xl text-white font-bold text-center"
								>
									{item.title}
								</Text>
							</TouchableOpacity>)}


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