import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';


const instance = axios.create({
	baseURL: 'https://btw-server.up.railway.app/api',
	// baseURL: 'http://localhost:3002/api/',


})

instance.interceptors.request.use(async (config) => {
	config.headers.Authorization = await AsyncStorage.getItem('token')

	return config
})



export default instance
