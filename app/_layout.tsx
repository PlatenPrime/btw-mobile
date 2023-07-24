import { Tabs } from 'expo-router/tabs';
export default function AppLayout() {
	return (
		<Tabs>
			<Tabs.Screen
				// Name of the route to hide.
				name="index"
				options={{
					// This tab will no longer show up in the tab bar.
					href: null,
				}}
			/>
			<Tabs.Screen
				// Name of the route to hide.
				name="zapasi"
				options={{
					headerTitle: "Sklad",
					// This tab will no longer show up in the tab bar.
					href: '/zapasi',
				}}
			/>

			<Tabs.Screen
				// Name of the route to hide.
				name="zones"
				options={{
					headerTitle: "Zones",
					// This tab will no longer show up in the tab bar.
					href: '/zones',
				}}
			/>

			<Tabs.Screen
				// Name of the route to hide.
				name="search"
				options={{
					headerTitle: "Search",
					// This tab will no longer show up in the tab bar.
					href: '/search',
				}}
			/>








		</Tabs>
	);
}