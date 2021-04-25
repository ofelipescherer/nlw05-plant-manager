import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { RectButton, RectButtonProps, Swipeable } from 'react-native-gesture-handler';
import {SvgFromUri} from 'react-native-svg';
import Animated from 'react-native-reanimated';
import { Feather } from '@expo/vector-icons';

interface PlantProps extends RectButtonProps {
    data: {
        name: string;
        photo: string;
        hour:  string,
    }

    handleRemove: () => void
}

export function PlantCardSecondary({ data, handleRemove, ...rest } : PlantProps) {
    return (    
        <Swipeable
            overshootRight={false}
            renderRightActions={() => (
                <Animated.View>
                    <RectButton
                        style={styles.buttonRemove}
                        onPress={handleRemove}
                    >
                        <Feather name='trash' size={32} color={colors.white}/>
                    </RectButton>
                </Animated.View>
            )}
        >
            <RectButton style={styles.container} {...rest}>
                <SvgFromUri uri={data.photo} width={50} height={50} />
                <Text style={styles.title}>
                    {data.name}
                </Text>

                <View style={styles.details}>
                    <Text style={styles.timeLabel}>
                        Regas às
                    </Text>
                    <Text style={styles.time}>
                        {data.hour}
                    </Text>
                </View>
            </RectButton>
        </Swipeable>
    )
}




const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 25,
        borderRadius: 25,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.shape,
        marginVertical: 5,
    },
    title: {
        flex: 1,
        marginLeft: 10,
        fontFamily: fonts.heading,
        fontSize: 17,
        color: colors.heading
    },
    details: {
        alignItems: 'flex-end'
    },
    timeLabel: {
        marginTop: 5,
        fontSize: 16,
        fontFamily: fonts.text,
        color: colors.blue_light
    },
    time: {
        marginTop: 5,
        fontSize: 16,
        fontFamily: fonts.heading,
        color: colors.body_dark
    },
    buttonRemove: {
        width: 90,
        height: 85,
        backgroundColor: colors.red,
        marginTop: 15,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 10,
        right: 20,
    }
})