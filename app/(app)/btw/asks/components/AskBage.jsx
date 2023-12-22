import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';







export default function AskBage({
	ask,
	artsCurrent,
	users
}) {

	const router = useRouter()

	const createdAtDateObject = new Date(ask.createdAt)
	const updatedAtDateObject = new Date(ask.updatedAt)


	return (

		<TouchableOpacity
			onPress={() => router.push(`btw/asks/${ask._id}/`)}
			className={`border-2 border-indigo-500 rounded-xl 
			
			
			${ask?.status === "new"
					?
					"bg-indigo-500/50"
					: ask?.status === "solved"
						? "border-emerald-500 bg-emerald-500/50"
						: ask?.status === "fail"
							? "border-rose-500 bg-rose-500/50"
							: null
				}
			
			
			
			
			
			`}
		>

			<View
				className={`flex-1 flex-row border-b border-white
				
				${ask?.status === "new"
						?
						"border-b border-indigo-500"
						: ask?.status === "solved"
							? "border-b border-emerald-500 "
							: ask?.status === "fail"
								? "border-b border-rose-500 "
								: null
					}
				
				`}
			>

				<View
					className=" bg-white h-full items-center justify-center rounded-tl-xl p-1"
				>
					<Image
						style={{
							height: 100,
							width: 100,
							resizeMode: "contain"
						}}
						className="rounded-xl"
						source={{ uri: `https://sharik.ua/images/elements_big/${ask.artikul}_m1.jpg` }}
					/>
				</View>

				<View
					className={`
					flex-1 justify-center rounded-tr-xl
					bg-sky-500/20

				

					`}
				>
					<Text
						className="text-white text-2xl text-center italic p-1"
						numberOfLines={4}
					>
						{
							artsCurrent?.find((art) => art.artikul === ask.artikul)?.nameukr
							|| ask?.artikul
							|| null
						}
					</Text>


					{ask.quant ? <View
						className=" p-1 flex-1 flex-row items-center justify-center"
					>
						<MaterialCommunityIcons name="balloon" size={36} color="white" />
						<Text
							className="text-center text-3xl text-white font-bold "
						>
							{ask.quant}
						</Text>
					</View>
						:
						null
					}




				</View>

			</View>







			<View
				className="flex-row flex-wrap items-center justify-center  p-1  "
			>
				<FontAwesome5 name="pray" size={24} color="#e0e7ff" />
				<View
					className="flex-row items-center justify-center  "
				>
					<Text
						className="text-center text-2xl text-indigo-100 pl-2 "
						numberOfLines={4}
					>
						{createdAtDateObject.toLocaleString()}
					</Text>

				</View>
				<Text
					className="text-indigo-100 text-2xl p-2"
				>
					{users?.find(user => user._id === ask?.asker)?.fullname}
				</Text>

			</View>

			<View
				className="flex-row flex-wrap items-center justify-center  p-1 "
			>
				<MaterialCommunityIcons name="emoticon-cool-outline" size={24} color="#d1fae5" />
				{createdAtDateObject.toLocaleString() !== updatedAtDateObject.toLocaleString() ?
					<View
						className="flex-row items-center justify-center  pl-2  "
					>
						<Text
							className="text-center text-2xl text-emerald-100 "
							numberOfLines={4}
						>
							{updatedAtDateObject.toLocaleString()}
						</Text>

					</View>
					: null}
				<Text
					className="text-emerald-100 text-2xl p-2"
				>
					{users?.find(user => user._id === ask?.solver)?.fullname}
				</Text>

			</View>


			<View
				className="flex-row items-center justify-center space-x-2 p-1 "
			>
				<FontAwesome5 name="comment" size={24} color="white" />
				<Text
					className="text-white text-center text-xl p-2"
				>
					{ask.com}
				</Text>
			</View>






			{/* <View
				className="flex-1 flex-row "
			>



				<View
					className="flex-1 flex-row items-center p-1"
				>
					<MaterialCommunityIcons name="account-arrow-down-outline" size={24} color="white" />
					<Text
						className="text-white text-xl p-2"
					>
						Имя пользователя
					</Text>
				</View>


				<View
					className="flex-1 bg-yellow-500 flex-row items-center justify-center"
				>
					<Text
						className="text-center text-xl text-white p-1"
					>
						{updatedAtDateObject.toLocaleString()}

					</Text>
				</View>





			</View> */}






		</TouchableOpacity>

	)
}