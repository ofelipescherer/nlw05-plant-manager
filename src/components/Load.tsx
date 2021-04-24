import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View,  } from 'react-native';
import { Header } from '../components/Header';
import { EnvironmentButton } from '../components/EnvironmentButton';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { FlatList } from 'react-native-gesture-handler';
import api from '../services/api';
import { PlantCardPrimary } from '../components/PlantCardPrimary';
import LottieView from 'lottie-react-native'
import loadAnimation from '../assets/load.json'

export function Load(){

    return (
        <View style={styles.container}>
            <LottieView 
            source={loadAnimation} 
            autoPlay 
            loop 
            style={styles.animation}/>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    animation: {
        backgroundColor: 'transparent',
        width: 200,
        height: 200,
    }

})