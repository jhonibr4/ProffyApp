import React, { ReactNode } from 'react';
import { View, Image , Text } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native';

import style from './style';

import imgBack from '../../assets/icons/back.png'
import imgLogo from '../../assets/logo.png';


interface PageHeaderProps {
    title: string,
    headerRight?: ReactNode
}

const PageHeader: React.FunctionComponent<PageHeaderProps> = ({ title , children , headerRight}) =>{
    const { navigate } = useNavigation();

    function handleGoBack(){
        navigate('Landing')
    }

    return(
        <View style={style.container}>
            <View style={style.topBar}>
                <BorderlessButton onPress={handleGoBack}>
                    <Image source={imgBack} resizeMode='contain'/>
                </BorderlessButton>
                <Image source={imgLogo} resizeMode='contain'/>
            </View>
    <View style={style.header}>
        <Text style={style.title}>{title}</Text>
        {headerRight}
    </View>

    {children}
    </View>
    )
}
export default PageHeader;