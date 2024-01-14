import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, Modal, ActivityIndicator, TouchableOpacity } from 'react-native';
import { ScreenContainer } from '../../../../components';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { usePosesStore } from '../.././../../stores/posesStore';
import { Link, useRouter } from 'expo-router';
import { colors500 } from '../../../../constants/Colors'
import { useGlobalStore } from "../../../../stores/globalStore";
import useAuthStore from '../../../../stores/authStore';
import { LinearGradient } from 'expo-linear-gradient';



export default function Stocks() {


	return (
		<ScreenContainer>

		</ScreenContainer>
	)


}