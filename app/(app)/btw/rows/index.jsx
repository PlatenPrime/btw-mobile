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
import { LinearGradient } from 'expo-linear-gradient';



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
					className="  absolute z-10 w-full"

				>



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



					<View
						className="flex-1 h-full
										"
					>
						<TouchableOpacity
							className="bg-orange-500/20 py-4 flex-1 flex-row justify-center items-center 
					"

							onPress={() => { setShowModalCreateRow(true) }}>

							<Text className="flex-1 text-center text-orange-100 text-2xl" >

								Створити ряд

							</Text>
						</TouchableOpacity>
					</View>




					{rows?.length > 0 ?


						<View
							className="space-y-2 p-2"
						>

							{rows?.map(item =>
								<View
									key={item._id}
									className="border-x-8 border-slate-500 "
								>

									<LinearGradient colors={['#f97316ee', '#c2410cee',]} >
										<TouchableOpacity

											onPress={() => router.push(`/(app)/btw/rows/${item._id}`)}
											className=" justify-center items-center py-2"
										>

											<View
												className="bg-white p-2 rounded-xl"
											>
												<Text
													className="text-3xl text-black font-bold text-center"
												>
													{item.title}
												</Text>
											</View>

										</TouchableOpacity>
									</LinearGradient>


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