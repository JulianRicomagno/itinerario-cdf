import React, { useState, useEffect, Component } from "react";
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
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import CalendarPicker from "react-native-calendar-picker";
import RNPickerSelect from "react-native-picker-select";
import { SearchBar, ListItem, Icon, Avatar } from "react-native-elements";

export default function CreateItineraty(props) {
  const { navigation, route } = props;
  const [selectedStartDate, setSelectedStartDate] = useState(Date);
  const [selectedEndDate, setSelectedEndDate] = useState(Date);
  const minDate = new Date(); // Today
  const maxDate = new Date(2035, 12, 30);
  //const startDate  =  selectedStartDate ? selectedStartDate.toString() : '';
  //const endDate = selectedEndDate ? selectedEndDate.toString() : '';
  const [place, setPlace] = useState("Select type of stay");
  const [search, setSearch] = useState("");
  const [hoteles, setHoteles] = useState([]);

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
      setSelectedStartDate(date);
      setSelectedEndDate(null);
    }
  }

  useEffect(() => {
    if (search) {
      buscarHotel();
    }
  }, [search]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.text}> Dates of Stay </Text>
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
        <Text style={styles.text}> Place of Stay </Text>
        <View>
          <View style={styles.picker}>
            <RNPickerSelect
              items={[
                { label: "Hotel", value: "Hotel" },
                { label: "House", value: "House" },
                { label: "Other", value: "Other" },
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
            <View style={StyleSheet.bottom}>
              <Button
                title="Confirm"
                onPress={() => navigation.navigate("myTrip")}
              />
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
});
