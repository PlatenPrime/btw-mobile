import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, Modal, ActivityIndicator, TouchableOpacity, ScrollView, TextInput, Image } from 'react-native';
import { ScreenContainer } from '../../../../components';
import { usePosesStore } from '../.././../../stores/posesStore';
import { Link, useRouter } from 'expo-router';
import { colors500 } from '../../../../constants/Colors'
import { useGlobalStore } from "../../../../stores/globalStore";
import useAuthStore from '../../../../stores/authStore';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon, ChevronLeftIcon, ChevronRightIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { useGetArtsCurrent } from '../../../../hooks/useGetArtsCurrent';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';



export default function Stocks() {


	const router = useRouter()

	const { artsCurrent, isLoadingArtsCurrent, errorLoadingArts } = useGetArtsCurrent()

	const { allPoses, getAllPoses } = usePosesStore()
	const [isLoadingPoses, setIsLoadingPoses] = useState(false)

	const step = 10

	const [searchValue, setSearchValue] = useState("")
	const [filteredPoses, setFilteredPoses] = useState([]);
	const [page, setPage] = useState(1);


	function handleFilterPoses(searchValue) {
		const filtered = allPoses?.filter((pos) =>
			pos.artikul.toLowerCase().includes(searchValue.toLowerCase().trim())
		);



		if (filtered.length === 0) {

		}

		if (allPoses) {
			setFilteredPoses(filtered);
			setPage(1)
		}
	}



	useEffect(() => {


		const fetchPoses = async () => {
			try {
				setIsLoadingPoses(true)

				await getAllPoses()


			} catch (error) {
				console.log(error);

			} finally {
				setIsLoadingPoses(false)
			}
		}

		fetchPoses()

	}, [])



	return (
		<ScreenContainer>


			{isLoadingPoses ?
				<ActivityIndicator size="large" color={colors500.emerald} />
				:
				<ScrollView
					className=" space-y-4 px-4 bg-emerald-500/5"
				>

					<View
						className="flex-row justify-center items-center  rounded-full bg-emerald-900/40 focus:bg-emerald-700/50  mt-4 p-2 "
					>




						<TextInput
							placeholder='.......'
							placeholderTextColor={"#888"}
							className=" text-center h-10 flex-1 text-3xl text-white  "
							onChangeText={
								text => {
									setSearchValue(text)
									handleFilterPoses(text)
								}


							}
							value={searchValue}
							autoFocus={true}
						/>



						{/* <TouchableOpacity
							className="rounded-full p-3 m-1 bg-emerald-400/20"
							onPress={handleFilterPoses}
						>
							<Text  ><MagnifyingGlassIcon size={36} color="white" /></Text>
						</TouchableOpacity> */}
					</View>


					<View
						className="space-y-4"

					>




						{filteredPoses?.length === 0 || filteredPoses?.length === allPoses?.length ?
							<View
								className="flex-1 flex justify-between p-2 space-y-4 rounded"

							>

								<View
									className="flex-row justify-between items-center border-b border-sky-100"
								>

									<Text className="text-white text-2xl  p-1 rounded-xl">
										Всього: {allPoses?.length}
									</Text>

									<Text
										className="text-2xl text-white p-1 rounded-xl"
									>
										{step * page - step + 1} - {step * page < allPoses?.length ? step * page : allPoses?.length}
									</Text>
								</View>


								<View
									className="space-x-3 flex flex-row items-center justify-between overflow-auto "
								>

									<TouchableOpacity onPress={() => setPage(1)} className=" rounded-full p-1" disabled={page === 1}>
										<Text  >
											<ChevronDoubleLeftIcon size={36} color={`${page === 1 ? "gray" : "white"}`} />
										</Text>
									</TouchableOpacity>

									<TouchableOpacity
										onPress={() => setPage((prev) => prev - 1)}
										className=" rounded-full p-1"
										disabled={page === 1}>
										<Text  >
											<ChevronLeftIcon size={36} color={`${page === 1 ? "gray" : "white"}`} />
										</Text>
									</TouchableOpacity>

									<Text className="text-white text-xl " >
										Сторінка: {page}
									</Text>

									<TouchableOpacity
										onPress={() => setPage((prev) => prev + 1)}
										className=" rounded-full p-1"
										disabled={allPoses?.length / step / page < 1}>
										<Text  >
											<ChevronRightIcon size={36} color={`${allPoses?.length / step / page < 1 ? "gray" : "white"}`} />
										</Text>

									</TouchableOpacity>

									<TouchableOpacity
										onPress={() => setPage(Math.ceil(allPoses?.length / step))}
										className=" rounded-full p-1"
										disabled={allPoses?.length / step / page < 1}>
										<Text  >
											<ChevronDoubleRightIcon size={36} color={`${allPoses?.length / step / page < 1 ? "gray" : "white"}`} />
										</Text>

									</TouchableOpacity>


								</View>


							</View>

							:

							<View
								className="flex-1 flex justify-between p-2 space-y-4 rounded"
							>



								<View
									className="flex-row justify-between items-center border-b border-sky-100"
								>

									<Text className="text-white text-2xl  p-1 rounded-xl">
										Знайдено: {filteredPoses?.length}
									</Text>

									<Text
										className="text-2xl text-white p-1 rounded-xl"
									>
										{step * page - step + 1} - {step * page < filteredPoses?.length ? step * page : filteredPoses?.length}
									</Text>
								</View>


								<View
									className="space-x-3 flex flex-row items-center justify-between overflow-auto "
								>

									<TouchableOpacity
										onPress={() => setPage(1)}
										className=" rounded-full p-1"
										disabled={page === 1}>
										<Text  >
											<ChevronDoubleLeftIcon size={36} color={`${page === 1 ? "gray" : "white"}`} />
										</Text>
									</TouchableOpacity>

									<TouchableOpacity
										onPress={() => setPage((prev) => prev - 1)}
										className=" rounded-full p-1"
										disabled={page === 1}>
										<Text  >
											<ChevronLeftIcon size={36} color={`${page === 1 ? "gray" : "white"}`} />
										</Text>
									</TouchableOpacity>

									<Text className="text-white text-xl " >
										Сторінка: {page}
									</Text>

									<TouchableOpacity
										onPress={() => setPage((prev) => prev + 1)}
										className=" rounded-full p-1"
										disabled={filteredPoses?.length / step / page < 1}>
										<Text  >
											<ChevronRightIcon size={36} color={`${filteredPoses?.length / step / page < 1 ? "gray" : "white"}`} />
										</Text>

									</TouchableOpacity>

									<TouchableOpacity
										onPress={() => setPage(Math.ceil(filteredPoses?.length / step))}
										className=" rounded-full p-1"
										disabled={filteredPoses?.length / step / page < 1}>
										<Text  >
											<ChevronDoubleRightIcon size={36} color={`${filteredPoses?.length / step / page < 1 ? "gray" : "white"}`} />
										</Text>

									</TouchableOpacity>


								</View>

							</View>


						}









						<View className="space-y-2 flex-1  justify-center">
							{filteredPoses?.length === 0
								?
								allPoses?.slice(step * page - step, step * page).map((pos) =>

									<View
										key={pos._id}
										className="flex-row space-x-2 bg-emerald-500/20 border border-emerald-500 w-full rounded-xl"
									>


										<View
											className="justify-center bg-white rounded-l-xl p-1"
										>
											<Image
												style={{
													height: 100,
													width: 100,
													resizeMode: "contain"
												}}
												className="rounded-xl"
												source={{ uri: `https://sharik.ua/images/elements_big/${pos.artikul}_m1.jpg` }}
											/>

										</View>



										<TouchableOpacity
											className="flex-1 justify-center"
											onPress={() => router.push(`/(app)/btw/pallets/${pos.pallet}/`)}
										>
											<Text
												className="text-white text-2xl p-1 text-center "
												numberOfLines={3}
											>
												{pos.artikul}
											</Text>

											{artsCurrent?.find(art => art.artikul === pos.artikul)
												?
												<Text
													className="text-white text-xl p-1 italic "
													numberOfLines={3}
												>
													{artsCurrent?.find(art => art.artikul === pos.artikul)?.nameukr?.slice(10)}
												</Text>
												: null}







											<View
												className="flex-1 flex-row justify-between space-x-1"

											>



												<View
													className=" w-1/2 flex-1  flex-row justify-center items-center bg-amber-500/10 rounded-xl "
												>
													<MaterialCommunityIcons name="shipping-pallet" size={24} color="#fff" />
													<Text
														className="text-white text-lg p-1  "
														numberOfLines={3}
													>
														{pos.palletTitle}
													</Text>
												</View>




												<View
													className=" w-1/2 p-2   justify-between items-center rounded-b-xl bg-sky-500/10 rounded-xl "
												>

													<View
														className=" flex-row items-center justify-end  rounded-xl"
													>
														<MaterialCommunityIcons name="balloon" size={16} color="#e0f2fe" />
														<Text
															className="text-teal-100 text-lg "
														>
															{pos.quant}
														</Text>

													</View>

													<View
														className=" flex-row items-center justify-end space-x-2"
													>
														<Feather name="box" size={16} color="#facc15" />
														<Text
															className="text-yellow-400 text-lg "
														>
															{pos.boxes}
														</Text>

													</View>


												</View>



											</View>






										</TouchableOpacity>


									</View>


								)

								:
								filteredPoses?.slice(step * page - step, step * page).map((pos) =>
									<View
										key={pos._id}
										className="flex-row space-x-2 bg-emerald-500/20 border border-emerald-500 w-full rounded-xl"
									>


										<View
											className="justify-center bg-white rounded-l-xl p-1"
										>
											<Image
												style={{
													height: 100,
													width: 100,
													resizeMode: "contain"
												}}
												className="rounded-xl"
												source={{ uri: `https://sharik.ua/images/elements_big/${pos.artikul}_m1.jpg` }}
											/>

										</View>




										<TouchableOpacity
											className="flex-1 justify-center"
											onPress={() => router.push(`/(app)/btw/pallets/${pos.pallet}/`)}
										>
											<Text
												className="text-white text-2xl p-1 text-center "
												numberOfLines={3}
											>
												{pos.artikul}
											</Text>

											{artsCurrent?.find(art => art.artikul === pos.artikul)
												?
												<Text
													className="text-white text-xl p-1 italic "
													numberOfLines={3}
												>
													{artsCurrent?.find(art => art.artikul === pos.artikul)?.nameukr?.slice(10)}
												</Text>
												: null}







											<View
												className="flex-1 flex-row justify-between space-x-1"

											>



												<View
													className=" w-1/2 flex-1  flex-row justify-center items-center bg-amber-500/10 rounded-xl "
												>
													<MaterialCommunityIcons name="shipping-pallet" size={24} color="#fff" />
													<Text
														className="text-white text-lg p-1  "
														numberOfLines={3}
													>
														{pos.palletTitle}
													</Text>
												</View>




												<View
													className=" w-1/2 p-2   justify-between items-center rounded-b-xl bg-sky-500/10 rounded-xl "
												>

													<View
														className=" flex-row items-center justify-end  rounded-xl"
													>
														<MaterialCommunityIcons name="balloon" size={16} color="#e0f2fe" />
														<Text
															className="text-teal-100 text-lg "
														>
															{pos.quant}
														</Text>

													</View>

													<View
														className=" flex-row items-center justify-end space-x-2"
													>
														<Feather name="box" size={16} color="#facc15" />
														<Text
															className="text-yellow-400 text-lg "
														>
															{pos.boxes}
														</Text>

													</View>


												</View>



											</View>






										</TouchableOpacity>



									</View>

								)}

						</View>
















					</View>






				</ScrollView>
			}



		</ScreenContainer>
	)


}