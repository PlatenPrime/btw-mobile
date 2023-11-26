import { View, Text, ActivityIndicator, Pressable, Alert } from 'react-native'
import React, { useState } from 'react'
import { ScreenContainer } from '../../../components'
import { Link } from 'expo-router'
import { useGetArtsCurrent } from '../../../hooks/useGetArtsCurrent'
import { ScrollView, TextInput } from 'react-native-gesture-handler'

export default function ArtsPage() {

	const { artsCurrent, isLoadingArtsCurrent, errorLoadingArts } = useGetArtsCurrent()

	const step = 10

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

			<View
				className="space-y-2"
			>

				{isLoadingArtsCurrent ? <ActivityIndicator /> : <Text className="text-white text-xl text-center"> Артикулів: {artsCurrent?.length}</Text>}




				<View
					className="flex space-y-2"
				>

					<View
						className=""
					>

						<TextInput
							onChangeText={(text => setSearchValue(text))}
							value={searchValue}
							className="h-16 min-w-min  bg-sky-900/60 focus:bg-sky-900/90 text-center font-bold text-2xl text-white rounded-full italic border focus:border-white"
							autoFocus={true}
						/>
					</View>

					<View
						className="flex items-center"
					>

						<Pressable
							className="w-1/2 "
							onPress={handleFilterArts}
						>
							<Text className="text-2xl text-white text-center p-2 border border-sky-500 rounded-3xl " >Пошук</Text>
						</Pressable>
					</View>

				</View>




				<ScrollView>


					{filteredArts?.length === 0 || filteredArts?.length === artsCurrent?.length ?
						<View
							className="flex flex-wrap justify-between p-2 border  border-sky-500 rounded"
						>

							<Text className="text-white">
								Всього: {artsCurrent?.length}
							</Text>

							<Text
								className="text-xl text-white"
							>
								{step * page - step + 1} - {step * page < artsCurrent?.length ? step * page : artsCurrent?.length}
							</Text>








							<ScrollView
								horizontal={true}

							>
								<View
									className="space-x-3 flex flex-row flex-wrap items-center justify-center"
								>

									<Pressable onPress={() => setPage(1)} className="border border-sky-500 rounded-full p-1" disabled={page === 1}>
										<Text className="text-white text-xl text-center">Початок</Text>
									</Pressable>

									<Pressable onPress={() => setPage((prev) => prev - 1)} className="border border-sky-500 rounded-full p-1" disabled={page === 1}>
										<Text className="text-white text-xl ">Назад</Text>
									</Pressable>

									<Text className="text-white text-xl " >
										Сторінка: {page}
									</Text>

									<Pressable onPress={() => setPage((prev) => prev + 1)} className="border border-sky-500 rounded-full p-1" disabled={artsCurrent?.length / step / page < 1}>
										<Text className="text-white text-xl ">Далі</Text>

									</Pressable>

									<Pressable onPress={() => setPage(Math.ceil(artsCurrent?.length / step))} className="border border-sky-500 rounded-full p-1" disabled={artsCurrent?.length / step / page < 1}>
										<Text className="text-white text-xl ">Кінець</Text>

									</Pressable>


								</View>
							</ScrollView>

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
						<View className="space-y-1">
							{filteredArts?.length === 0
								?
								artsCurrent?.slice(step * page - step, step * page).map((art) => <View key={art._id}>
									<Text className="text-white">{art.nameukr}</Text>


								</View>)

								:
								filteredArts?.slice(step * page - step, step * page).map((art) => <View key={art._id}>
									<Text className="text-white">{art.nameukr}</Text>

								</View>)}

						</View>

					}



				</ScrollView>



			</View>
		</ScreenContainer>
	)
}