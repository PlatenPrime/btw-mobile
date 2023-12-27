import { View, Text, Modal, ActivityIndicator, Pressable, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { useRowStore } from '../../../../stores/rowsStore'
import { usePalletStore } from '../../../../stores/palletsStore'
import { usePosesStore } from '../../../../stores/posesStore'
import { ScreenContainer } from '../../../../components'
import { ScrollView } from 'react-native-gesture-handler'
import { useGlobalStore } from '../../../../stores/globalStore'
import { colors500 } from '../../../../constants/Colors'
import ModalCreatePallet from "./components/modals/modalCreatePallet"
import ModalUpdateRow from "./components/modals/modalUpdateRow"
import ModalDeleteRow from "./components/modals/modalDeleteRow";
import { Feather, Octicons } from '@expo/vector-icons'





export default function RowPage() {



	const { id } = useLocalSearchParams()
	const router = useRouter()


	const { getRowById, updateRowById, deleteRowById } = useRowStore()
	const { pallets, getRowPallets, createPallet } = usePalletStore()
	const { showButtonGroup, setShowButtonGroup } = useGlobalStore()
	const { allPoses, getAllPoses } = usePosesStore()



	const [row, setRow] = useState(null)
	const [rowTitle, setRowTitle] = useState("")

	const [isRowLoading, setIsRowLoading] = useState(false)
	const [isUpdatingRowById, setIsUpdatingRowById] = useState(false)
	const [isDeletingRowById, setIsDeletingRowById] = useState(false)
	const [isCreatingPallet, setIsCreatingPallet] = useState(false)

	const [showModalDeleteRow, setShowModalDeleteRow] = useState(false);
	const [showModalUpdateRow, setShowModalUpdateRow] = useState(false);
	const [showModalCreatePallet, setShowModalCreatePallet] = useState(false);

	const [newPalletTitle, setNewPalletTitle] = useState("")
	const [newRowTitle, setNewRowTitle] = useState("")


	// EFFECTS


	useEffect(() => {



		async function fetchData() {

			try {
				setIsRowLoading(true)



				const row = await getRowById(id)
				setRow(row)
				setRowTitle(row?.title)
				setNewRowTitle(row?.title)

				await getRowPallets(id)
				await getAllPoses()



			} catch (error) {
				console.log(error);
			} finally {
				setIsRowLoading(false)
			}

		}

		fetchData()


	}, [id])






	useEffect(() => {

		setShowButtonGroup(false)

		return () => {
			setShowButtonGroup(false)
		}

	}, []);



	// HANDLERS


	async function handleCreatePallet(palletTitle) {

		try {
			setIsCreatingPallet(true)
			await createPallet(palletTitle, row?._id);
		} catch (error) {
			console.error('Ошибка при создании паллеты:', error);
		} finally {
			setIsCreatingPallet(false)
			setShowModalCreatePallet(false)

		}

	}

	async function handleUpdateRowById(newTitle) {

		try {
			setIsUpdatingRowById(true)
			await updateRowById(row._id, newTitle);
			setRowTitle(newTitle)
		} catch (error) {
			console.error('Ошибка при изменении ряда:', error);
		} finally {
			setIsUpdatingRowById(false)
			setShowModalUpdateRow(false)

		}

	}



	async function handleDeleteRowById() {
		try {
			setIsDeletingRowById(true)
			await deleteRowById(row?._id);

		} catch (error) {
			alert.error('Ошибка при удалении ряда:', error);
		} finally {
			setIsDeletingRowById(false)
			setShowModalDeleteRow(false)

			router.back()
		}
	};





	return (


		<ScreenContainer>
			<Stack.Screen
				options={{
					headerTitle: () =>
						<Text className="text-center font-bold text-3xl text-white p-3" >

							Ряд {rowTitle}

						</Text>
				}}
			/>


			{showButtonGroup && <View
				className="  border-b-2 border-orange-500 bg-orange-500/10"
			>
				<TouchableOpacity
					className="bg-green-500/10 py-4   flex-row justify-center items-center"
					onPress={() => { setShowModalCreatePallet(true) }}>

					<Text className="text-3xl text-emerald-300 items-center justify-center " >

						Створити палету

					</Text>
				</TouchableOpacity>




				<TouchableOpacity
					className="bg-lime-500/10 py-4   flex-row justify-center items-center"
					onPress={() => { setShowModalUpdateRow(true) }}>

					<Text className="text-3xl text-lime-200">

						Перейменувати ряд

					</Text>
				</TouchableOpacity>




				<TouchableOpacity
					className="bg-red-500/10 py-4 flex-row justify-center items-center"

					onPress={() => { setShowModalDeleteRow(true) }}>

					<Text className="text-3xl text-red-400" >

						Видалити ряд
					</Text>
				</TouchableOpacity>
			</View>
			}



			{/* MODALS */}

			{/* MODAL CREATE PALLET */}


			<ModalCreatePallet
				showModalCreatePallet={showModalCreatePallet}
				setShowModalCreatePallet={setShowModalCreatePallet}
				row={row}
				newPalletTitle={newPalletTitle}
				setNewPalletTitle={setNewPalletTitle}
				isCreatingPallet={isCreatingPallet}
				handleCreatePallet={handleCreatePallet}
			/>

			{/* MODAL UPDATE ROW */}

			<ModalUpdateRow
				showModalUpdateRow={showModalUpdateRow}
				setShowModalUpdateRow={setShowModalUpdateRow}
				rowTitle={rowTitle}
				newRowTitle={newRowTitle}
				setNewRowTitle={setNewRowTitle}
				isUpdatingRowById={isUpdatingRowById}
				handleUpdateRowById={handleUpdateRowById}
			/>

			{/* MODAL DELETE ROW */}


			<ModalDeleteRow
				showModalDeleteRow={showModalDeleteRow}
				setShowModalDeleteRow={setShowModalDeleteRow}
				rowTitle={rowTitle}
				isDeletingRowById={isDeletingRowById}
				handleDeleteRowById={handleDeleteRowById}
			/>



			{/* PALLETS */}

			{isRowLoading
				?
				<ActivityIndicator size="large" color="#f59e0b" />

				:

				<ScrollView>
					{pallets?.length > 0 ?

						<View
							className="space-y-4 p-4"
						>
							{pallets?.map((pallet) => <TouchableOpacity
								key={pallet._id}
								onPress={() => router.push(`/(app)/btw/pallets/${pallet._id}`)}

								className="border-2 border-amber-200/50 rounded-xl 

								bg-amber-900/10
					
					text-center text-2xl text-white  font-bold
				
				
					 "
							>
								<Text
									className="p-2 text-amber-100 font-bold text-4xl text-center  rounded-t-xl"
								>
									{pallet.title}
								</Text>




								<View
									className=" p-2  flex-row justify-between rounded-b-xl 0 "
								>

									<View
										className="flex-1 flex-row items-center justify-center space-x-2 rounded-xl"
									>
										<Octicons name="note" size={24} color="#ccfbf1" />
										<Text
											className="text-teal-100 text-xl"
										>
											{allPoses?.filter((pos) => pos?.pallet === pallet?._id).length}
										</Text>
									</View>

									<View
										className="flex-1 flex-row items-center justify-center space-x-2"
									>
										<Feather name="box" size={24} color="#facc15" />
										<Text
											className="text-yellow-400 text-xl"
										>
											{allPoses?.filter((pos) => pos?.pallet === pallet?._id).reduce((a, b) => a + b?.boxes, 0)}
										</Text>
									</View>


								</View>




								{pallet.com
									?
									<Text
										className="text-white text-center italic text-xl p-1"
									>
										{pallet.com}
									</Text>
									:
									null

								}




							</TouchableOpacity>)}

						</View>


						:
						<Text className="text-xl text-white text-center">
							Палет немає
						</Text>

					}




				</ScrollView>
			}


		</ScreenContainer >
	)
}