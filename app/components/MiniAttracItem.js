import { ListItem , Text , View } from 'react-native-elements';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import {StyleSheet , TouchableOpacity, Image} from 'react-native';
import React  from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MiniAttracItem({item, onPress}) {
    if(item.title !== ''){
      item.name = item.title;
      item.status = item.description;
    return (
        <SafeAreaView style={{marginBottom: 35, flex: 1, marginTop: -15,}}>
        <ListItem
            containerStyle={[styles.atracItem]}           
            >
                    <ListItem.Content style={{padding: 5, marginTop: 15,}}>
                            <ListItem.Title style={styles.title}>{item.title}</ListItem.Title>
                            <TouchableOpacity disabled={true} style={styles.miniContainer}>
                                <ListItem.Subtitle style={styles.primary}>{item.description}</ListItem.Subtitle>
                                <ListItem.Subtitle style={styles.secondary}>{item.gender}</ListItem.Subtitle>
                            </TouchableOpacity>
                            <TouchableOpacity disabled={true} style={styles.miniContainerImage}>
                                <Image style={styles.imageDos} source={{uri: 'https://cdn.discordapp.com/attachments/246346905003622400/906006629416304691/unknown.png'}}/>
                                <ListItem.Subtitle>{item.species}</ListItem.Subtitle>
                            </TouchableOpacity>
                    </ListItem.Content>
            <TouchableOpacity style={styles.imageTouchable} onPress={onPress}>
                <Image style={styles.image} source={{uri: 'https://cdn.discordapp.com/attachments/246346905003622400/906004788452393010/unknown.png'}}/>
            </TouchableOpacity>
            </ListItem>
            </SafeAreaView>
    )
    }
    return(
        <Text></Text>
    )
}   
/*
const Rendered = (data) =>{
    return(
        <View style={{flex: 1, flexDirection: 'column'}}>
            <Text style={styles.title}>{data.title}</Text>
            <View style={{flex: 1 , flexDirection: 'row'}}>
                <Text style={styles.secondary}>{data.gender}</Text>
                <Text style={styles.secondary}>{data.species}</Text>
            </View>
            <View style={{flex: 1 , flexDirection: 'row'}}>
                <Text style={styles.secondary}>{data.description}</Text>
                <Image style={styles.imageDos} source={{uri: 'https://cdn.discordapp.com/attachments/246346905003622400/906006629416304691/unknown.png'}}/>
            </View>
        </View>
    );
}*/

const styles = StyleSheet.create({
    atracItem:{
        flex: 1,
        padding: 15,
        marginHorizontal: 15,
        borderRadius: 15,
        maxWidth: 400,
        minWidth: 200,
        maxHeight: 100,
        shadowColor: '#000000',
        shadowOpacity: 1,
        elevation: 8,
        shadowOffset : {width: 1,height: 1},
        flexDirection: 'row',
      },
      image:{
        width: 20,
        height: 20,
        borderRadius: 100,
      },
      imageTouchable:{
        width: 20,
        height: 20,
        borderRadius: 100,
        marginTop: -65,
        marginRight: -7,
      },
      miniContainer:{
        flexDirection: 'row',
        padding: 5,
      },
      miniContainerImage:{
        flexDirection: 'row',
      },
      imageDos:{
          width: 15,
          height: 15,
      },
      title:{
        color: '#385F5E',
        fontSize: 22,
      },
      primary:{
        fontSize: 16,
        marginRight: 10,
      },
      secondary:{
        fontSize: 16,
        marginHorizontal: 10,
      },
})

/*

*/