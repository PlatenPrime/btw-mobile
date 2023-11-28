import { View, Text, Modal, ActivityIndicator, Pressable, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { useRowStore } from '../../../stores/rowsStore'
import { usePalletStore } from '../../../stores/palletsStore'
import { ScreenContainer } from '../../../components'
import { ScrollView } from 'react-native-gesture-handler'
import { useGlobalStore } from '../../../stores/globalStore'
import { colors500 } from '../../../constants/Colors'
import ModalCreatePallet from "./components/modals/modalCreatePallet"
import ModalUpdateRow from "./components/modals/modalUpdateRow"
import ModalDeleteRow from "./components/modals/modalDeleteRow";




export default function RowPage() {

	const { id } = useLocalSearchParams()
	const router = useRouter()


	const { getRowById, updateRowById, deleteRowById } = useRowStore()
	const { pallets, getRowPallets, createPallet } = usePalletStore()
	const { showButtonGroup, setShowButtonGroup } = useGlobalStore()



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

		try {
			setIsRowLoading(true)
			async function fetchRow() {
				const row = await getRowById(id)
				setRow(row)
				setRowTitle(row?.title)
				setNewRowTitle(row?.title)
			}

			async function fetchRowPallets() {
				await getRowPallets(id)
			}

			fetchRow()
			fetchRowPallets()

		} catch (error) {
			console.log(error);

		} finally {
			setIsRowLoading(false)
		}



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
					headerTitle: () => <Text className="text-center font-bold text-3xl text-white p-3" >Ряд {rowTitle}</Text>
				}}
			/>


			{showButtonGroup && <View
				className="p-4 space-y-2 bg-black/80"
			>
				<Pressable
					className="flex  justify-between items-center 
					py-2 rounded-lg
					border border-emerald-500
					
				
					"
					onPress={() => { setShowModalCreatePallet(true) }}>

					<Text className="text-2xl text-emerald-300 items-center justify-center " >

						Створити палету

					</Text>
				</Pressable>




				<Pressable
					className="flex  justify-between items-center 
					py-2 rounded-lg
					border border-lime-500
					
					
					"

					onPress={() => { setShowModalUpdateRow(true) }}>

					<Text className="text-2xl text-lime-300 items-center justify-center " >

						Перейменувати ряд

					</Text>
				</Pressable>




				<Pressable
					className="flex  justify-between items-center 
					py-2 rounded-lg
					border border-red-500
					"

					onPress={() => { setShowModalDeleteRow(true) }}>

					<Text className="text-2xl text-red-300 items-center justify-center " >

						Видалити ряд
					</Text>
				</Pressable>
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

			{isRowLoading ? <ActivityIndicator size="large" color="#f59e0b" /> :

				<ScrollView>
					{pallets?.length > 0 ?

						<View
							className="space-y-4 p-2"
						>
							{pallets?.map((item) => <Link
								key={item._id}
								href={`/btw/pallets/${item._id}`}
								className="border-4 border-amber-500 rounded 
					bg-amber-500/70
					text-center text-2xl text-white  font-bold
					 p-2
					 shadow-2xl shadow-amber-500
					 "
							>
								<Text >
									{item.title}
								</Text>
							</Link>)}


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