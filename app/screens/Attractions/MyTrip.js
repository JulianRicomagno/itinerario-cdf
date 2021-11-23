import React , {useState, useEffect} from "react";
import { View, Text , StyleSheet , FlatList  } from "react-native";
import DayItem from "../../components/DayItem";
import { fetchUser } from "../../api/PosadasApi";
import { TouchableOpacity } from "react-native";


export default function MyTrip({ route, navigation }) {
  const [atraccion, setAtraccion] = useState([]);
  const [user , setUser] = useState();
  const [isLoading , setIsLoading] = useState(false);

  // function onPress() {
  //   deleteItinerary(user)
  //   axios({
  //     method: 'POST',
  //     headers: 'headers',
  //     data: [{itinerary: {dateTo:  '',dayFrom: '', attractions: [] }}]
  //   })
  // }

  async function crearItinerario(){
    setAtraccion(user.itinerary.totalDays);
  }

  function getUsuario(){
    fetchUser().then(res =>
      {
        setUser(res.data);
      }).catch(error => console.log(error));  
  }

  const renderItem = ({ item , index  }) => {
    item.number = index + 1;
    //console.log('el item:' + item.name)
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
      setTimeout(() => {
      crearItinerario()}
      , 400)
    }
  }, [user])

  if (isLoading){
    return (
      <View>
        <Text>
          Cargando
        </Text>
      </View>
    );
  }
  return(
    <View style={styles.container}>
      {/* <TouchableOpacity onPress={(event) => {

      }}>
        <Text>Borrar</Text>
      </TouchableOpacity> */}
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
    //padding: 20,
    backgroundColor: '#FFFFFF',
    //marginBottom: 5,
  },
})