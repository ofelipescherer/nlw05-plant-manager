import React from 'react';
import { SafeAreaView, StyleSheet, Text, View,  } from 'react-native';
import { Header } from '../components/Header';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function PlantSelect() {
    return (
        <View style={styles.container}>

            <Header />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    }
});