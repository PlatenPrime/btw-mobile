import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRowStore } from '../../../stores/rowsStore';
import ScreenContainer from '../../../components/ScreenContainer';
import { Link } from 'expo-router';
import { FlatList } from 'react-native-gesture-handler';
import axios from 'axios';

export default function Stocks() {
	const rows = useRowStore((state) => state.rows);
	const getAllRows = useRowStore((state) => state.getAllRows);








	return (
		<ScreenContainer>
			<Text
				className="text-2xl text-white text-center"
			>
				Список рядів на складі
			</Text>
			<Link
				href="/btw/stocks/10-12"
				className="text-orange-500 text-2xl"
			>
				Ряд 10-12
			</Link>
			<Link
				href="/btw/stocks/14-16"
				className="text-orange-500 text-2xl"
			>
				Ряд 14-16
			</Link>
			<Link
				href="/btw/stocks/17-19"
				className="text-orange-500 text-2xl"
			>
				Ряд 17-19
			</Link>







		</ScreenContainer>
	)
}