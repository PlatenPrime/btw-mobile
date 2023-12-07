// Импортируем хук для навигации
import { useRouter } from 'expo-router';
import useAuthStore from '../stores/authStore';
import React, { useEffect, useState } from 'react';

const useCheckAuth = () => {

	const router = useRouter()

	const { getMe, setUser } = useAuthStore();


	const [isLoading, setIsLoading] = useState(false)
	const [userAS, setUserAS] = useState(null)





	useEffect(() => {


		const checkAuth = async () => {



			try {
				setIsLoading(true)

				const user = JSON.parse(await AsyncStorage.getItem('user'));
				console.log("CHECK", user);


				setUser(user);
				setUserAS(user);
				await getMe();


				setUserAS(user)




			} catch (error) {
				// Если произошла ошибка или пользователь не аутентифицирован,
				// перенаправляем на страницу входа

			} finally {
				setIsLoading(false)
			}



		};




		checkAuth();




	}, [getMe, setUser]);

	return { userAS, isLoading }; // Возвращаем null, так как это не рендерящий компонент
};

export default useCheckAuth;