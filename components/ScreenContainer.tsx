import { View, Text, ImageBackground } from 'react-native'
import React, { ReactNode } from 'react'

interface ScreenContainerProps {
	children: ReactNode;
}





export default function ScreenContainer({ children }: ScreenContainerProps) {
	return (

		<ImageBackground source={require("../assets/images/background.jpg")} style={{
			flex: 1,
			

		}}>
			{children}
		</ImageBackground>

	)
}