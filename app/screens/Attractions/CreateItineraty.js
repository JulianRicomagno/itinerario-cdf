import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  Platform,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";
import CalendarPicker from "react-native-calendar-picker";
import RNPickerSelect from "react-native-picker-select";
import { SearchBar, ListItem, Icon, Avatar } from "react-native-elements";
import { fetchUser } from "../../api/PosadasApi";
//import { handleUser } from "../../utils/Context/Storage";


export default function CreateItineraty(props) {
  const { navigation, route } = props;
  const [selectedStartDate, setSelectedStartDate] = useState(Date);
  const [selectedEndDate, setSelectedEndDate] = useState(Date);
  const [startDate , setStartDate] = useState();
  const [finDate , setFinDate] = useState();
  const minDate = new Date(); // Today
  const maxDate = new Date(2035, 12, 30);
  //const startDate  =  selectedStartDate ? selectedStartDate.toString() : '';
  //const endDate = selectedEndDate ? selectedEndDate.toString() : '';
  const [place, setPlace] = useState("Seleccionar tipo de estadía");
  const [search, setSearch] = useState("");
  const [hoteles, setHoteles] = useState([]);
  const [userInfo , setUserInfo] = useState({});
  const [isLoading , setIsLoading] = useState(true)

  async function buscarHotel() {
    const requestOptions = {
      method: "GET",
    };
    try {
      const atr = fetch(
        `https://rickandmortyapi.com/api/character/?name=${search}`,
        requestOptions
      );
      return atr
        .then((res) => res.json())
        .then((data) => {
          setHoteles(data.results);
        })
        .catch((error) => console.log("Ocurrio un error" + error));
    } catch (error) {
      console.log(error.message);
    }
  }

  function onDateChange(date, type) {
    if (type === "END_DATE") {
      setSelectedEndDate(date);
      
    } else {
      setSelectedEndDate(null);
      setSelectedStartDate(date);
      
//      setSelectedEndDate(null);
    }
    //selectedStartDate == null ? console.log() : setStartDate(moment(selectedStartDate));
    //selectedEndDate == null ? console.log() : setFinDate(moment(selectedEndDate).toISOString());
    //console.log('Inicio: ' + startDate + '. Fin: ' + finDate);
    //console.log('Inicio: ' + selectedStartDate)
    //console.log('Fin: ' + selectedEndDate)
  }

  useEffect(() => {
    if (search) {
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
    //console.log('entro.' , user);
  }

// CalendarPicker no puede cambiar el idioma lamentablemente ☹
//TODO - cambiar visibilidad del Return para que sea más fácil de leer.

  return (
    <ScrollView>
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
        <TouchableOpacity 
            style={{heigth: 55, width: 55, backgroundColor: 'green', marginHorizontal: 150,}} 
            onPress={(event) => pressEnd(selectedStartDate, selectedEndDate, userInfo, place)}>
          <Text>Botón</Text>
        </TouchableOpacity>
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
              <Button
                title="Confirmar"
                onPress={() => navigation.navigate("myTrip")}
              />
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}


const pressEnd = (start ,end, userInfo, place) =>{
  if(start !=  null && end != null)
  {
    const momentStart = moment(start);
    const momentEnd = moment(end);
    let momentArray = moment(start);
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
    arr[0] = { attendanceDate: momentStart.format('yyyy-MM-DD'), isDayOff: false, attractions : [{name: 'hola' , id: '12345'}] };
    console.log('Fecha inicio: ', startDate, '. Fecha fin: ' , endDate, '. Cantidad de días: ' , totalDays, '. Información del usuario: ' , userInfo.generalInfo, '. id y tipo de usuario: ', userInfo.id , ',' , userInfo.type)
    const reqArray = arr;
    // Request para hacerle update al itinerario
    /*
    const request = {
      id: userInfo.id,
      type: userInfo.type,
      generalInfo: userInfo.generalInfo,
      itinerary : {
        dayFrom: startDate,
        dayTo: endDate,
        hotel : place,
        totalDays : reqArray,
      },
      newAttraction:{ 
        typeAttraction: 'hotel',
        name: 'el hotel',
        attendanceDate: startDate
      },
    };
    */
    // Fin de la request
  }
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
});
