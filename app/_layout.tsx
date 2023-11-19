import { View, Text, Button } from 'react-native'
import React from 'react'
import { Stack, useRouter } from 'expo-router'
import { Tabs } from 'expo-router'
import { AntDesign } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

export default function _layout() {

	const router = useRouter()



	return (
		<Tabs
		screenOptions={{
			tabBarStyle: { backgroundColor: 'blue' },
		  }}
		>

			<Tabs.Screen
				name="index"
				options={
					{
						headerTitle: "Головна",
						tabBarLabel: "Головна",
						tabBarIcon: () => <AntDesign name="home" size={24} color="black" />
					}
				}
			/>

			<Tabs.Screen
				name="btw"
				options={
					{
						headerShown: false,
						headerTitle: "BTW",
						tabBarLabel: "BTW",
						tabBarIcon: () => <SimpleLineIcons name="menu" size={24} color="black" />
					}
				}
			/>

			<Tabs.Screen
				name="profile"
				options={
					{
						headerTitle: "Профіль",
						tabBarLabel: "Профіль",
						tabBarIcon: () => <Ionicons name="person-outline" size={24} color="black" />
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
				name="login"
				options={{
					// This tab will no longer show up in the tab bar.
					href: null,
				}
				}
			/>
			<Tabs.Screen
				name="register/index"
				options={{
					// This tab will no longer show up in the tab bar.
					href: null,
				}
				}
			/>


			{/* <Tabs.Screen
				name="posts"
				options={
					{
						headerShown: false,
						headerTitle: "Posts",
						tabBarLabel: "Posts"
					}
				}
			/> */}
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