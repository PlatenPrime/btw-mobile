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
				headerTintColor: "white",
			}}
		/>






	</Stack>;
}