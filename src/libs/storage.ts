import AsyncStorage from "@react-native-async-storage/async-storage"
import * as Notification from 'expo-notifications'
import { format } from "date-fns";

export interface PlantProps{
        id: string;
        name: string;
        about: string;
        water_tips: string;
        photo: string;
        environments: [string];
        frequency: {
        times: number,
        repeat_every: string
        };
        hour: string;
        dateTimeNotification : Date;
}

export interface StoragePlantProps {
    [id : string]: {
        data: PlantProps,
        notificationId : string
    }
}

export async function plantSave(plant : PlantProps) : Promise<void>{
    try {

        const nextTime = new Date(plant.dateTimeNotification)
        const now = new Date();

        const { times, repeat_every } = plant.frequency

        if(repeat_every == 'week'){
            const interval = Math.trunc(7 / times)
            nextTime.setDate(now.getDate() + interval)
        } 
 //       else {
 //           nextTime.setDate(nextTime.getDate() + 1)
//          }

        const seconds = Math.abs(
            Math.ceil(now.getTime() - nextTime.getTime()) / 1000)
        
        const notificationId = await Notification.scheduleNotificationAsync({
            content: {
                title: 'Heyy 😎',
                body: `Está na hora de regar a ${plant.name}`,
                sound: true,
                priority: Notification.AndroidNotificationPriority.HIGH,
                data: {
                    plant
                },
            },
            trigger: {
                //IF seconds < 60, then put 60, else put seconds
                seconds: seconds < 60 ? 60 : seconds,
                repeats: true
            }
        })

        const data = await AsyncStorage.getItem('@plantmanager:plants');

        //Here we are trying to convert the recived data (string) to a JSON styled as StoragePlantProps
        //If this convertion is not possible, will return an empty object
        const oldPlant = data ? (JSON.parse(data) as StoragePlantProps) : {};

        const newPlant = {
            [plant.id]: {
                data: plant,
                notificationId
            }
        }

        //Here we are doing the opposite before, we are transforming JSON Object in string
        await AsyncStorage.setItem('@plantmanager:plants', 
        JSON.stringify({
            ...newPlant,
            ...oldPlant
        })
        )

    }catch (error){
        throw new Error(error)
    }
}

export async function loadPlant() : Promise<PlantProps[]>{
    try {
        const data = await AsyncStorage.getItem('@plantmanager:plants');
        const plants = data ? (JSON.parse(data) as StoragePlantProps) : {};

        //We are going to return an object already sorted and well formated
        const plantsSorted = 
        //First we travel to all plants 
        Object.keys(plants).map((plant) => {
            return {
                //Here we get the plants in line 54 by each key and get the data from them
                ...plants[plant].data,
                //And we format the hour atribbute with the value in dateTimeNotification formated as 'HH:mm'
                hour: format(new Date(plants[plant].data.dateTimeNotification), 'HH:mm')
            }
        })
        .sort((a, b) =>
            Math.floor(
                new Date(a.dateTimeNotification).getTime() / 1000 -
                Math.floor(new Date(b.dateTimeNotification).getTime() / 1000)
            )
        )

        return plantsSorted;

    }catch (error){
        throw new Error(error)
    }
}

export async function removePlant(id: string) : Promise<void> {
    const data = await AsyncStorage.getItem('@plantmanager:plants')
    const plants = data ? (JSON.parse(data) as StoragePlantProps) : {};

    await Notification.cancelScheduledNotificationAsync(plants[id].notificationId)

    delete plants[id]

    await AsyncStorage.setItem('@plantmanager:plants', JSON.stringify(plants));
}