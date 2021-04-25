import { useNavigation, useRoute } from '@react-navigation/core';
import React, { useState } from 'react';
import { Alert, Image, Platform, SafeAreaView, StyleSheet, Text, View,  } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { SvgFromUri } from 'react-native-svg';
import { Button } from '../components/Button';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import DataTimePicker, {Event} from '@react-native-community/datetimepicker'
import waterdrop from '../assets/waterdrop.png'
import { color } from 'react-native-reanimated';
import { format, isBefore } from 'date-fns';
import { loadPlant, PlantProps, plantSave } from '../libs/storage';


interface Params {
    plant: PlantProps
}

export function ChosenPlant(){
    
    const [selectedDateTime, setSelectedDateTime] = useState(new Date())
    const[showDatePicker, setShowDatePicker] = useState(Platform.OS == 'ios')
    const route = useRoute();
    const { plant } = route.params as Params;   


    //We are not going to use event so we could use an _ like _ : Event to omit this parameter
    function handleChangeTime(event : Event , dateTime : Date | undefined){
        if(Platform.OS == 'android'){
            setShowDatePicker(oldState => !oldState);
        }

        if(dateTime && isBefore(dateTime, new Date())){
            setSelectedDateTime(new Date())
            return Alert.alert('Escolha uma hora no futuro ⌚')
        }

        if(dateTime)
            setSelectedDateTime(dateTime)
    }

    function handleOpenDateTimePickerForAndroid() {
        setShowDatePicker(oldState => !oldState)
    }

    async function handleSave(){

        try {

            await plantSave({
                ...plant,
                dateTimeNotification: selectedDateTime
            })

        }catch {
            return Alert.alert('Não foi possivel salvar a planta')
        }
    }

    return (
        <View style={styles.container}>
        <View style={styles.plantInfo}>
            <SvgFromUri uri={plant.photo} height={150} width={150}/>

            <Text style={styles.plantName}>{plant.name}</Text>

            <Text style={styles.plantAbout}>{plant.about}</Text>
        </View>
        <View style={styles.controller}>
            <View style={styles.tipContainer}>
                <Image source={waterdrop} style={styles.tipImage}/>
                <Text style={styles.tipText}>
                    {plant.water_tips}
                </Text>
            </View>

            <Text style={styles.alertLabel}>
                Escolha o melhor horário para ser lembrado: 
            </Text>

            {
                showDatePicker && (
                <DataTimePicker 
                    value={selectedDateTime} 
                    mode='time' 
                    display='spinner' 
                    onChange={handleChangeTime} 
                />
                )
            }

            {
                Platform.OS == 'android' && (
                    <TouchableOpacity onPress={handleOpenDateTimePickerForAndroid} style={styles.datePickerTextButton}>
                        <Text style={styles.datePickerText}>
                            {`Mudar Horário ${format(selectedDateTime, 'HH:mm')}`}
                        </Text>
                    </TouchableOpacity>
                )

            }
            <Button title='Cadastrar planta' onPress={handleSave}/>
        </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: colors.shape,
    },
    plantInfo: {
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.shape
    },
    controller: {
        backgroundColor: colors.white,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 30,
    },
    plantName:{
        fontFamily: fonts.heading,
        fontSize: 24,
        color: colors.heading,
        marginTop: 15,
    },
    plantAbout: {
        textAlign: 'center',
        fontFamily: fonts.text,
        color: colors.heading,
        fontSize: 17,
        marginTop: 10
    },
    tipContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.blue_light,
        padding: 20,
        borderRadius: 20,
        position: 'relative',
        bottom: 60,
    },
    tipImage: {
        width: 56,
        height: 56,
    },
    tipText: {
        flex: 1,
        marginLeft: 20,
        fontFamily: fonts.text,
        color: colors.blue,
        fontSize: 17,
        textAlign: 'justify',
    },
    alertLabel: {
        textAlign: 'center',
        fontFamily: fonts.complement,
        color: colors.heading,
        marginBottom: 5,
        fontSize: 12,
    },
    datePickerTextButton: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 40,
    },
    datePickerText: {
        color: colors.heading,
        fontSize: 24,
        fontFamily: fonts.text
    }

})