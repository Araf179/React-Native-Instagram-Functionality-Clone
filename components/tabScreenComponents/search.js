import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import firebase from "firebase";
require("firebase/firestore");

const search = (props) => {
  const [users, setUsers] = useState([]);

  const fetchUsers = (search) => {
    firebase
      .firestore()
      .collection("users")
      .where("name", ">=", search)
      .get()
      .then((snapshot) => {
        let users = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        setUsers(users);
      });
  };

  useEffect(() => {
    fetchUsers("");
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 30 }}>
      <TextInput
        style={{padding: 20, borderBottomWidth: 1, borderBottomColor: 'green', marginBottom: 10}}
        placeholder="Type Here..."
        onChangeText={(search) => fetchUsers(search)}
      />

      <FlatList
        numColumns={1}
        horizontal={false}
        data={users}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("Profile", { uid: item.id })
            }
          >
            <Text style={{borderBottomWidth: 1, borderBottomColor: 'green', padding: 15}}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default search;
