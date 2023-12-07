import { create } from 'zustand';
import axios from '../utils/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const useAuthStore = create((set) => ({
	user: null,
	users: null,
	roles: null,
	token: null,
	error: null,


	// Добавим инициализацию при создании хранилища
	init: async () => {
		const storedToken = await AsyncStorage.getItem('token');
		const storedUser = await AsyncStorage.getItem('user');
		set({
			token: storedToken || null,
			user: storedUser ? JSON.parse(storedUser) : null,
		});
	},




	setUser: (user) => set({ user }),
	setToken: (token) => set({ token }),


	// Изменения в использовании AsyncStorage
	setTokenToAS: async (token) => {
		set({ token });
		await AsyncStorage.setItem('token', token);
	},

	setUserToAS: async (user) => {
		set({ user });
		await AsyncStorage.setItem('user', JSON.stringify(user));
	},




	// Изменения в использовании AsyncStorage
	login: async (formData) => {
		try {
			const response = await axios.post('/auth/login', formData);
			console.log(response);
			set({ user: response.data.user, token: response.data.token, error: null });
			await useAuthStore.getState().setTokenToAS(response.data.token);
			await useAuthStore.getState().setUserToAS(response.data.user);
			return response.data.user;
		} catch (error) {
			set({ error: 'Login error. Please check your credentials.' });
		}
	},

	logout: async () => {
		set({ user: null, token: null, error: null });
		await AsyncStorage.removeItem('token');
		await AsyncStorage.removeItem('user');
	},

	registration: async (formData) => {
		try {
			const response = await axios.post('/auth/registration', formData);
			set((state) => ({ users: [...state.users, response.data] }));
		} catch (error) {
			set({ error: 'Registration error. Please check your input data.' });
		}
	},

	getMe: async () => {
		try {
			const response = await axios.get(`/auth/me/${useAuthStore.getState().user._id}`);
			console.log(response);

			set({ user: response.data.user, token: response.data.token, error: null });
		} catch (error) {
			set({ error: 'GetMe error. User is not authenticated.' });
		}
	},

	getUsers: async () => {
		try {
			const response = await axios.get('/auth/users');
			set({ users: response.data })
			return response.data;
		} catch (error) {
			set({ error: 'Error while fetching users.' });
		}
	},


	getRoles: async () => {
		try {
			const response = await axios.get('/auth/roles');
			set({ roles: response.data })
			return response.data;
		} catch (error) {
			set({ error: 'Error while fetching users.' });
		}
	},



	getUserById: async (id) => {
		try {
			const response = await axios.get(`/auth/users/${id}`);
			return response.data.user;
		} catch (error) {
			set({ error: 'Error while fetching user by ID.' });
		}
	},
}));





// Вызови функцию init для инициализации хранилища
useAuthStore.getState().init();

export default useAuthStore;
