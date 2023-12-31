import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, Modal, ActivityIndicator, TouchableOpacity } from 'react-native';
import { ScreenContainer } from '../../../../components';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { useRowStore } from '../.././../../stores/rowsStore';
import { Link, useRouter } from 'expo-router';
import { colors500 } from '../../../../constants/Colors'
import { useGlobalStore } from "../../../../stores/globalStore";
import ModalCreateRow from "./components/modals/modalCreateRow"
import useAuthStore from '../../../../stores/authStore';




export default function Stocks() {


	const router = useRouter()







	const { createRow, rows, getAllRows } = useRowStore();
	const { showButtonGroup, setShowButtonGroup } = useGlobalStore()
	const { user } = useAuthStore()





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

			{showButtonGroup
				&&
				(user?.role === "SKLAD" || user?.role === "PRIME")
				&&
				<View
					className=" bg-black absolute z-10 w-full"

				>


					<TouchableOpacity
						className="flex  justify-between items-center 
					py-4  bg-orange-500/20
					"

						onPress={() => { setShowModalCreateRow(true) }}>

						<Text className="text-3xl text-orange-300 items-center justify-center " >

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
							className="space-y-2 p-2"
						>

							{rows?.map(item =>
								<View
									key={item._id}
									className="border-x-8 border-slate-500 rounded-2xl"
								>
									<TouchableOpacity

										onPress={() => router.push(`/(app)/btw/stocks/${item._id}`)}
										className=" justify-center items-center
								border-2 border-orange-500 rounded-xl
				bg-orange-600/90  	py-2"
									>
										<Text
											className="text-5xl text-white font-bold text-center"
										>
											{item.title}
										</Text>
									</TouchableOpacity>
								</View>


							)}


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