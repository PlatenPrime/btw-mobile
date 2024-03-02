import { View, Text, ImageBackground } from 'react-native'
import React, { ReactNode } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import { Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';




export default function ScreenContainer({ children }) {
	return (



		<View className='flex-1 relative' >
			<StatusBar style="light" />

			<LinearGradient colors={['#0f172a', '#050508',]} >


				<View className="h-full">{children}</View>


			</LinearGradient>
		</View>


	)
}