import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  Button,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { SearchBar, ListItem, Icon, Avatar } from "react-native-elements";

export default function Search(props) {
  const { navigation } = props;
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

  useEffect(() => {
    if (search) {
      buscarHotel();
    }
  }, [search]);

  return (
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
      <KeyboardAvoidingView>
        <ListItem bottomDivider>
          <Avatar source={{ uri: image }} />
          <ListItem.Content>
            <ListItem.Title>{name}</ListItem.Title>
            <ListItem.Subtitle>{id}</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </KeyboardAvoidingView>
    </View>
  );
}

/**<ListItem
        title={name}
        leftAvatar={{
          source: image,
        }}
        rightIcon={<Icon type="material-community" name="chevron-right" />}
        onPress={() => console.log(hotel)}
      /> */

const styles = StyleSheet.create({
  searchBar: {
    marginBottom: 20,
  },
});
