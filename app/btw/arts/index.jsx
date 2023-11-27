import { View, Text, ActivityIndicator, Pressable, Alert, Image, TouchableOpacity } from 'react-native'
import { styled } from 'nativewind';
import React, { useState } from 'react'
import { ScreenContainer } from '../../../components'
import { Link, useRouter } from 'expo-router'
import { useGetArtsCurrent } from '../../../hooks/useGetArtsCurrent'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { MagnifyingGlassIcon } from "react-native-heroicons/outline"


export default function ArtsPage() {

	const StyledView = styled(View)
	const StyledText = styled(Text)
	const StyledImage = styled(Image)


	const router = useRouter()


	const { artsCurrent, isLoadingArtsCurrent, errorLoadingArts } = useGetArtsCurrent()

	const step = 30

	const [searchValue, setSearchValue] = useState("")
	const [filteredArts, setFilteredArts] = useState([]);
	const [page, setPage] = useState(1);



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
				// style={{ height: "7%" }}
				className="mx-4 space-y-4 "
			>
				{/* {isLoadingArtsCurrent ? <ActivityIndicator /> : <Text className="text-white text-xl text-center"> {artsCurrent?.length}</Text>} */}






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



					<Pressable
						className="rounded-full p-3 m-1 bg-sky-400"
						onPress={handleFilterArts}
					>
						<Text  ><MagnifyingGlassIcon size={25} color="white" /></Text>
					</Pressable>
				</View>




				<ScrollView
					className="space-y-4"
				>


					{filteredArts?.length === 0 || filteredArts?.length === artsCurrent?.length ?
						<View
							className="flex-1 flex justify-between p-2 border  border-sky-500 rounded"

						>

							<View
								className="flex-row justify-between items-center"
							>

								<Text className="text-white">
									Всього: {artsCurrent?.length}
								</Text>

								<Text
									className="text-xl text-white"
								>
									{step * page - step + 1} - {step * page < artsCurrent?.length ? step * page : artsCurrent?.length}
								</Text>
							</View>


							<View
								className="space-x-3 flex flex-row items-center justify-center overflow-auto "
							>

								<Pressable onPress={() => setPage(1)} className="border border-sky-500 rounded-full p-1" disabled={page === 1}>
									<Text className="text-white text-base text-center">Початок</Text>
								</Pressable>

								<Pressable onPress={() => setPage((prev) => prev - 1)} className="border border-sky-500 rounded-full p-1" disabled={page === 1}>
									<Text className="text-white text-base ">Назад</Text>
								</Pressable>

								<Text className="text-white text-base " >
									Сторінка: {page}
								</Text>

								<Pressable onPress={() => setPage((prev) => prev + 1)} className="border border-sky-500 rounded-full p-1" disabled={artsCurrent?.length / step / page < 1}>
									<Text className="text-white text-base ">Далі</Text>

								</Pressable>

								<Pressable onPress={() => setPage(Math.ceil(artsCurrent?.length / step))} className="border border-sky-500 rounded-full p-1" disabled={artsCurrent?.length / step / page < 1}>
									<Text className="text-white text-base ">Кінець</Text>

								</Pressable>


							</View>


						</View>

						:

						<View
							className="flex flex-wrap justify-between p-2 border  border-sky-500 rounded bg-sky-500/20"
						>




							<Text
								className="text-white">

								Знайдено: {filteredArts?.length}
							</Text>



							<Text
								className="text-xl text-white"

							>
								{step * page - step + 1} - {step * page < filteredArts?.length ? step * page : filteredArts?.length}
							</Text>



							<View
								className="space-x-3 flex flex-wrap"
							>

								<Pressable onPress={() => setPage(1)} className="indigo-b " disabled={page === 1}>
									<Text className="text-white">Початок</Text>
								</Pressable >

								<Pressable onPress={() => setPage((prev) => prev - 1)} className="indigo-b" disabled={page === 1}>
									<Text className="text-white">Назад</Text>
								</Pressable >

								<Text className="text-white" >
									Сторінка: {page}
								</Text>



								<Pressable onPress={() => setPage((prev) => prev + 1)} className="indigo-b" disabled={filteredArts?.length / step / page < 1}>
									<Text className="text-white">Далі</Text>
								</Pressable >

								<Pressable onPress={() => setPage(Math.ceil(filteredArts?.length / step))} className="indigo-b" disabled={filteredArts?.length / step / page < 1}>
									<Text className="text-white">Кінець</Text>

								</Pressable>

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
										className="flex-row space-x-2 bg-sky-500/20 w-full"
									>


										<StyledImage
											style={{
												height: 50,
												width: 50,
												resizeMode: "cover"
											}}
											className=""
											source={{ uri: "https://sharik.ua/images/elements_big/1101-0001_m1.jpg" }}
										/>





										<TouchableOpacity
											className="flex-1"
											onPress={() => router.push(`/btw/arts/${art._id}/`)}
										>
											<Text
												className="text-white text-xl  "


												numberOfLines={2}
											>
												{art.nameukr}
											</Text>
										</TouchableOpacity>


									</View>


								)

								:
								filteredArts?.slice(step * page - step, step * page).map((art) =>
									<Link
										key={art._id}
										href={`/btw/arts/${art._id}/`}
									>

										<Text className="text-white text-xl bg-green-500">
											{art.nameukr}
										</Text>


									</Link>
								)}

						</StyledView>

					}



				</ScrollView>



			</ScrollView>
		</ScreenContainer >
	)
}