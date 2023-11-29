import { View, Text, ActivityIndicator, Image, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import React, { useEffect, useState } from 'react'
import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router'

import { usePalletStore } from '../../../stores/palletsStore'
import { usePosesStore } from '../../../stores/posesStore'
import { useRowStore } from '../../../stores/rowsStore';
import { useGlobalStore } from '../../../stores/globalStore'

import { useGetArtsCurrent } from "../../../hooks/useGetArtsCurrent"
import { colors500 } from '../../../constants/Colors'
import { Octicons, Feather } from '@expo/vector-icons';

import { ScreenContainer } from '../../../components';
import PositionBage from "./components/PositionBage";
import { ModalClearPallet, ModalCreatePos, ModalDeletePallet, ModalDeletePos, ModalMovePalletContent, ModalUpdatePallet, ModalUpdatePos } from "./components/modals"









export default function PalletPage() {

	const { id } = useLocalSearchParams()
	const router = useRouter()

	const { artsCurrent, isLoadingArtsCurrent, errorLoadingArts } = useGetArtsCurrent()

	const { showButtonGroup, setShowButtonGroup } = useGlobalStore()


	const { getPalletById, deletePalletById, updatePalletById, clearPalletById, movePalletContent, getRowPallets } = usePalletStore();
	const { getRowById, getAllRows, rows } = useRowStore();
	const { getPalletPoses, clearPosesStore, createPos, deletePosById, poses, updatePosById } = usePosesStore()



	// STATES

	const [pallet, setPallet] = useState(null)

	const [palletTitle, setPalletTitle] = useState(pallet?.title)


	const [isPalletLoading, setIsPalletLoading] = useState(false)
	const [isPosesLoading, setIsPosesLoading] = useState(false);
	const [isSelectedRowPalletsLoading, setIsSelectedRowPalletsLoading] = useState(false);
	const [isSelectedPalletLoading, setIsSelectedPalletLoading] = useState(false);




	const [isDeletingPalletById, setIsDeletingPalletById] = useState(false)
	const [isUpdatingPalletById, setIsUpdatingPalletById] = useState(false)
	const [isCreatingPos, setIsCreatingPos] = useState(false)
	const [isDeletingPosById, setIsDeletingPosById] = useState(false)
	const [isUpdatingPosById, setIsUpdatingPosById] = useState(false)








	const [selectedPos, setSelectedPos] = useState(null)
	const [selectedRowId, setSelectedRowId] = useState(null)
	const [selectedRowPallets, setSelectedRowPallets] = useState(null)
	const [selectedPalletId, setSelectedPalletId] = useState(null)
	const [selectedPallet, setSelectedPallet] = useState(null)





	const [updatePosQuantValue, setUpdatePosQuantValue] = useState(0)
	const [updatePosBoxesValue, setUpdatePosBoxesValue] = useState(0)
	const [updatePosDateValue, setUpdatePosDateValue] = useState("")
	const [updatePosSkladValue, setUpdatePosSkladValue] = useState("")





	const [newPosArtikul, setNewPosArtikul] = useState("")
	const [newPosQuant, setNewPosQuant] = useState("")
	const [newPosBoxes, setNewPosBoxes] = useState("")
	const [newPosDate, setNewPosDate] = useState("")
	const [newPosSklad, setNewPosSklad] = useState("")


	// MODALS

	const [showModalDeletePallet, setShowModalDeletePallet] = useState(false);
	const [showModalUpdatePallet, setShowModalUpdatePallet] = useState(false);
	const [showModalCreatePos, setShowModalCreatePos] = useState(false);
	const [showModalDeletePos, setShowModalDeletePos] = useState(false);
	const [showModalUpdatePos, setShowModalUpdatePos] = useState(false);
	const [showModalClearPallet, setShowModalClearPallet] = useState(false);
	const [showModalMovePalletContent, setShowModalMovePalletContent] = useState(false);



	// HANDLERS 





	// EFFECTS



	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsPalletLoading(true);
				setIsPosesLoading(true);


				if (id) {
					const pallet = await getPalletById(id);
					setPallet(pallet);
					setPalletTitle(pallet?.title);

					await getPalletPoses(id);
				}
			} catch (error) {
				console.log(error);
			} finally {
				setIsPalletLoading(false);
				setIsPosesLoading(false);
			}
		};

		fetchData();
	}, [id]);



	useEffect(() => {


		const fetchAllRows = async () => {
			try {
				const rows = await getAllRows()
				setSelectedRowId(rows[0]._id)
			} catch (error) {
				console.log(error)
			}
		}

		fetchAllRows()

	}, [])

	useEffect(() => {
		const fetchRowPallets = async () => {
			try {
				setIsSelectedRowPalletsLoading(true);

				if (selectedRowId) {
					const pallets = await getRowPallets(selectedRowId);
					setSelectedRowPallets(pallets);
				}
			} catch (error) {
				console.log(error);
			} finally {
				setIsSelectedRowPalletsLoading(false);
			}
		}

		fetchRowPallets();
	}, [selectedRowId]);


	useEffect(() => {
		const fetchSelectedPallet = async () => {
			try {
				setIsSelectedPalletLoading(true);

				if (selectedPalletId) {
					const selectedPallet = await getPalletById(selectedPalletId);
					setSelectedPallet(selectedPallet);
				}
			} catch (error) {
				console.log(error);
			} finally {
				setIsSelectedPalletLoading(false);
			}
		}

		fetchSelectedPallet();
	}, [selectedPalletId]);







	useEffect(() => {

		setShowButtonGroup(false)

		return () => {
			setShowButtonGroup(false)
		}

	}, []);



	// HANDLERS 


	async function handleDeletePalletById() {
		try {
			setIsDeletingPalletById(true)

			await deletePalletById(pallet._id)


		} catch (error) {
			console.error('Ошибка при удалении Pallet:', error);
		} finally {
			setIsDeletingPalletById(false)
			setShowModalDeletePallet(false)
			router.back()
		}

	}



	async function handleUpdatePalletById(newTitle) {
		try {
			setIsUpdatingPalletById(true)

			const updateData = { ...pallet, title: newTitle }
			await updatePalletById(pallet._id, updateData);
			setPalletTitle(newTitle)

		} catch (error) {
			console.error('Ошибка при изменении  названия паллеты:', error);
		} finally {
			setIsUpdatingPalletById(false)
			setShowModalUpdatePallet(false)
		}
	}


	const handleCreatePos = async () => {

		try {
			setIsCreatingPos(true)

			const existingPos = posesInStore.find(pos => pos.artikul === newPosArtikul);

			if (existingPos) {

				const updatedData = {
					quant: +existingPos.quant + +newPosQuant,
					boxes: +existingPos.boxes + +newPosBoxes
				}

				await updatePosById(existingPos._id, updatedData)

			} else {
				await createPos(pallet._id, {
					quant: newPosQuant,
					boxes: newPosBoxes,
					date: newPosDate,
					sklad: newPosSklad
				})
			}



		} catch (error) {
			console.log(error)
		} finally {
			setIsCreatingPos(false)
			setShowModalCreatePos(false)

			setNewPosArtikul("")
			setNewPosQuant("")
			setNewPosBoxes("")
			setNewPosDate("")
			setNewPosSklad("")

		}
	};


	async function handleDeletePosById(id) {
		try {
			setIsDeletingPosById(true)

			const resDeletePos = await deletePosById(id)


		} catch (error) {
			console.log(error)
		} finally {
			setIsDeletingPosById(false)
			setShowModalDeletePos(false)
		}
	}


	async function handleUpdatePosById(id) {
		try {
			setIsUpdatingPosById(true)


			const updatedData = {
				quant: updatePosQuantValue,
				boxes: updatePosBoxesValue,
				date: updatePosDateValue,
				sklad: updatePosSkladValue,
			}


			const resUpdatePos = await updatePosById(id, updatedData)

		} catch (error) {

		} finally {
			setIsUpdatingPosById(false)
			setShowModalUpdatePos(false)
		}
	}


	async function handleClearPalletById(id) {
		try {

			const resClear = await clearPalletById(id)
			console.log(resClear)
			clearPosesStore()

		} catch (error) {
			console.log(error)
		} finally {
			setShowModalClearPallet(false)
		}
	}




	async function handleMovePalletContent(currentPalletId, targetPalletId) {

		try {
			const message = await movePalletContent(currentPalletId, targetPalletId);
			console.log(message); // Выводим сообщение об успешном перемещении
			clearPosesStore()
			// Дополнительные действия или обновление интерфейса, если необходимо
		} catch (error) {
			console.error('Ошибка при перемещении содержимого Pallet:', error);
			// Обработка ошибки, если что-то пошло не так
		} finally {
			setShowModalMovePalletContent(false)
		}


	}









	return (
		<ScreenContainer>
			<Stack.Screen
				options={{
					headerTitle: () => <Text className="text-center font-bold text-3xl text-white p-3" >
						{palletTitle}
					</Text>
				}}
			/>

			{isPalletLoading
				?
				<ActivityIndicator size="large" color={colors500.amber} />
				:
				<ScrollView
					className="p-1 space-y-2 "
				>



					{showButtonGroup
						?

						<View
							className="py-2 space-y-2 border-b-2 border-amber-500 bg-amber-500/10"
						>

							<TouchableOpacity
								className="flex-1 flex-row justify-center items-center"
								onPress={() => setShowModalUpdatePallet(true)}
							>
								<Text
									className="text-2xl text-lime-400"
								>
									Перейменувати
								</Text>
							</TouchableOpacity>

							<TouchableOpacity
								className="flex-1 flex-row justify-center items-center"
								onPress={() => setShowModalMovePalletContent(true)}
							>
								<Text
									className="text-2xl text-indigo-400"
								>
									Переставити
								</Text>
							</TouchableOpacity>

							<TouchableOpacity
								className="flex-1 flex-row justify-center items-center"
								onPress={() => setShowModalClearPallet(true)}
							>
								<Text
									className="text-2xl text-rose-100"
								>
									Очистити
								</Text>
							</TouchableOpacity>


							<TouchableOpacity
								className="flex-1 flex-row justify-center items-center"
								onPress={() => setShowModalDeletePallet(true)}
							>
								<Text
									className="text-2xl text-red-400"
								>
									Видалити
								</Text>
							</TouchableOpacity>





						</View>
						:
						null
					}



					<View
						className="flex-1 p-2
										"
					>
						<TouchableOpacity
							className="flex-1 p-2 flex-row items-center justify-center 
											 "
						>
							<Text
								className="text-teal-100 text-2xl"
							>
								Додати позицію
							</Text>
						</TouchableOpacity>

					</View>




					<View
						className=" flex-1 p-1 mt-2  rounded-xl "
					>

						{isPosesLoading
							?
							<ActivityIndicator size="large" color={colors500.sky} />
							:
							poses?.length > 0
								?
								<View
									className="space-y-2 flex-1"
								>
									<View
										className="flex-1  flex-row justify-between border-b border-teal-500"
									>

										<View
											className="flex-1 flex-row items-center justify-center space-x-2"
										>
											<Octicons name="note" size={24} color="#99f6e4" />
											<Text
												className="text-teal-200 text-3xl"
											>
												{poses?.length}
											</Text>
										</View>

										<View
											className="flex-1 flex-row items-center justify-center space-x-2"
										>
											<Feather name="box" size={24} color="#fde047" />
											<Text
												className="text-yellow-300 text-3xl"
											>
												{poses?.reduce((a, b) => a + b.boxes, 0)}
											</Text>
										</View>


									</View>






									<View
										className="flex-1 space-y-8 p-2"
									>
										{poses.map((pos) =>
											<PositionBage
												key={pos._id}
												pos={pos}
												artsCurrent={artsCurrent}
												onUpdate={() => setShowModalUpdatePos(true)}
												onDelete={() => setShowModalDeletePos(true)}
											/>

										)}

									</View>

								</View>


								:

								<Text
									className="text-xl text-teal-100 text-center italic "
								>
									На цій палеті позицій немає
								</Text>

						}

					</View>






				</ScrollView>
			}


		</ScreenContainer>
	)
}