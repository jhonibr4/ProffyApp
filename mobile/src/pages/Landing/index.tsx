import React, { useEffect , useState } from 'react';
import { View, Image, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler'

import style from './style';

import imgLanding from '../../assets/landing.png';
import studyIcons from '../../assets/icons/study.png';
import giveClassesIcons from '../../assets/icons/give-classes.png';
import heartIcons from '../../assets/icons/heart.png';

import { useNavigation } from '@react-navigation/native'
import api from '../../server/api';





export default function Landing() {

    const navigation = useNavigation();

    const [ totalConnection , setTotalConnections ] = useState(0)

    function headlerNavigateToGiveClassesPage() {
        navigation.navigate('GiveClasses')
    }
    function headlerNavigateToStudyPage() {
        navigation.navigate('Study')
    }

    async function loadConnections() {
       const response = await api.get('connections');

       setTotalConnections(response.data.total)
    }
    useEffect(() => {
        loadConnections();
    })

    return (
        <View style={style.container}>
            <Image source={imgLanding} style={style.banner} />
            <Text style={style.title}>
                Seja bem-vindo,{'\n'}
                <Text style={style.titleBold}>O que deseja fazer ? </Text>
            </Text>
            <View style={style.buttonsContainer}>
                <RectButton
                    style={[style.buttons, style.buttonPrimary]}
                    onPress={headlerNavigateToStudyPage}
                >
                    <Image source={studyIcons} />
                    <Text style={style.buttonText}>Estudar</Text>
                </RectButton>
                <RectButton
                    style={[style.buttons, style.buttonSecondary]}
                    onPress={headlerNavigateToGiveClassesPage}
                >
                    <Image source={giveClassesIcons} />
                    <Text style={style.buttonText}>Dar Aulas</Text>
                </RectButton>
            </View>

            <Text style={style.totalConnections}>
                Total de {totalConnection} conexões já realizadas {'  '}
                <Image source={heartIcons} />
            </Text>
        </View>
    )
}