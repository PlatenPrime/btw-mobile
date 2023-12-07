// Импортируем хук для навигации
import { useRouter } from 'expo-router';
import useAuthStore from '../stores/authStore';
import React, { useEffect, useState } from 'react';

export default  useCheckAuth = () => {

	const router = useRouter()

	const { getMe, setUser } = useAuthStore();


	const [isLoading, setIsLoading] = useState(false)
	const [userAS, setUserAS] = useState(null)





	useEffect(() => {


		const checkAuth = async () => {



			try {
				setIsLoading(true)

				const user = JSON.parse(await AsyncStorage.getItem('user'));

				if (!user) {
					router.replace("index")
				}

				;

				await getMe();

				setUser(user)
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

	return { userAS, isLoading };
}
