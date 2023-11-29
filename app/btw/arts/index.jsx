import { View, Text, ActivityIndicator, Pressable, Alert, Image, TouchableOpacity, RefreshControl } from 'react-native'
import { styled } from 'nativewind';
import React, { useState } from 'react'
import { ScreenContainer } from '../../../components'
import { Link, useRouter } from 'expo-router'
import { useGetArtsCurrent } from '../../../hooks/useGetArtsCurrent'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { MagnifyingGlassIcon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon, ChevronLeftIcon, ChevronRightIcon, } from "react-native-heroicons/outline"
import { colors500 } from '../../../constants/Colors';


export default function ArtsPage() {

	const StyledView = styled(View)
	const StyledText = styled(Text)
	const StyledImage = styled(Image)


	const router = useRouter()


	const { artsCurrent, isLoadingArtsCurrent, errorLoadingArts } = useGetArtsCurrent()

	const step = 10

	const [searchValue, setSearchValue] = useState("")
	const [filteredArts, setFilteredArts] = useState([]);
	const [page, setPage] = useState(1);



	const [refreshing, setRefreshing] = useState(false);

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		setTimeout(() => {
			setRefreshing(false);
		}, 2000);
	}, []);



	// HANDLERS

	function handleFilterArts() {
		const filtered = artsCurrent.filter((art) =>
			art.artikul.toLowerCase().includes(searchValue.toLowerCase().trim()) ||
			art.nameukr.toLowerCase().includes(searchValue.toLowerCase().trim()) ||
			art.namerus.toLowerCase().includes(searchValue.toLowerCase().trim())
		);



		if (filtered.length === 0) {

		}

		setFilteredArts(filtered);
		setPage(1)
	}



	return (
		<ScreenContainer>

			<ScrollView
				className=" space-y-4 px-4 bg-sky-500/5"
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
			>




				<View
					className="flex-row justify-end items-center rounded-full bg-gray-500 mt-4 "
				>




					<TextInput
						placeholder='Введи артикул або назву'
						placeholderTextColor={"lightgray"}
						className="pl-6 h-10 flex-1 text-base text-white  "
						onChangeText={(text => setSearchValue(text))}
						value={searchValue}

						autoFocus={true}
					/>



					<TouchableOpacity
						className="rounded-full p-3 m-1 bg-sky-400"
						onPress={handleFilterArts}
					>
						<Text  ><MagnifyingGlassIcon size={25} color="white" /></Text>
					</TouchableOpacity>
				</View>


				{isLoadingArtsCurrent ? <ActivityIndicator size="large" color={colors500.sky} /> :

					<ScrollView
						className="space-y-4"
					>


						{filteredArts?.length === 0 || filteredArts?.length === artsCurrent?.length ?
							<View
								className="flex-1 flex justify-between p-2 space-y-4 rounded"

							>

								<View
									className="flex-row justify-between items-center"
								>

									<Text className="text-white text-xl">
										Всього: {artsCurrent?.length}
									</Text>

									<Text
										className="text-xl text-white bg-sky-500 p-1 rounded-xl"
									>
										{step * page - step + 1} - {step * page < artsCurrent?.length ? step * page : artsCurrent?.length}
									</Text>
								</View>


								<View
									className="space-x-3 flex flex-row items-center justify-between overflow-auto "
								>

									<TouchableOpacity onPress={() => setPage(1)} className=" rounded-full p-1" disabled={page === 1}>
										<Text  >
											<ChevronDoubleLeftIcon size={25} color={`${page === 1 ? "gray" : "white"}`} />
										</Text>
									</TouchableOpacity>

									<TouchableOpacity
										onPress={() => setPage((prev) => prev - 1)}
										className=" rounded-full p-1"
										disabled={page === 1}>
										<Text  >
											<ChevronLeftIcon size={25} color={`${page === 1 ? "gray" : "white"}`} />
										</Text>
									</TouchableOpacity>

									<Text className="text-white text-base " >
										Сторінка: {page}
									</Text>

									<TouchableOpacity
										onPress={() => setPage((prev) => prev + 1)}
										className=" rounded-full p-1"
										disabled={artsCurrent?.length / step / page < 1}>
										<Text  >
											<ChevronRightIcon size={25} color={`${artsCurrent?.length / step / page < 1 ? "gray" : "white"}`} />
										</Text>

									</TouchableOpacity>

									<TouchableOpacity
										onPress={() => setPage(Math.ceil(artsCurrent?.length / step))}
										className=" rounded-full p-1"
										disabled={artsCurrent?.length / step / page < 1}>
										<Text  >
											<ChevronDoubleRightIcon size={25} color={`${artsCurrent?.length / step / page < 1 ? "gray" : "white"}`} />
										</Text>

									</TouchableOpacity>


								</View>


							</View>

							:

							<View
								className="flex-1 flex justify-between p-2 space-y-4 rounded"
							>



								<View
									className="flex-row justify-between items-center"
								>

									<Text className="text-white text-xl">
										Знайдено: {filteredArts?.length}
									</Text>

									<Text
										className="text-xl text-white bg-sky-500 p-1 rounded-xl"
									>
										{step * page - step + 1} - {step * page < filteredArts?.length ? step * page : filteredArts?.length}
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
											<ChevronDoubleLeftIcon size={25} color={`${page === 1 ? "gray" : "white"}`} />
										</Text>
									</TouchableOpacity>

									<TouchableOpacity
										onPress={() => setPage((prev) => prev - 1)}
										className=" rounded-full p-1"
										disabled={page === 1}>
										<Text  >
											<ChevronLeftIcon size={25} color={`${page === 1 ? "gray" : "white"}`} />
										</Text>
									</TouchableOpacity>

									<Text
										className="text-white text-base " >
										Сторінка: {page}
									</Text>

									<TouchableOpacity
										onPress={() => setPage((prev) => prev + 1)}
										className=" rounded-full p-1"
										disabled={filteredArts?.length / step / page < 1}>
										<Text  >
											<ChevronRightIcon size={25} color={`${filteredArts?.length / step / page < 1 ? "gray" : "white"}`} />
										</Text>

									</TouchableOpacity>

									<TouchableOpacity
										onPress={() => setPage(Math.ceil(filteredArts?.length / step))}
										className=" rounded-full p-1"
										disabled={filteredArts?.length / step / page < 1}>
										<Text  >
											<ChevronDoubleRightIcon size={25} color={`${filteredArts?.length / step / page < 1 ? "gray" : "white"}`} />
										</Text>

									</TouchableOpacity>


								</View>

							</View>


						}







						{isLoadingArtsCurrent ?
							<ActivityIndicator />
							:
							<StyledView className="space-y-2 flex-1  justify-center">
								{filteredArts?.length === 0
									?
									artsCurrent?.slice(step * page - step, step * page).map((art) =>

										<View
											key={art._id}
											className="flex-row space-x-2 bg-sky-500/20 border border-sky-500 w-full rounded-xl"
										>


											<View
												className="justify-center bg-white rounded-l-xl p-1"
											>
												<StyledImage
													style={{
														height: 100,
														width: 100,
														resizeMode: "contain"
													}}
													className="rounded-xl"
													source={{ uri: `https://sharik.ua/images/elements_big/${art.artikul}_m1.jpg` }}
												/>

											</View>



											<TouchableOpacity
												className="flex-1 justify-center"
												onPress={() => router.push(`/btw/arts/${art._id}/`)}
											>
												<Text
													className="text-white text-xl p-1  "
													numberOfLines={3}
												>
													{art.nameukr}
												</Text>
											</TouchableOpacity>


										</View>


									)

									:
									filteredArts?.slice(step * page - step, step * page).map((art) =>
										<View
											key={art._id}
											className="flex-row space-x-2 bg-sky-500/40 border border-sky-500 w-full rounded-xl"
										>


											<View
												className="justify-center bg-white rounded-l-xl p-1"
											>
												<StyledImage
													style={{
														height: 100,
														width: 100,
														resizeMode: "contain"
													}}
													className="rounded-xl"
													source={{ uri: `https://sharik.ua/images/elements_big/${art.artikul}_m1.jpg` }}
												/>

											</View>



											<TouchableOpacity
												className="flex-1 justify-center"
												onPress={() => router.push(`/btw/arts/${art._id}/`)}
											>
												<Text
													className="text-white text-xl p-1 "
													numberOfLines={3}
												>
													{art.nameukr}
												</Text>
											</TouchableOpacity>


										</View>

									)}

							</StyledView>

						}



					</ScrollView>

				}

			</ScrollView>
		</ScreenContainer >
	)
}