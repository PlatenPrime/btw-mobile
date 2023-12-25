import axios from 'axios'


const BOT_API_TOKEN = '6777916786:AAEHbVOZvb0cuA9zyby3caPIfTk5OzzRsOY'


export const sendMessageToTelegram = async (message) => {
	try {
		const response = await axios.post(`https://api.telegram.org/bot${BOT_API_TOKEN}/sendMessage`, {
			chat_id: '-1002121224059', // Replace 'CHAT_ID' with your actual chat ID
			text: message,
		});
		console.log('Message sent:', response.data);

	} catch (error) {
		console.error('Error sending message:', error);

	}

};



