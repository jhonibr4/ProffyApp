import React, { useState, useEffect } from 'react'
import { View , Text, ScrollView, AsyncStorage } from 'react-native';
import { useFocusEffect } from '@react-navigation/native'
import style from './style';

import PageHeader from '../../components/PageHeader'
import TeacherItem, { Teacher } from '../../components/TeacherItem';

export default function Favorites(){

    const [ favorites , setFavorites ] = useState([]);

    async function loadFavorites(){
        AsyncStorage.getItem('favorites').then(response => {
            if(response){
                const favoritedTeachers = JSON.parse(response);
                
                setFavorites(favoritedTeachers)
            }
        })
    }

    useFocusEffect(() => {
        loadFavorites()
    },[])

    return(
        <View style={style.container}>
            <PageHeader title="Meus proffys favoritos"/>
            <ScrollView
                style={style.teacherList}
                contentContainerStyle={{ 
                    paddingHorizontal:16,
                    paddingBottom:24
                }}
            >
                {favorites.map((teacher: Teacher) => {
                    return (
                    <TeacherItem 
                        key={teacher.id} 
                        teacher={teacher}
                        favorited={true}
                    />)
                })}
            </ScrollView>
        </View>
    )
}