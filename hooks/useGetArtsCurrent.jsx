import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from '../utils/axios';

export const useGetArtsCurrent = () => {
	const [artsCurrent, setArtsCurrent] = useState(null);
	const [isLoadingArtsCurrent, setIsLoadingArtsCurrent] = useState(false);
	const [errorLoadingArts, setErrorLoadingArts] = useState(null);

	useEffect(() => {

		const fetchArtsFromDB = async () => {
			try {
				setIsLoadingArtsCurrent(true);
				const artsFromASString = await AsyncStorage.getItem("artsFromAS");

				if (!artsFromASString) {
					// Если нет записи в AsyncStorage, получите данные из базы данных
					// const artsFromDB = await getAllArtikuls();
					const resFromDB = await axios.get('arts');
					const artsFromDB = resFromDB?.data?.arts


					const currentTime = new Date().getTime();

					// Сохраните в AsyncStorage объект с данными и временем сохранения
					await AsyncStorage.setItem(
						"artsFromAS",
						JSON.stringify({
							arts: artsFromDB,
							saveTime: currentTime,
						})
					);

					setArtsCurrent(artsFromDB);
				} else {
					// Если есть запись в AsyncStorage, проверьте время последнего сохранения
					const artsFromAS = JSON.parse(artsFromASString);
					const currentTime = new Date().getTime();

					// Проверьте, прошло ли менее 5 минут с момента последнего сохранения
					if (currentTime - artsFromAS.saveTime < 5 * 60 * 1000) {
						setArtsCurrent(artsFromAS.arts);
					} else {
						// Если прошло более 5 минут, запросите актуальные данные из базы данных
						// const artsFromDB = await getAllArtikuls();
						const resFromDB = await axios.get('arts');
						const artsFromDB = resFromDB?.data?.arts

						// Обновите запись в AsyncStorage с новыми данными и временем сохранения
						await AsyncStorage.setItem(
							"artsFromAS",
							JSON.stringify({
								arts: artsFromDB,
								saveTime: currentTime,
							})
						);

						setArtsCurrent(artsFromDB);
					}
				}
			} catch (error) {
				setErrorLoadingArts(error);
			} finally {
				setIsLoadingArtsCurrent(false);
			}
		};

		// Вызовите функцию при монтировании компонента
		fetchArtsFromDB();
	}, []); // Пустой массив зависимостей означает, что useEffect будет запущен только при монтировании компонента





	return { artsCurrent, isLoadingArtsCurrent, errorLoadingArts };
};
