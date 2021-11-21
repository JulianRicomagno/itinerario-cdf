import React , {useState, useEffect} from "react";
import { View, Text , StyleSheet , FlatList  } from "react-native";
import DayItem from "../../components/DayItem";
import { handleUser } from "../../utils/Context/Storage";
import { useAuthContext } from "../../utils/Context/AuthContext";
import { fetchUser } from "../../api/PosadasApi";


export default function MyTrip({ route, navigation }) {
  //const user = useAuthContext()
  const [atraccion, setAtraccion] = useState([]);
  const [user , setUser] = useState();

  async function crearItinerario(){
    setAtraccion(user.itinerary.totalDays);
  }

  function getUsuario(){
    fetchUser().then(res =>
      {
        setUser(res.data);
      }).catch(error => console.log(error));
  }

  /*
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
*/

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
    
      getUsuario();
    
  }, [])

  useEffect(() => {
    if(user != null){
      console.log('entro')
      crearItinerario();
    }
  }, [user])
  

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
        keyExtractor={(item) => item.attendanceDate.toString()} 
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