import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, useLocalSearchParams } from 'expo-router'
import { useRowStore } from '../../../stores/rowsStore'
import { usePalletStore } from '../../../stores/palletsStore'
import { ScreenContainer } from '../../../components'
import { FlatList, ScrollView } from 'react-native-gesture-handler'

export default function RowPage() {

	const { id } = useLocalSearchParams()


	const getRowById = useRowStore(state => state.getRowById)

	const getRowPallets = usePalletStore(state => state.getRowPallets)
	const pallets = usePalletStore(state => state.pallets)






	const [row, setRow] = useState(null)
	const [isRowLoading, setIsRowLoading] = useState(false)


	useEffect(() => {

		try {
			setIsRowLoading(true)
			async function fetchRow() {
				const row = await getRowById(id)
				setRow(row)
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








	return (
		<ScreenContainer>
			<Text
				className="text-center text-2xl text-white p-3"
			>
				Ряд	{row?.title}
			</Text>



			{isRowLoading ? <Text>Загрузка...</Text> :

				<ScrollView>
					{pallets?.length > 0 ?

						<View>
							{pallets?.map((item) => <Link
								key={item._id}
								href={`/btw/pallets/${item._id}`}
								className="border border-amber-500 rounded 
					bg-amber-500/10
					text-center text-xl text-white 
					my-2 p-4 "
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