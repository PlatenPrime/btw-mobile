import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { MaterialCommunityIcons, FontAwesome5, Feather } from '@expo/vector-icons';







export default function AskBage({
	ask,
	artsCurrent,
	users
}) {

	const router = useRouter()

	const createdAtDateObject = new Date(ask?.createdAt)
	const updatedAtDateObject = new Date(ask?.updatedAt)


	return (

		<TouchableOpacity
			onPress={() => router.push(`btw/asks/${ask._id}/`)}
			className={`border-2 flex-col  rounded-xl w-fit h-fit
			
				flex-1
			
			${ask?.status === "new"
					?
					"bg-indigo-500/30"
					: ask?.status === "solved"
						? " bg-emerald-500/30"
						: ask?.status === "fail"
							? " bg-rose-500/30"
							: null
				}
			
			
			`}
		>



			<View
				className={`flex-1 flex-row 
				
				${ask?.status === "new"
						?
						""
						: ask?.status === "solved"
							? ""
							: ask?.status === "fail"
								? ""
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
					 justify-center rounded-tr-xl
					bg-sky-500/20

				flex-1

					`}
				>

					<Text
						className="text-white text-center text-2xl "
					>
						{ask?.artikul}
					</Text>

					<Text
						className="text-white w-full text-lg text-center italic p-1"
						numberOfLines={4}
					>
						{
							artsCurrent?.find((art) => art.artikul === ask.artikul)?.nameukr?.slice(10)
							|| null
						}
					</Text>


					{ask.quant ? <View
						className=" p-1  flex-row items-center justify-center"
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
				<MaterialCommunityIcons name="account-question-outline" size={32} color="#e0e7ff" />
				<Text
					className="text-indigo-100 text-lg p-2"
				>
					{users?.find(user => user._id === ask?.asker)?.fullname}
				</Text>
				<View
					className="flex-row items-center justify-center  "
				>
					<Text
						className="text-center text-sm text-indigo-100 pl-2 "
						numberOfLines={4}
					>
						{createdAtDateObject.toLocaleString()}
					</Text>

				</View>



			</View>




			{ask?.solver ?

				<View
					className="flex-row flex-wrap items-center justify-center  p-1 "
				>
					<Feather name="check-circle" size={24} color="white" />

					<Text
						className="text-white text-lg p-2"
					>
						{users?.find(user => user._id === ask?.solver)?.fullname}
					</Text>

					{createdAtDateObject.toLocaleString() !== updatedAtDateObject.toLocaleString() ?
						<View
							className="flex-row items-center justify-center  pl-2  "
						>
							<Text
								className="text-center text-sm text-white "
								numberOfLines={4}
							>
								{updatedAtDateObject.toLocaleString()}
							</Text>

						</View>
						: null}







				</View>
				:
				null
			}








			{ask.com ?

				<View
					className="flex-row items-center justify-center space-x-2 p-1 "
				>
					<FontAwesome5 name="comment" size={24} color="white" />
					<Text
						className="text-white text-center text-lg p-2 italic"
					>
						{ask.com}
					</Text>
				</View>
				:
				null
			}










		</TouchableOpacity>


	)
}