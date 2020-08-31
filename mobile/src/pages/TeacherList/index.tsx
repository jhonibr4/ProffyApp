import React, { useState } from 'react';
import { View , ScrollView , Text, TextInput, AsyncStorage } from 'react-native';
import { Feather } from '@expo/vector-icons'
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';

import TeacherItem , { Teacher } from '../../components/TeacherItem';
import PageHeader from '../../components/PageHeader'

import style from './style';

import api from '../../server/api';

export default function TeacherList(){

    const [ isFiltersVisible , setIsFiltersVisible ] = useState(false);

    const [ teachers , setTeachers ] = useState([]);
    const [ favorites , setFavorites ] = useState<number[]>([])
    const [ subject , setSubject ] = useState('');
    const [ week_day , setWeekDay ] = useState('');
    const [ time , setTime ] = useState('');

    async function loadFavorites(){
        AsyncStorage.getItem('favorites').then(response => {
            if(response){
                const favoritedTeachers = JSON.parse(response);
                const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
                    return teacher.id
                })
                setFavorites(favoritedTeachersIds)
            }
        })
    }

    function handleToggleFiltersVisible() {
        //Essa função vai retornar o contrario de False/True para exibir a opção de filtros.
        setIsFiltersVisible(!isFiltersVisible)
    }


    async function handleFilterSubmit() {
        loadFavorites();
        const response = await api.get('classes', {
            params:{
                subject,
                week_day,
                time,
            } ,
        })
        setTeachers(response.data)
        setIsFiltersVisible(false)
    }
    


    return(
    
        <View style={style.container}>
            <PageHeader 
                title="Proffys disponíveis" 
                headerRight={(
                    <BorderlessButton onPress={handleToggleFiltersVisible}>
                        <Feather name='filter' size={20} color='#FFF'/>
                    </BorderlessButton>
                )}>
                { isFiltersVisible &&  ( <View style={style.searchForm}>            
                    <Text style={style.label}>Matéria</Text>
                    <TextInput
                        placeholderTextColor='#C1BCCC'
                        style={style.input}
                        placeholder="Qual a matéria ?"
                        value={subject}
                        onChangeText={text => setSubject(text)}
                    />

                    <View style={style.inputGroup}>
                        <View style={style.inputBlock}> 
                            <Text style={style.label}>Dia da Semana</Text>
                            <TextInput
                                placeholderTextColor='#C1BCCC'
                                style={style.input}
                                placeholder="Qual o dia ?"
                                value={week_day}
                                onChangeText={text => setWeekDay(text)}
                            /> 
                        </View>
                        <View style={style.inputBlock}> 
                            <Text style={style.label}>Horário</Text>
                            <TextInput
                                placeholderTextColor='#C1BCCC'
                                style={style.input}
                                placeholder="Qual horário ?"
                                value={time}
                                onChangeText={text => setTime(text)}
                            /> 
                        </View>
                    </View>
                    <RectButton 
                        style={style.submitButton}
                        onPress={handleFilterSubmit}
                    >
                        <Text style={style.submitButtonText}>Filtrar</Text>
                    </RectButton>
                </View>
                )}
            </PageHeader>
            <ScrollView
                style={style.teacherList}
                contentContainerStyle={{ 
                    paddingHorizontal:16,
                    paddingBottom:24
                }}
            >
                {teachers.map((teacher: Teacher) => {
                    return (
                    <TeacherItem 
                        key={teacher.id} 
                        teacher={teacher}
                        favorited={favorites.includes(teacher.id)}
                    />)
                })}
                
            </ScrollView>
        </View>
    )
}