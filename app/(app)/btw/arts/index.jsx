import { View, Text, ActivityIndicator, Pressable, Alert, Image, TouchableOpacity, RefreshControl } from 'react-native'
import { styled } from 'nativewind';
import React, { useEffect, useState } from 'react'
import { ScreenContainer } from '../../../../components'
import { Link, useRouter } from 'expo-router'
import { useGetArtsCurrent } from '../../../../hooks/useGetArtsCurrent'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { MagnifyingGlassIcon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon, ChevronLeftIcon, ChevronRightIcon, } from "react-native-heroicons/outline"
import { colors500 } from '../../../../constants/Colors';
import ArtBage from './components/ArtBage';


export default function ArtsPage() {


	const StyledImage = styled(Image)


	const router = useRouter()


	const { artsCurrent, isLoadingArtsCurrent, errorLoadingArts } = useGetArtsCurrent()

	const step = 10

	const [searchValue, setSearchValue] = useState("")
	const [filteredArts, setFilteredArts] = useState([]);
	const [page, setPage] = useState(1);



useEffect(
	() => {
		setFilteredArts(artsCurrent)
	}, [artsCurrent]
)





	const [refreshing, setRefreshing] = useState(false);

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		setTimeout(() => {
			setRefreshing(false);
		}, 2000);
	}, []);



	// HANDLERS

	function handleFilterArts(searchValue) {
		const filtered = artsCurrent?.filter((art) =>
			art.artikul.toLowerCase().includes(searchValue.toLowerCase().trim()) ||
			art.nameukr.toLowerCase().includes(searchValue.toLowerCase().trim()) ||
			art.namerus.toLowerCase().includes(searchValue.toLowerCase().trim())
		);



		if (filtered.length === 0) {

		}

		if (artsCurrent) {
			setFilteredArts(filtered);
			setPage(1)
		}
	}



	return (
		<ScreenContainer>
			{isLoadingArtsCurrent ? <ActivityIndicator size="large" color={colors500.sky} /> :
				<ScrollView
					className=" space-y-4 px-4 bg-sky-500/5"

				>




					<View
						className="flex-row justify-end items-center  rounded-full bg-slate-800 focus:bg-slate-700  mt-4 "
					>




						<TextInput
							placeholder='.....'
							placeholderTextColor={"#888"}
							className=" text-center h-10 flex-1 text-3xl text-white  "
							onChangeText={text => {
								setSearchValue(text)
								handleFilterArts(text)
							}}
							value={searchValue}

							autoFocus={true}
						/>




					</View>




					<ScrollView
						className="space-y-4"
					>


						{filteredArts?.length === 0 || filteredArts?.length === artsCurrent?.length ?
							<View
								className="flex-1 flex justify-between p-2 space-y-4 rounded"

							>

								<View
									className="flex-row justify-between items-center border-b border-sky-100"
								>

									<Text className="text-white text-2xl  p-1 rounded-xl">
										Всього: {artsCurrent?.length}
									</Text>

									<Text
										className="text-2xl text-white p-1 rounded-xl"
									>
										{step * page - step + 1} - {step * page < artsCurrent?.length ? step * page : artsCurrent?.length}
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
										disabled={artsCurrent?.length / step / page < 1}>
										<Text  >
											<ChevronRightIcon size={36} color={`${artsCurrent?.length / step / page < 1 ? "gray" : "white"}`} />
										</Text>

									</TouchableOpacity>

									<TouchableOpacity
										onPress={() => setPage(Math.ceil(artsCurrent?.length / step))}
										className=" rounded-full p-1"
										disabled={artsCurrent?.length / step / page < 1}>
										<Text  >
											<ChevronDoubleRightIcon size={36} color={`${artsCurrent?.length / step / page < 1 ? "gray" : "white"}`} />
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
										Знайдено: {filteredArts?.length}
									</Text>

									<Text
										className="text-2xl text-white p-1 rounded-xl"
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
										disabled={filteredArts?.length / step / page < 1}>
										<Text  >
											<ChevronRightIcon size={36} color={`${filteredArts?.length / step / page < 1 ? "gray" : "white"}`} />
										</Text>

									</TouchableOpacity>

									<TouchableOpacity
										onPress={() => setPage(Math.ceil(filteredArts?.length / step))}
										className=" rounded-full p-1"
										disabled={filteredArts?.length / step / page < 1}>
										<Text  >
											<ChevronDoubleRightIcon size={36} color={`${filteredArts?.length / step / page < 1 ? "gray" : "white"}`} />
										</Text>

									</TouchableOpacity>


								</View>

							</View>


						}







						{isLoadingArtsCurrent ?
							<ActivityIndicator size="large" color={colors500.sky} />
							:
							<View className="space-y-2 flex-1  justify-center">

								{filteredArts?.length === 0 ?

									<Text
										className="text-white text-center"
									>
										Нічого не знайдено
									</Text>
									:
									filteredArts?.length === artsCurrent?.length
										?
										artsCurrent?.slice(step * page - step, step * page).map((art) =>

											<ArtBage
												key={art._id}
												art={art}
												onPress={() => router.push(`/(app)/btw/arts/${art._id}/`)}
											/>


										)

										:
										filteredArts?.slice(step * page - step, step * page).map((art) =>
											<ArtBage
												key={art._id}
												art={art}
												onPress={() => router.push(`/(app)/btw/arts/${art._id}/`)}
											/>

										)}
							</View>

						}



					</ScrollView>



				</ScrollView>}
		</ScreenContainer >
	)
}