import React from 'react';
import { View , Text , ImageBackground} from 'react-native';
import { RectButton } from 'react-native-gesture-handler'

import style from './style';

import bgImageGiveClasses from '../../assets/give-classes-background.png'
import { useNavigation } from '@react-navigation/native';

export default function GiveClasses() {

    const { goBack } = useNavigation();

    function handleNavigateBack() {
        goBack();
    }
    return(
        <View style={style.container}>
            <ImageBackground 
                resizeMode="contain" 
                source={bgImageGiveClasses} 
                style={style.content}
            >
                <Text style={style.title}>Quer ser um Proffy ?</Text>
                <Text style={style.description}>Para começar, você precisa se cadastrar como professor na nossa plataforma web.</Text>
                
            </ImageBackground>
                <RectButton style={style.okButton} onPress={handleNavigateBack}>
                    <Text style={style.okButtonText}>Tudo Bem</Text>
                </RectButton>
        </View>
    );
}