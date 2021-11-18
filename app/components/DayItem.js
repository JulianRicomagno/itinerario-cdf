import React , {useState} from 'react'
import { ListItem, Button} from 'react-native-elements'
import {  StyleSheet , TouchableOpacity} from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import Timeline from 'react-native-timeline-flatlist';
import MiniAttracItem from './MiniAttracItem';
import ButtonAdd from './ButtonAdd';

export default function DayItem({item, navigator}) {
    const data = [
                    {title: item.name , description: item.status , image: item.image, gender: item.gender, species: item.species,},
                    {title: 'nombre2' , description: item.status , image: item.image, gender: item.gender, species: item.species,},
                ]
    
    const renderDetail = (rowData, sectionID, rowID) => {
        return(
            <MiniAttracItem
                item={rowData}
                onPress={() => navigator.navigate("detalleAtraccion", { item: rowData })}
            />
        );
    }

    const renderCircle = (rowData, sectionID, rowID) => {
        return(
            <TouchableOpacity 
                disabled={true}
                style={{backgroundColor:'green',width:10,height:10,borderRadius:95,}}
            />
        )
    }

    return (
        <SafeAreaView>
            <ListItem Component={TouchableOpacity} disabled={true} containerStyle={styles.container}>
                <ListItem.Title style={styles.primaryText}>
                   {'Día ' + item.number}
                </ListItem.Title>
                <ListItem.Subtitle style={styles.secondaryText}>
                    {item.date}
                </ListItem.Subtitle>
                <ButtonAdd onPress={() => {navigator.navigate('searchAtraccion')}}/>
            </ListItem>
            <Timeline
                circleColor={'#32BB77'}
                lineColor={'#32BB77'}
                data={data}
                showTime={false}
                renderDetail={renderDetail}
                renderFullLine={true}
                circleSize={20}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#32BB77',
        borderRadius: 15,
        marginHorizontal: 5,
        marginVertical: 5,
        padding: 15,
        height: 35,
    },
    button: {
        color: 'red',
        maxHeight: 20,
        marginBottom: 5,
    },
    primaryText: {
        color: '#FFFFFF',
        fontSize: 24,
        marginHorizontal: 25,
    },
    secondaryText:{
        color: '#FFFFFF',
        fontSize: 20,
        marginHorizontal: 25,
    },
})
