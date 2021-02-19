import React from "react";
import { View, Text, Button,TouchableOpacity } from "react-native";

export default function landingScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: 'center'}}>
      <TouchableOpacity style={{marginBottom: 15}} onPress={() => navigation.navigate("Register")}>
          <Text style={{padding: 15, backgroundColor: '#cdff1f', color: 'black'}}>Signup</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={{ paddingTop: 15, paddingBottom: 15,paddingRight: 20,paddingLeft: 20, backgroundColor: '#cdff1f', color: 'black'}}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}
