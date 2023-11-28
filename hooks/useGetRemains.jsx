import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


export const useGetRemains = () => {



	const [remains, setRemains] = useState(null);
	const [isLoadingRemains, setIsLoadingRemains] = useState(false);
	const [errorRemains, setErrorRemains] = useState(null);




	useEffect(() => {


		const fetchRemains = async () => {

			try {
				setIsLoadingRemains(true)
				const remainsFromASString = await AsyncStorage.getItem("remainsFromAS")


				if (!remainsFromASString) {
					const response = await fetch("https://corsproxy.io/?https://sharik.ua/product_rests/1302-0065/");

					const responseText = await response.text();
					const lines = responseText.split('<pre>');
					const data = {};

					lines.forEach((line) => {
						const parts = line.split('=');
						if (parts.length === 2) {
							const key = parts[0].trim();
							const value = parseInt(parts[1], 10);
							data[key] = value;
						}
					});


					const currentTime = new Date().getTime();


					await AsyncStorage.setItem(
						"remainsFromAS",
						JSON.stringify({
							remains: data,
							saveTime: currentTime,
						})
					);

					setRemains(data)

				} else {

					const remainsFromAS = JSON.parse(remainsFromASString)
					const currentTime = new Date().getTime();

					if (currentTime - remainsFromAS.saveTime < 5 * 60 * 1000) {
						setRemains(remainsFromAS.remains)
					} else {
						const response = await fetch("https://corsproxy.io/?https://sharik.ua/product_rests/1302-0065/");

						const responseText = await response.text();
						const lines = responseText.split('<pre>');
						const data = {};

						lines.forEach((line) => {
							const parts = line.split('=');
							if (parts.length === 2) {
								const key = parts[0].trim();
								const value = parseInt(parts[1], 10);
								data[key] = value;
							}
						});


						const currentTime = new Date().getTime();


						await AsyncStorage.setItem(
							"remainsFromAS",
							JSON.stringify({
								remains: data,
								saveTime: currentTime,
							})
						);

						setRemains(data)
					}
				}




			} catch (error) {
				setErrorRemains(error)
			} finally {
				setIsLoadingRemains(false)
			}


		}



		fetchRemains()

	}, []);


	return { remains, isLoadingRemains, errorRemains }


}