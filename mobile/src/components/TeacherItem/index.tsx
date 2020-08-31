import React, { useState } from 'react';

import { View , Text, Image , Linking, AsyncStorage } from 'react-native';
import style from './style';
import { RectButton } from 'react-native-gesture-handler';

import heartOutlineIcon from '../../assets/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/icons/unfavorite.png';
import whatsappIcon from '../../assets/icons/whatsapp.png';

export interface Teacher {
    id: number;
    name: string;
    avatar: string;
    subject: string;
    whatsapp: string;
    bio: string;
    cost: number
}
interface TeacherItemProps {
    teacher: Teacher;
    favorited:boolean;
}


 const TeacherItem:React.FunctionComponent<TeacherItemProps> = ({ teacher , favorited }) =>{

    const [ isFavorited , setIsFavorited ] = useState(favorited)

    function handleToLinkWhatsApp(){
        Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`)
    }

    async function handleToggleFavorites() {
        const favorites = await AsyncStorage.getItem('favorites');
            
        let favoritesArray = [];

        if(favorites) {
                favoritesArray = JSON.parse(favorites);
            }
        if(isFavorited){
            const favoriteIndex = favoritesArray.findIndex((teacherItem: Teacher) => {
                return teacherItem.id === teacher.id;
            });
            favoritesArray.splice(favoriteIndex, 1)
            setIsFavorited(false);
        } else{
            favoritesArray.push(teacher)
            setIsFavorited(true)
        }
        await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray))
    }

    return(
        
        <View style={style.container}>
           
            <View style={style.profile}>
                <Image
                    style={style.avatar}
                    source={{uri: teacher.avatar}}
                />
                <View style={style.infoProfile}>
                <Text style={style.name}>{teacher.name}</Text>
                <Text style={style.subject}>{teacher.subject}</Text>
                </View>
            </View>
            <Text style={style.bio}>{teacher.bio}</Text>
            <View style={style.footer}>
                <Text style={style.price}>
                    Preço/hora {'  '}
                <Text style={style.valuePrice}>R$ {teacher.cost}</Text>
                </Text>
                <View style={style.buttonsContainer}>
                    <RectButton 
                    style={[style.favoriteButton, 
                        isFavorited ? style.favorited : {}]}
                    onPress={handleToggleFavorites}
                    >
                        {
                            isFavorited 
                            ? <Image source={unfavoriteIcon}/>
                            : <Image source={heartOutlineIcon}/>
                        }
                        
                        
                    </RectButton>
                    <RectButton 
                        style={style.contactButton}
                        onPress={handleToLinkWhatsApp}
                    >
                        <Image source={whatsappIcon}/>
                        <Text style={style.contactButtonText}>Entrar em contato</Text>
                    </RectButton>
                </View>
            </View>
            
        </View>
        
    )
}
export default TeacherItem;