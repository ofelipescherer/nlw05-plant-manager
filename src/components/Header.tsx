import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View,  } from 'react-native';
import { Button } from './Button';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

import userImg from '../assets/user.png'
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Header(){

    const[userName, setUserName] = useState<string>()

    useEffect(() => {
        //This function was created because AsyncStorage doesn't accept await, 
        //and it return a promise, so need to be in async function
        async function loadStorageUserName(){
            const user = await AsyncStorage.getItem('@plantmanager:user')
            setUserName(user || '')
        }

        loadStorageUserName();
    },[])


    return (
        <View style={styles.container}> 
            <View>
                <Text style={styles.greeting}>Olá</Text>
                <Text style={styles.userName}>{userName}</Text>
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