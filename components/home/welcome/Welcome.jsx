import { useState } from 'react'
import {
	View,
	Text,
	TextInput,
	Image,
	FlatList,
	TouchableOpacity,
	ActivityIndicator
} from 'react-native';

import { useRouter } from 'expo-router';
import useFetchArts from '../../../hook/useFetchArts'

import styles from './welcome.style';
import { icons, SIZES } from "../../../constants";

const jobTypes = ["Full-time", "Part-time", "Contractor"]





const Welcome = ({ searchTerm, setSearchTerm, handleClick }) => {

	const router = useRouter();
	const [activeJobType, setActiveJobType] = useState("Full-time")

	const { artsDB, loadingArtsDB, errorArtsDB } = useFetchArts()
	console.log(artsDB)

	const renderArts = artsDB.slice(0, 10);
	console.log(renderArts)


	return (
		<View>
			<View style={styles.container}>
				<Text style={styles.userName} >
					Hello, Prime
				</Text>
				<Text style={styles.welcomeMessage} >
					Find your perfect articul
				</Text>
			</View>


			<View style={styles.container} >
				<Text style={styles.userName} >Here will be the articles</Text>

				{loadingArtsDB ? <ActivityIndicator /> : <FlatList
					data={renderArts}
					renderItem={(item) => (<Text>{item.name}</Text>)}
					keyExtractor={item => item.name}



				/>}





			</View>



			<View style={styles.searchContainer}>

				<View style={styles.searchWrapper} >
					<TextInput
						style={styles.searchInput}
						value={searchTerm}
						onChangeText={(text) => setSearchTerm(text)}
						placeholder='What do you need from me again?'
					/>
				</View>

				<TouchableOpacity style={styles.searchBtn} onPress={handleClick} >
					<Image
						source={icons.search}
						resizeMode='contain'
						style={styles.searchBtnImage}
					/>
				</TouchableOpacity>



			</View>


			<View style={styles.tabsContainer}>
				<FlatList
					data={jobTypes}
					renderItem={({ item }) => (
						<TouchableOpacity
							style={styles.tab(activeJobType, item)}
							onPress={() => {
								setActiveJobType(item)
								router.push(`/search/${item}`)
							}}
						>
							<Text
								style={styles.tabText(activeJobType, item)}
							>
								{item}
							</Text>
						</TouchableOpacity>
					)}
					keyExtractor={item => item}
					contentContainerStyle={{ columnGap: SIZES.small }}
					horizontal

				/>
			</View>

		</View>
	)
}

export default Welcome