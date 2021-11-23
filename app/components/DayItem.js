import React , {useState , useEffect} from 'react'
import { ListItem, Button} from 'react-native-elements'
import {  StyleSheet , TouchableOpacity} from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import Timeline from 'react-native-timeline-flatlist';
import MiniAttracItem from './MiniAttracItem';
import ButtonAdd from './ButtonAdd';
import moment from 'moment';

export default function DayItem({item, navigator}) {
      let data = [];
    item.attractions.forEach((attrac) => {
        data.push
        ({
            name: attrac.name,
            description: attrac?.desc,
            dateAndHour: attrac?.dateAndHour,
            address: attrac?.address,
            typeAttraction: attrac?.typeAttraction,
            rating: attrac?.rating,
            id: attrac.id,
        })});
    const horas = item.attractions.map(att => att.dateAndHour.split(':' , 1)[0]);
    const date = moment(item.attendanceDate).format('MMM DD') // Esto es para que el día se muestre "Mes : Nom   Día : 00"
    const index = item.number - 1; // Esto va a la ruta de SearchAttraction para enviarselo a lo demás
    
    const renderDetail = (rowData, sectionID, rowID) => {
        //console.log('item: ' + rowData);
        return(
            <MiniAttracItem
                item={rowData}
                //onPress={() => navigator.navigate("detalleAtraccion", { item: rowData })}
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
        <SafeAreaView style={{marginLeft:20,marginRight:20,marginTop:20}}>
            <ListItem Component={TouchableOpacity} disabled={true} containerStyle={styles.container}>
                <ListItem.Title style={styles.primaryText}>
                   {'Día ' + item.number}
                </ListItem.Title>
                <ListItem.Subtitle style={styles.secondaryText}>
                    {date}
                </ListItem.Subtitle>
                <ButtonAdd 
                    onPress={() => {navigator.navigate('searchAtraccion', {index : index , horas: horas})}}
                    styleButton={{
                        marginBottom: 20, 
                        marginLeft: item.number < 10 ? 15 
                                    : item.number >= 10 && item.number < 100 ? 4
                                    : -12 ,
                        }}
                />
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
