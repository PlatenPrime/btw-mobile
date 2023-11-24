import { View, Text, Modal, ActivityIndicator, Pressable, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { useRowStore } from '../../../stores/rowsStore'
import { usePalletStore } from '../../../stores/palletsStore'
import { ScreenContainer } from '../../../components'
import { ScrollView } from 'react-native-gesture-handler'
import { useGlobalStore } from '../../../stores/globalStore'
import { colors500 } from '../../../constants/Colors'

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
					headerTitle: () => <Text className="text-center text-2xl text-white p-3" >Ряд {rowTitle}</Text>
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


			<Modal
				animationType="slide"
				visible={showModalCreatePallet}


			>
				<View
					className="bg-black h-full justify-between p-4 "
				>
					<Text className="text-white text-3xl  text-center" >
						Створення палети для ряду {row?.title}
					</Text>

					<TextInput
						onChangeText={(text => setNewPalletTitle(text))}
						value={newPalletTitle}
						className="h-16 bg-gray-900 text-center font-bold text-2xl text-white rounded-full italic"
						autoFocus={true}
					/>


					{isCreatingPallet && <ActivityIndicator size="large" color={colors500.emerald} />}



					<View className="flex flex-row justify-around  space-x-4" >

						<Pressable
							className=" w-1/2 p-4 border border-red-500 flex items-center justify-center rounded-2xl"
							onPress={() => { setShowModalCreatePallet(false) }}>
							<Text className=" text-white text-xl"   >
								СКАСУВАТИ
							</Text>
						</Pressable>


						<Pressable

							className={`w-1/2 p-4 flex items-center justify-center rounded-2xl border ${newPalletTitle ? "border-green-500" : "border-gray-500"}`}
							onPress={() => {
								handleCreatePallet(newPalletTitle)
							}}
							disabled={!newPalletTitle}
						>
							<Text className=" text-white text-xl" >
								СТВОРИТИ
							</Text>
						</Pressable>

					</View>

				</View>


			</Modal>

			{/* MODAL UPDATE ROW */}

			<Modal
				animationType="slide"
				visible={showModalUpdateRow}


			>
				<View
					className="bg-black h-full justify-between p-4 "
				>
					<Text className="text-white text-3xl  text-center" >
						Перейменування ряду {rowTitle}
					</Text>

					<TextInput
						onChangeText={(text => setNewRowTitle(text))}
						value={newRowTitle}
						className="h-16 bg-gray-900 text-center font-bold text-2xl text-white rounded-full italic"
						autoFocus={true}
					/>


					{isUpdatingRowById && <ActivityIndicator size="large" color={colors500.lime} />}



					<View className="flex flex-row justify-around  space-x-4" >

						<Pressable
							className="w-1/2 p-4 border border-red-500 flex items-center justify-center rounded-2xl "
							onPress={() => { setShowModalUpdateRow(false) }}>
							<Text className=" text-white text-xl"   >
								СКАСУВАТИ
							</Text>
						</Pressable>


						<Pressable

							className={`w-1/2 p-4   flex items-center justify-center rounded-2xl border ${newRowTitle ? "border-green-500" : "border-gray-500"}`}
							onPress={() => {
								handleUpdateRowById(newRowTitle)
							}}
							disabled={!newRowTitle}
						>
							<Text className=" text-white text-xl" >
								ЗМІНИТИ
							</Text>
						</Pressable>

					</View>

				</View>


			</Modal>

			{/* MODAL DELETE ROW */}


			<Modal
				animationType="slide"
				visible={showModalDeleteRow}


			>
				<View
					className="bg-black h-full justify-between p-4 "
				>
					<Text className="text-white text-3xl  text-center" >
						Видалення ряду {rowTitle}
					</Text>




					{isDeletingRowById && <ActivityIndicator size="large" color={colors500.red} />}



					<View className="flex flex-row justify-around space-x-4" >

						<Pressable
							className="w-1/2 p-4 border border-red-500 flex items-center justify-center rounded-2xl "
							onPress={() => { setShowModalDeleteRow(false) }}>
							<Text className=" text-white text-xl"   >
								СКАСУВАТИ
							</Text>
						</Pressable>


						<Pressable

							className="w-1/2 p-4   flex items-center justify-center rounded-2xl border border-green-500"
							onPress={() => {
								handleDeleteRowById()
							}}

						>
							<Text className=" text-white text-xl" >
								ВИДАЛИТИ
							</Text>
						</Pressable>

					</View>

				</View>


			</Modal>




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