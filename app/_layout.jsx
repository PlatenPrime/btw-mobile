import { Slot, Stack } from "expo-router";

export default function RootLayout() {
	return <Stack>

		<Stack.Screen
			name="(app)"
			options={{
				headerShown: false,

			}}



		/>


		<Stack.Screen
			name="index"
			options={{
				headerBackTitleVisible: false,

			}}
		/>

		<Stack.Screen
			name="login"
			options={{
				headerBackTitleVisible: false,

			}}
		/>




	</Stack>;
}