import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'

export default function _layout() {
	return (
		<Tabs>
			<Tabs.Screen
				name="one"
				options={
					{
						headerTitle: "Tab 1",
						tabBarLabel: "One"
					}
				}
			/>
			<Tabs.Screen
				name="two"
				options={
					{
						headerTitle: "Tab 2",
						tabBarLabel: "TWO"
					}
				}
			/>
			<Tabs.Screen
				name="posts"
				options={
					{
						headerShown: false,
						headerTitle: "Posts",
						tabBarLabel: "Posts"
					}
				}
			/>


		</Tabs>
	)
}