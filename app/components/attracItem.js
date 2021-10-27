import { ListItem , Avatar } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';
import React from 'react';

export default function AttracItem({item}) {
    return (
        <ListItem
            Component={TouchableOpacity}
            style={[styles.atracItem]}
            onPress={() => {}}>
                    <Avatar size={100} rounded={true} source={{uri: item.image}}/>
                    <ListItem.Content>
                        <ListItem.Title>{item.name}</ListItem.Title>
                        <ListItem.Subtitle>{item.status}</ListItem.Subtitle>
                    </ListItem.Content>
            </ListItem>
    )
}

const styles = StyleSheet.create({
    atracItem:{
        flex: 1,
        padding: 5,
        marginVertical: 10,
        marginHorizontal: 25,
        borderRadius: 15,
        maxWidth: 500,
        minWidth: 100,
        shadowColor: '#000000',
        shadowOpacity: 0.6,
        elevation: 1,
        shadowRadius: 5,
        shadowOffset : { width: 1, height: 2},
      },
})