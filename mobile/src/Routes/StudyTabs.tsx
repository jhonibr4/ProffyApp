import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'


import TeacherList from '../pages/TeacherList';
import Favorites from '../pages/Favorites'

const Tabs = createBottomTabNavigator();

export default function StudyTabs() {
    return (
        <Tabs.Navigator
            tabBarOptions={{
                style: {
                    elevation: 0,
                    shadowOpacity: 0,
                    height: 64
                },
                tabStyle:{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                },
                iconStyle:{
                    flex: 0,
                    height: 20,
                    width: 20
                },
                labelStyle: {
                    fontFamily: 'Archivo_700Bold',
                    fontSize: 13,
                    marginLeft: 16
                },
                inactiveBackgroundColor: '#FAFAFC',
                activeBackgroundColor: '#EBEBF5',
                inactiveTintColor: '#C1BCCC',
                activeTintColor: '#32264D'
            }}
        >
            <Tabs.Screen  
                name="TeacherList" 
                component={TeacherList}
                options={{
                    tabBarLabel: 'Proffys',
                    tabBarIcon: ({ color , size , focused }) => {
                        return(
                        <Ionicons color={focused ? '#8257E5' : color} size={size} name="ios-easel" />
                        )
                    }
                }}
            />
            <Tabs.Screen 
                name="Favorites" 
                component={Favorites}
                options={{
                    tabBarLabel: 'Favoritos',
                    tabBarIcon: ({ color , size , focused }) => {
                        return(
                        <Ionicons  size={size} color={focused ? '#8257E5' : color} name="ios-heart" />
                        )
                    }
                }}
            />
        </Tabs.Navigator>
    )
}