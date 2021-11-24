import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  Text,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import moment from "moment";
import CalendarPicker from "react-native-calendar-picker";
import RNPickerSelect from "react-native-picker-select";
import { SearchBar, ListItem, Icon, Avatar } from "react-native-elements";
import { fetchUser , getAttractionsByName , updateUser , getAllAttractions} from "../../api/PosadasApi";
import {useAuthUpdateContext , useAuthContext} from '../../utils/Context/AuthContext';
//import { handleUser } from "../../utils/Context/Storage";


export default function CreateItineraty(props) {
  const { navigation, route } = props;
  const updateUserContext = useAuthUpdateContext();
  const userContext = useAuthContext();
  const [selectedStartDate, setSelectedStartDate] = useState(Date);
  const [selectedEndDate, setSelectedEndDate] = useState(Date);
  const minDate = new Date(); // Today
  const maxDate = new Date(2035, 12, 30);
  const [place, setPlace] = useState("Seleccionar tipo de estadía");
  const [search, setSearch] = useState('');
  const [hoteles, setHoteles] = useState([]);
  const [userInfo , setUserInfo] = useState({});
  const [isLoading , setIsLoading] = useState(true);
  const [completed , setCompleted] = useState(false);

  async function buscarHotel() {
    if(search !== ''){
      try {
        getAttractionsByName(search)
          .then((res) => {
            setHoteles(res.data);
          })
          .catch((error) => console.log("Ocurrio un error" + error));
      } catch (error) {
        console.log(error.message);
    }} else {
      getAllAttractions().then(res => {
        setHoteles(res.data);
      })
      .catch(error => {console.log('Ocurrio un error ' , error)});
    }
  }

  function onDateChange(date, type) {
    if (type === "END_DATE") {
      setSelectedEndDate(date);
    } else {
      setSelectedEndDate(null);
      setSelectedStartDate(date);
    }
  }

  const pressEnd = () =>{
    if(selectedStartDate !=  null && selectedEndDate != null)
    {
      const momentStart = moment(selectedStartDate);
      const momentEnd = moment(selectedEndDate);
      let momentArray = moment(selectedStartDate);
      const startDate = momentStart.format('yyyy-MM-DD');
      const endDate = momentEnd.format('yyyy-MM-DD');
      //console.log('Inicio: ' +  momentStart.format('yyyy-MM-DD') + '. Final: ' + momentEnd.format('yyyy-MM-DD'));
      let totalDays = momentEnd.diff(momentStart, 'days')+1;
      //console.log((momentEnd.diff(momentStart, 'days')+1) + ' dias de estadía.');
      let arr = [];
      let i = 0;
      let x = 0;
      while(i < totalDays){
        arr.push({attendanceDate : momentArray.add(x , 'days').format('yyyy-MM-DD'), isDayOff : false, attractions: []});
        if(x == 0){
          x++;
        }
        i++;
      }
      //console.log('Fecha inicio: ', startDate, '. Fecha fin: ' , endDate, '. Cantidad de días: ' , totalDays, '. Información del usuario: ' , userInfo.generalInfo, '. id y tipo de usuario: ', userInfo.id , ',' , userInfo.type)
      const reqArray = arr;
      // Request para hacerle update al itinerario
      
      const request = {
        id: userInfo.id,
        type: userInfo.type,
        itinerary : {
          dayFrom: startDate,
          dayTo: endDate,
          hotel : place, // Esto tiene que cambiar al hotel en sí.
          totalDays : reqArray,
        },
      };
      
      // Fin de la request
      updateUser(JSON.stringify(request)).then(
        res => {
          if(res.status == 200)  {
            updateUserContext({...userContext , dayFrom: startDate});
            setTimeout(()=>{ navigation.navigate('myTrip') } , 200);
        }
        }
      ).catch(error => console.log(error));
    }
  }
  
  useEffect(() => {
    setCompleted(checkCompleted());
  }, [selectedStartDate , selectedEndDate, place])

  useEffect(() => {
    if (search !== '') {
      buscarHotel();
    }
  }, [search]);

  useEffect(()=> {
    setTimeout(() => {
      setIsLoading(false);
    }, 400);
  }, [])

  useEffect(() => {
    fetchUserInfo();
  }, [isLoading])

  function fetchUserInfo(){
    fetchUser().then(response => setUserInfo(response.data));
  }

  function checkCompleted(){
    return place !== "Seleccionar tipo de estadía" && place !== null && selectedStartDate !== null && selectedEndDate !== null && selectedStartDate !== selectedEndDate;
  }

// CalendarPicker no puede cambiar el idioma lamentablemente ☹
//TODO - cambiar visibilidad del Return para que sea más fácil de leer.

  return (
    <ScrollView style={{backgroundColor: '#FFFFFF'}}>
      <View style={styles.container}>
        <Text style={styles.text}> Fechas de Estadía </Text>
        <CalendarPicker
          startFromMonday={true}
          allowRangeSelection={true}
          minDate={minDate}
          maxDate={maxDate}
          todayBackgroundColor="#88ebba"
          selectedDayColor="#32BB77"
          selectedDayTextColor="#FFFFFF"
          onDateChange={onDateChange}
        />
        <Text style={styles.text}> Lugar de Estadía </Text>
        <View>
          <View style={styles.picker}>
            <RNPickerSelect
              items={[
                { label: "Hotel", value: "Hotel" },
                { label: "Casa", value: "Casa" },
                { label: "Otro", value: "Otro" },
              ]}
              onValueChange={(value) => setPlace(value)}
            >
              <Text>{place}</Text>
            </RNPickerSelect>
          </View>
          {place === "Hotel" ? (
            <KeyboardAvoidingView>
              <View>
                <View>
                  <SearchBar
                    placeholder="Busca tu Hotel..."
                    onChangeText={(e) => setSearch(e)}
                    value={search}
                    containerStyle={styles.searchBar}
                  />
                  {hoteles.length === 0 ? (
                    <View>
                      <NoFoundRestaurants />
                    </View>
                  ) : (
                    <FlatList
                      data={hoteles}
                      renderItem={(hotel) => (
                        <Hotel hotel={hotel} navigation={navigation} />
                      )}
                      keyExtractor={(item, index) => index.toString()}
                    />
                  )}
                </View>
              </View>
            </KeyboardAvoidingView>
          ) : (
            <View style={styles.bottom}>
              <TouchableOpacity
                onPress={() => pressEnd()}
                disabled={!completed}
                style={[styles.button , {backgroundColor : completed ? '#32BB77' : '#F1F1F1' , borderColor : completed ? '#32BB77' : '#E33674'}]}
              >
                <Text style={[styles.buttonText , {color: completed? '#FFFFFF' : '#385F5E'} ]}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}



function NoFoundRestaurants() {
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Image
        source={require("../../../assets/no-result-found.png")}
        resizeMode="cover"
        style={{ width: 200, height: 200 }}
      />
    </View>
  );
}

function Hotel(props) {
  const { hotel, navigation } = props;
  const { id, name, image } = hotel.item;
  console.log(id);
  console.log(name);
  console.log(image);

  return (
    <View>
      <ListItem bottomDivider onPress={() => navigation.navigate("myTrip")}>
        <Avatar source={{ uri: image }} />
        <ListItem.Content>
          <ListItem.Title>{name}</ListItem.Title>
          <ListItem.Subtitle>{id}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    marginTop: 0,
  },
  text: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#32BB77",
    marginEnd: 10,
    alignItems: "center",
    textAlign: "center",
    margin: 20,
    borderRadius: 30,
  },
  containerr: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center",
  },
  picker: {
    margin: 10,
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: "#32BB77",
    borderRadius: 20,
    color: "black",
    paddingRight: 50,
  },
  searchBar: {
    marginBottom: 20,
  },
  bottom: {
    margin: 50,
  },
  button: {
    alignSelf: 'center',
    paddingVertical: 10,
    marginVertical: 10,
    width: '75%',
    borderRadius: 32,
    borderColor: '#32BB77',
    borderWidth: 1,
  },
  buttonText : {
    textAlign: 'center',
    fontSize: 18
  },
});
