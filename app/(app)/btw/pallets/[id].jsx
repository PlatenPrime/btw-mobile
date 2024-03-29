import { View, Text, ActivityIndicator, Image, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import React, { useEffect, useState } from 'react'
import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router'

import { usePalletStore } from '../../../../stores/palletsStore'
import { usePosesStore } from '../../../../stores/posesStore'
import { useRowStore } from '../../../../stores/rowsStore';
import { useGlobalStore } from '../../../../stores/globalStore'

import { useGetArtsCurrent } from "../../../../hooks/useGetArtsCurrent"
import { colors500 } from '../../../../constants/Colors'
import { Octicons, Feather } from '@expo/vector-icons';

import { ScreenContainer } from '../../../../components';
import PositionBage from "./components/PositionBage";
import { ModalClearPallet, ModalCreatePos, ModalDeletePallet, ModalDeletePos, ModalMovePalletContent, ModalUpdatePallet, ModalUpdatePos } from "./components/modals"
import useAuthStore from '../../../../stores/authStore'
import { LinearGradient } from 'expo-linear-gradient'








export default function PalletPage() {

	const { id } = useLocalSearchParams()
	const router = useRouter()

	const { artsCurrent, isLoadingArtsCurrent, errorLoadingArts } = useGetArtsCurrent()

	const { showButtonGroup, setShowButtonGroup } = useGlobalStore()


	const { getPalletById, deletePalletById, updatePalletById, clearPalletById, movePalletContent, getSelectedRowPallets, allPallets, getAllPallets } = usePalletStore();
	const { getRowById, getAllRows, rows } = useRowStore();
	const { getPalletPoses, clearPosesStore, createPos, deletePosById, poses, updatePosById, addNewPosToAllPoses } = usePosesStore()
	const { user } = useAuthStore()





	// STATES

	const [pallet, setPallet] = useState(null)

	const [palletTitle, setPalletTitle] = useState(pallet?.title)

	const [isPalletLoading, setIsPalletLoading] = useState(false)
	const [isPosesLoading, setIsPosesLoading] = useState(false);
	const [isSelectedPalletLoading, setIsSelectedPalletLoading] = useState(false);


	const [isDeletingPalletById, setIsDeletingPalletById] = useState(false)
	const [isUpdatingPalletById, setIsUpdatingPalletById] = useState(false)
	const [isCreatingPos, setIsCreatingPos] = useState(false)
	const [isDeletingPosById, setIsDeletingPosById] = useState(false)
	const [isUpdatingPosById, setIsUpdatingPosById] = useState(false)
	const [isClearingPalletById, setIsClearingPalletById] = useState(false)
	const [isMovingPalletContent, setIsMovingPalletContent] = useState(false)



	const [selectedPos, setSelectedPos] = useState(null)
	const [selectedPalletId, setSelectedPalletId] = useState(null)
	const [selectedPallet, setSelectedPallet] = useState(null)


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


		const fetchAllPallets = async () => {
			try {
				const pallets = await getAllPallets()

			} catch (error) {
				console.log(error)
			}
		}

		fetchAllPallets()

	}, [])




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


	const handleCreatePos = async ({
		newPosArtikul,
		newPosQuant,
		newPosBoxes,
		newPosDate,
		newPosSklad,
		newPosCom,

	}) => {

		try {
			setIsCreatingPos(true)

			const existingPos = poses.find(pos => pos.artikul === newPosArtikul);

			let newPos

			if (existingPos && existingPos.sklad === newPosSklad && existingPos.date === newPosDate && existingPos.com === newPosCom) {

				const updatedData = {
					quant: +existingPos.quant + +newPosQuant,
					boxes: +existingPos.boxes + +newPosBoxes
				}

				newPos = await updatePosById(existingPos._id, updatedData)

			} else {
				newPos = await createPos(pallet._id, {
					artikul: newPosArtikul.trim(),
					quant: newPosQuant,
					boxes: newPosBoxes,
					date: newPosDate,
					sklad: newPosSklad,
					com: newPosCom,

				})
			}


			await addNewPosToAllPoses(newPos)



		} catch (error) {
			console.log(error)
		} finally {
			setIsCreatingPos(false)
			setShowModalCreatePos(false)



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
			setShowButtonGroup(false)
		}
	}


	async function handleUpdatePosById(id, updatedData) {
		try {
			setIsUpdatingPosById(true)


			const resUpdatePos = await updatePosById(id, updatedData)

		} catch (error) {

		} finally {
			setIsUpdatingPosById(false)
			setShowModalUpdatePos(false)
			setShowButtonGroup(false)
		}
	}


	async function handleClearPalletById() {
		try {
			setIsClearingPalletById(true)

			const resClear = await clearPalletById(pallet._id)
			console.log(resClear)
			clearPosesStore()

		} catch (error) {
			console.log(error)
		} finally {
			setIsClearingPalletById(false)
			setShowModalClearPallet(false)
			setShowButtonGroup(false)
		}
	}




	async function handleMovePalletContent(currentPalletId, targetPalletId) {

		try {
			setIsMovingPalletContent(true)
			console.log("Before");

			const message = await movePalletContent(currentPalletId, targetPalletId);
			console.log("After");
			console.log(message); // Выводим сообщение об успешном перемещении
			clearPosesStore()
			// Дополнительные действия или обновление интерфейса, если необходимо
		} catch (error) {
			console.error('Ошибка при перемещении содержимого Pallet:', error);
			// Обработка ошибки, если что-то пошло не так
		} finally {
			setIsMovingPalletContent(false)
			setShowModalMovePalletContent(false)
			setShowButtonGroup(false)
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



			{showButtonGroup && (user?.role === "SKLAD" || user?.role === "PRIME")
				?

				<View
					className="flex-1 min-h-full absolute z-10 w-full"
				>


					<View
					className="bg-slate-900"
					>
					{/* <LinearGradient colors={['#3b82f6', '#1d4ed8']} > */}
					<TouchableOpacity
						className=" py-4     flex-row justify-center items-center"
						onPress={() => setShowModalUpdatePallet(true)}
					>
						<Text
							className="text-2xl text-white"
						>
							Перейменувати
						</Text>
					</TouchableOpacity>
					{/* </LinearGradient> */}


					{/* <LinearGradient colors={['#eab308', '#a16207']} > */}
					<TouchableOpacity
						className="  py-4 flex-row justify-center items-center"
						onPress={() => setShowModalMovePalletContent(true)}
					>
						<Text
							className="text-2xl text-yellow-100"
						>
							Переставити
						</Text>
					</TouchableOpacity>
					{/* </LinearGradient> */}




					<TouchableOpacity
						className=" py-4  flex-row justify-center items-center"
						onPress={() => setShowModalClearPallet(true)}
					>
						<Text
							className="text-2xl text-rose-300"
						>
							Очистити
						</Text>
					</TouchableOpacity>




					{/* <LinearGradient colors={['#ef4444', '#0f172a']} > */}
					<TouchableOpacity
						className="  py-4  flex-row justify-center items-center"
						onPress={() => setShowModalDeletePallet(true)}
					>
						<Text
							className="text-2xl text-red-500"
						>
							Видалити
						</Text>
					</TouchableOpacity>
					{/* </LinearGradient> */}

					</View>









					{/* <LinearGradient colors={['#0ea5e988', '#333333ee']} > */}
					<TouchableOpacity
						className=" py-96 h-full bg-transparent  flex-row justify-center items-center  "
						onPress={() => {
							setShowButtonGroup(false)
						}}
					>

					</TouchableOpacity>
					{/* </LinearGradient> */}


				</View>
				:
				null
			}




			{isPalletLoading
				?
				<ActivityIndicator size="large" color={colors500.amber} />
				:

				<View
					className="flex-1 h-full"
				>
					<ScrollView
						className="flex-1 "
					>








						{/* MODALS */}

						<ModalDeletePallet
							showModalDeletePallet={showModalDeletePallet}
							setShowModalDeletePallet={setShowModalDeletePallet}
							palletTitle={palletTitle}
							isDeletingPalletById={isDeletingPalletById}
							handleDeletePalletById={handleDeletePalletById}

						/>



						<ModalUpdatePallet
							showModalUpdatePallet={showModalUpdatePallet}
							setShowModalUpdatePallet={setShowModalUpdatePallet}
							palletTitle={palletTitle}
							isUpdatingPalletById={isUpdatingPalletById}
							handleUpdatePalletById={handleUpdatePalletById}
						/>

						<ModalCreatePos
							showModalCreatePos={showModalCreatePos}
							setShowModalCreatePos={setShowModalCreatePos}
							isCreatingPos={isCreatingPos}
							artsCurrent={artsCurrent}
							handleCreatePos={handleCreatePos}

						/>

						<ModalDeletePos
							showModalDeletePos={showModalDeletePos}
							setShowModalDeletePos={setShowModalDeletePos}
							selectedPos={selectedPos}
							isDeletingPosById={isDeletingPosById}
							handleDeletePosById={handleDeletePosById}

						/>


						<ModalUpdatePos
							showModalUpdatePos={showModalUpdatePos}
							setShowModalUpdatePos={setShowModalUpdatePos}
							selectedPos={selectedPos}
							artsCurrent={artsCurrent}
							isUpdatingPosById={isUpdatingPosById}
							handleUpdatePosById={handleUpdatePosById}
						/>


						<ModalClearPallet
							showModalClearPallet={showModalClearPallet}
							setShowModalClearPallet={setShowModalClearPallet}
							palletTitle={palletTitle}
							isClearingPalletById={isClearingPalletById}
							handleClearPalletById={handleClearPalletById}
						/>


						<ModalMovePalletContent
							showModalMovePalletContent={showModalMovePalletContent}
							setShowModalMovePalletContent={setShowModalMovePalletContent}
							pallet={pallet}
							palletTitle={palletTitle}
							allPallets={allPallets}
							setSelectedPalletId={setSelectedPalletId}
							selectedPalletId={selectedPalletId}
							isMovingPalletContent={isMovingPalletContent}
							handleMovePalletContent={handleMovePalletContent}
						/>





						{/* CONTENT */}


						<View
							className="flex-1 h-full
										"
						>
							<TouchableOpacity
								onPress={() => setShowModalCreatePos(true)}
								className=" py-4 flex-1 flex-row justify-center items-center 
											 "
							>
								<Text
									className="flex-1 text-center text-teal-100 text-2xl"
								>
									Додати позицію
								</Text>
							</TouchableOpacity>

						</View>




						<View
							className="flex-1  p-1 mt-2  rounded-xl "
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
											className="flex-1 p-3  flex-row justify-between border-b border-teal-500"
										>

											<View
												className="flex-1 flex-row items-center justify-center space-x-2"
											>
												<Octicons name="note" size={16} color="#99f6e4" />
												<Text
													className="text-teal-200 text-2xl"
												>
													{poses?.length}
												</Text>
											</View>

											<View
												className="flex-1 flex-row items-center justify-center space-x-2"
											>
												<Feather name="box" size={16} color="#fde047" />
												<Text
													className="text-yellow-300 text-2xl"
												>
													{poses?.reduce((a, b) => a + b.boxes, 0)}
												</Text>
											</View>


										</View>






										<View
											className=" space-y-2 p-2"
										>
											{poses.map((pos) =>
												<PositionBage
													key={pos._id}
													pos={pos}
													artsCurrent={artsCurrent}
													onUpdate={() => {
														setShowModalUpdatePos(true)
														setSelectedPos(pos)
													}}
													onDelete={() => {
														setShowModalDeletePos(true)
														setSelectedPos(pos)
													}}
												/>

											)}

										</View>

									</View>


									:

									<View
										className="flex-1 h-full justify-center items-center py-48 "
									>

										<Text
											className="text-2xl text-teal-100 text-center italic"
										>
											На цій палеті позицій немає
										</Text>
									</View>
							}

						</View>






					</ScrollView>
				</View>

			}


		</ScreenContainer>
	)
}