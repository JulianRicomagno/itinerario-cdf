import React , {useState, useEffect} from "react";
import { View, Text , StyleSheet , FlatList  } from "react-native";
import DayItem from "../../components/DayItem";
import { handleUser } from "../../utils/Context/Storage";
import { useAuthUpdateContext } from "../../utils/Context/AuthContext";


export default function MyTrip({ route, navigation }) {
  const updateUser = useAuthUpdateContext()
  const [atraccion, setAtraccion] = useState([]);

  async function buscarItinerario(){
    try{
      const data = handleUser('updateApi' , updateUser);
      setAtraccion(data.user.itinerary.totalDays);
      
    }
    catch(e){
      console.log(e)
    }

  }
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

  const renderItem = ({ item , index  }) => {
    item.number = index + 1;
    item.date = 'Mar 8';
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
  

  if (atraccion == null){
    return (
      <View>
        <Text>
          Crea tu itinerario
        </Text>
      </View>
    );
  }
  return(
    <View style={styles.container}>
      <FlatList
        data={atraccion}
        keyExtractor={(item) => item.id.toString()} 
        renderItem={renderItem}
      />
    </View>
  );


}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 20,
    backgroundColor: '#FFFFFF',
    marginBottom: 5,
  },
})