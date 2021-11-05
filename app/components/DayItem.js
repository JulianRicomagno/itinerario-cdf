import React , {useState} from 'react'
import { ListItem, Button} from 'react-native-elements'
import {  StyleSheet , TouchableOpacity} from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import Timeline from 'react-native-timeline-flatlist';
import MiniAttracItem from './MiniAttracItem';
import ButtonAdd from './ButtonAdd';

export default function DayItem({item, navigator}) {
    const data = [
                    {title: '', description: '' , image: ''},
                    {title: item.name , description: item.status , image: item.image, gender: item.gender, species: item.species,},
                    {title: 'asdasd', description: 'asdasd' , image: ''},
                    {title: 'asdasd', description: 'asdasd' , image: ''},
                    {title: 'asdasd', description: 'asdasd' , image: ''},
                ]
    
    const renderDetail = (rowData, sectionID, rowID) => {
        return(
            <MiniAttracItem
                item={rowData}
                onPress={() => navigator.navigate("detalleAtraccion", { item: rowData })}
            />
        );
    }

    return (
        <SafeAreaView>
            <ListItem Component={TouchableOpacity} onPress={() => {navigator.navigate('searchAtraccion')}} containerStyle={styles.container}>
                <ListItem.Title style={styles.primaryText}>
                    Dia 2
                </ListItem.Title>
                <ListItem.Subtitle style={styles.secondaryText}>
                    Feb 9
                </ListItem.Subtitle>
                <ButtonAdd onPress={() => {navigator.navigate('searchAtraccion')}}/>
            </ListItem>
            <Timeline
                options={{style:{marginVertical: -45 }}}
                circleColor={'#32BB77'}
                lineColor={'#32BB77'}
                data={data}
                showTime={false}
                renderDetail={renderDetail}
                renderFullLine={true}
                circleSize={21}
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
        marginVertical: 25,
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
