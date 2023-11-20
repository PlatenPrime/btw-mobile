import React from 'react';
import { View, Text } from "react-native"
import { Link } from 'expo-router';
import { RowType } from '../../types/btw';

const RowBage = ({ row }: { row: RowType }) => {

	if (!row) {
		return (
			<Text className='text-center text-3xl'>
				Загрузка...
			</Text>
		)
	}

	return (
		<View className='w-full' >
			<Link
				// href={`/btw/stocks/${row?._id}/`}
				href="/"
				className=' 
          flex justify-center
          w-full p-3
          rounded
          text-2xl text-orange-100 hover:text-white 
          bg-orange-500/10 hover:bg-orange-500 
          border-2 border-orange-500 
          hover:shadow-2xl hover:shadow-orange-500 
          transition ease-in-out duration-300
        '
			>
				{row?.title}
			</Link>
		</View>
	);
};

export default RowBage;
