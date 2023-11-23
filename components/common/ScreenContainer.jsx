import { View, Text, ImageBackground } from 'react-native'
import React, { ReactNode } from 'react'
import { ScrollView } from 'react-native-gesture-handler'




export default function ScreenContainer({ children }) {
	return (

		<ImageBackground source={require("../../assets/images/background.jpg")} style={{
			flex: 1,
		}}>

			{children}

		</ImageBackground>

	)
}