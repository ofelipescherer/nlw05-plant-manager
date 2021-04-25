import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { Header } from '../components/Header';
import { EnvironmentButton } from '../components/EnvironmentButton';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { FlatList } from 'react-native-gesture-handler';
import api from '../services/api';
import { PlantCardPrimary } from '../components/PlantCardPrimary';
import { Load } from '../components/Load';
import { useNavigation } from '@react-navigation/core';
import { PlantProps } from '../libs/storage';

interface EnvironmentProps {
    key: string;
    title: string;
}

export function PlantSelect() {

    //Setting the fake api
    const[environment, setEnvironment] = useState<EnvironmentProps[]>([]);
    const[plants, setplants] = useState<PlantProps[]>([]);
    //FilteredPlants is an auxiliar state, just for the API don't do requests all time
    const[filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
    const[environmentSelected, setEnvironmentSelected] = useState('all')
    const[loading, setLoading] = useState(true)

    const[page, setPage] = useState(1)
    const[loadingMore, setLoadingMore] = useState(true)
    
    const navigation = useNavigation();

    async function fetchPlants(){
        const {data} = await 
        api.get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`);

        if(!data)
            return setLoading(true)

        if(page > 1){
            setplants(oldValue => [...oldValue, ...data])
        } else {
            setplants(data);
            setFilteredPlants(data)
        }

        setLoading(false)
        setLoadingMore(false)
    }

    function handleEnvironmentSelected(environmentNow: string){
        setEnvironmentSelected(environmentNow);

        if(environmentNow == 'all')
            return setFilteredPlants(plants);

        const filtered = plants.filter(plants => 
            plants.environments.includes(environmentNow)
        );

        return setFilteredPlants(filtered)
    }

    function handelerFetchMore(distance: number){
        if(distance < 1)
            return;
        
        setLoadingMore(true)
        setPage(oldValue => oldValue + 1)

        fetchPlants()
    }

    function handlePlantSelected(plant : PlantProps){
        navigation.navigate('ChosenPlant', { plant })
    }

    useEffect(() => {
        async function fetchEnvironment(){
            const {data} = await 
            // Question mark means that we are going to pass a parameter
            // In this case, we are going to sort based in title property and by ascend order
            api.get('plants_environments?_sort=title&_order=asc');
            setEnvironment([
                {
                    //Here we create another button named "Todos"
                    key: 'all',
                    title: 'Todos',
                },
                //Disrupt to show the rest of data
                ...data
            ]);
        }

        fetchEnvironment();

    }, [])

    useEffect(() => {
        fetchPlants();

    }, [])


    if (loading)
        return <Load />

    return (
        <View style={styles.container}>

            <View style={styles.header}> 
                <Header />

                <Text style={styles.title}>
                    Em qual ambiente
                </Text>
                <Text style={styles.subtitle}>
                    você quer colocar sua planta    
                </Text>
            </View>

            <View>
                <FlatList
                    data={environment}
                    keyExtractor={(item) => String(item.key)}
                    renderItem={({ item }) => (
                        <EnvironmentButton
                            title={item.title}
                            active={item.key === environmentSelected}
                            onPress={() => handleEnvironmentSelected(item.key)}
                        />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.environmentList}
                />
            </View>  

            <View style={styles.plants}>
                <FlatList 
                    data ={filteredPlants}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                        <PlantCardPrimary 
                            data={item}
                            onPress={() => handlePlantSelected(item)}
                        />
                    )}
                    showsVerticalScrollIndicator = {false}
                    numColumns={2}
                    onEndReachedThreshold={0.1}
                    onEndReached={({ distanceFromEnd }) => handelerFetchMore(distanceFromEnd)}
                    ListFooterComponent={
                        loadingMore
                        ? <ActivityIndicator color={colors.green} />
                        : <></>
                    }
                />
            </View> 

            

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    header: {
        paddingHorizontal: 30,
    },
    title: {
        fontSize: 17,
        fontFamily: fonts.heading,
        color: colors.heading,
        marginTop: 15,
        lineHeight: 20
    },
    subtitle: {
        color: colors.heading,
        fontFamily: fonts.text,
        lineHeight: 20,
        fontSize: 17
    },
    environmentList: {
        height: 40,
        justifyContent: 'center',
        paddingBottom: 5,
        marginLeft: 32,
        marginVertical: 32
    },
    plants: {
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: 'center'
    },
    contentContainerStyle: {
        
    }
});