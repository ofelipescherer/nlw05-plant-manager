import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View,  } from 'react-native';
import { Button } from './Button';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { RectButtonProps, RectButton } from 'react-native-gesture-handler'

interface EnvironmentButtonProps extends RectButtonProps {
    //Question mark means that this atribute is not mandatory
    active?: boolean;
    title: string;
}

//We pass a default value to active
export function EnvironmentButton({ title, active = false, ...rest } : EnvironmentButtonProps){
    return (
        <RectButton style={[styles.container, active && styles.containerActive]} {...rest}>
            <Text style={[styles.text, active && styles.textActive]}>
                {title}
            </Text>
        </RectButton>
    )

}

const styles = StyleSheet.create({
    container:{
        backgroundColor: colors.shape,
        height: 40,
        width: 76,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        marginHorizontal: 5,
    },
    containerActive: {
        backgroundColor: colors.green_light
    },
    text: {
        color: colors.green,
        fontFamily: fonts.text,
    },
    textActive: {
        color: colors.green_dark,
        fontFamily: fonts.heading,
        
    }

})