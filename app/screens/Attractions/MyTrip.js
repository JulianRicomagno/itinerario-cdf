import React , {useState, useEffect} from "react";
import { View, Text , StyleSheet , FlatList  } from "react-native";
import { Avatar } from "react-native-elements";
import DayItem from "../../components/DayItem";


export default function MyTrip({ route, navigation }) {
  //const { item } = route.params;
  const [atraccion, setAtraccion] = useState([]);
  const data = [{time: '0.9', title: 'name' , description: 'desc',}, {time: '0.9', title: 'name' , description: 'desc',}, {time: '0.9', title: 'name' , description: 'desc',},]
  async function buscarAtraccion() {

  const requestOptions = {
      method: "GET",
    };
    try { 
      const atr = fetch(
        `https://rickandmortyapi.com/api/character/`,
        requestOptions
      );
      return atr
        .then((res) => res.json())
        .then((data) => {
          setAtraccion(data.results);
        })
        .catch((error) => console.log("Ocurrio un error" + error));
    } catch (error) {
      console.log(error.message);
    }
  }

  const renderItem = ({ item  }) => {
    return (
      <DayItem
      item= {item}
      navigator={navigation}
      />
      
    );
  }

  useEffect(() => {
    setTimeout(() => {
      buscarAtraccion();
    }, 400);
  }, [])
  
  return(
    <View style={styles.container}>
      <FlatList
        data={atraccion}
        keyExtractor={(item) => item.id.toString()} 
        renderItem={renderItem}
      />
    </View>
  );

  if (atraccion == null){
    return (
      <View>
        <Text>
          No carga atracciones
        </Text>
      </View>
    );
  }
  return(
    <View>
      <Text>
        Cargo atracciones
      </Text>
    </View>
  );


}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
})