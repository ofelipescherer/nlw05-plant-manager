import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View,  } from 'react-native';
import { Button } from './Button';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

import userImg from '../assets/user.png'

export function Header(){



    return (
        <View style={styles.container}> 
            <View>
                <Text style={styles.greeting}>Olá</Text>
                <Text style={styles.userName}>Felipe</Text>
            </View>


            <Image source={userImg} style={styles.image}/>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 40,
        marginTop: 40,
        padding: 20
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 40,

    },
    greeting: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.heading
    },
    userName: {
        fontSize: 32,
        fontFamily: fonts.heading,
        color: colors.heading,
        lineHeight: 40,
    }
});