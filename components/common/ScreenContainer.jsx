import { View, Text, ImageBackground } from 'react-native'
import React, { ReactNode } from 'react'




export default function ScreenContainer({ children }) {
	return (

		<ImageBackground source={require("../../assets/images/background.jpg")} style={{
			flex: 1,
		}}>
			{children}
		</ImageBackground>

	)
}