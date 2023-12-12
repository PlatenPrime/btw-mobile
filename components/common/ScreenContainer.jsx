import { View, Text, ImageBackground } from 'react-native'
import React, { ReactNode } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import { Image } from 'react-native'





export default function ScreenContainer({ children }) {
	return (



		<View className='flex-1 relative' >
			<StatusBar style="light" />
			<Image source={require("../../assets/images/background.jpg")}
				className="w-full h-full absolute"
				blurRadius={10}

			/>


			{children}


		</View>


	)
}