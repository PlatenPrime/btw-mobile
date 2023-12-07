// Импортируем хук для навигации
import { useRouter } from 'expo-router';
import useAuthStore from '../stores/authStore';
import React, { useEffect } from 'react';

const useCheckAuth = () => {

	const router = useRouter()

	const { getMe, setUser } = useAuthStore();

	useEffect(() => {

		
		const checkAuth = async () => {
			try {
				const user = JSON.parse(await AsyncStorage.getItem('user'));

				if (!user) {
					router.replace('login'); // Используем метод навигации для перехода на страницу входа
				}

				setUser(user);

				await getMe();

			} catch (error) {
				// Если произошла ошибка или пользователь не аутентифицирован,
				// перенаправляем на страницу входа
				router.replace('login');
			}
		};

		checkAuth();

	}, [getMe, setUser]);

	return null; // Возвращаем null, так как это не рендерящий компонент
};

export default useCheckAuth;