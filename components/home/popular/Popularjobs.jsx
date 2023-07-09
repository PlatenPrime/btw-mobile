import { useState } from 'react'
import { useRouter } from 'expo-router';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import useFetch from '../../../hook/useHook'

import styles from './popularjobs.style'
import { COLORS, SIZES } from "../../../constants";
import PopularJobCard from "../../common/cards/popular/PopularJobCard"


const Popularjobs = () => {

	const router = useRouter();

	const { data, isLoading, error } = useFetch("search", {
		query: "React developer",
		num_pages: "1",
	});

console.log(data)





	return (
		<View style={styles.container}>
			<View style={styles.header} >
				<Text style={styles.headerTitle} >Popular Jobs</Text>
				<TouchableOpacity
					onPress={() => { }}
				>
					<Text style={styles.headerBtn}>Show All</Text>
				</TouchableOpacity>
			</View>


			<View style={styles.cardsContainer} >
				{isLoading ? (
					<ActivityIndicator size="large" colors={COLORS.primary} />
				) : error ? (
					<Text>Something went wrong</Text>
				) : (
					<FlatList
						data={data}
						renderItem={({ item }) => (
							<PopularJobCard
								item={item}

							/>
						)}
						keyExtractor={item => item?.job_id}
						contentContainerStyle={{ columnGap: SIZES.medium }}
						horizontal
					/>
				)}
			</View>


		</View>
	)
}

export default Popularjobs