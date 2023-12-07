import { View, Text, Button } from 'react-native'
import React from 'react'
import { Stack, useRouter } from 'expo-router'
import { Tabs } from 'expo-router'
import { AntDesign } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import useCheckAuth from '../hooks/useCheckAuth';

export default function _layout() {


	useCheckAuth()





	return (
		<Tabs
			screenOptions={{
				tabBarStyle: { backgroundColor: 'black' },
				tabBarActiveBackgroundColor: "#222",
				tabBarActiveTintColor: "#bbb"
			}}
		>

			<Tabs.Screen
				name="index"
				options={
					{

						headerTitle: "Головна",
						tabBarLabel: "Головна",
						// tabBarShowLabel: false,
						tabBarIcon: () => <AntDesign name="home" size={24} color="white" />
					}
				}
			/>


			<Tabs.Screen
				name="btw"
				options={
					{
						headerShown: false,
						headerTitle: "BTW",
						// tabBarShowLabel: false,
						tabBarLabel: "Погреби",
						tabBarIcon: () => <SimpleLineIcons name="menu" size={24} color="white" />
					}
				}
			/>

			<Tabs.Screen
				name="profile"
				options={
					{

						headerTitle: "Профіль",
						tabBarLabel: "Профіль",
						// tabBarShowLabel: false,
						tabBarIcon: () => <Ionicons name="person-outline" size={24} color="white" />
					}
				}
			/>



			<Tabs.Screen
				name="login"
				options={
					{
						href: null,
						headerTitle: "Авторизація",
						// tabBarLabel: "Профіль",
						// tabBarShowLabel: false,
						tabBarIcon: () => <Ionicons name="person-outline" size={24} color="white" />
					}
				}
			/>


			<Tabs.Screen
				name="(tabs)"
				options={{
					// This tab will no longer show up in the tab bar.
					href: null,
				}
				}
			/>


			<Tabs.Screen
				name="[missing]"
				options={{
					// This tab will no longer show up in the tab bar.
					href: null,
				}
				}
			/>


		</Tabs>









		// <Stack
		// 	screenOptions={{
		// 		headerStyle: { backgroundColor: "black" },
		// 		headerTintColor: "skyblue"
		// 	}}

		// >
		// 	<Stack.Screen
		// 		name="index"
		// 		options={{
		// 			title: "Home"
		// 		}} />
		// 	<Stack.Screen
		// 		name="register/index"
		// 		options={{
		// 			title: "Register Page",
		// 			headerRight: () => (<Button
		// 				title="Login"
		// 				onPress={() => { router.push("/login") }} />
		// 			)
		// 		}} />
		// 	<Stack.Screen
		// 		name="login"
		// 		options={{
		// 			title: "Login Modal",
		// 			presentation: "modal"
		// 		}} />
		// 	<Stack.Screen
		// 		name="(tabs)"
		// 		options={{
		// 			headerShown: false
		// 		}} />

		// 	<Stack.Screen
		// 		name="[missing]"
		// 		options={{
		// 			title: "Not Found"
		// 		}} />
		// </Stack>
	)
}