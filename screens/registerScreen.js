import React, { Component } from "react";
import { View, TextInput, Button, TouchableOpacity, Text } from "react-native";
import firebase from "firebase";

class registerScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
    };
  }

  onSignUp = async () => {
    const { email, password, name } = this.state;
    let result = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    let fireStoreResult = await firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .set({
        name,
        email,
      });
    console.log(result);
    console.log("Firestore result", fireStoreResult);
  };

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <TextInput
          placeholder="Enter Name"
          onChangeText={(name) => {
            this.setState({ name });
          }}
          style={{padding: 20, borderWidth: 1, marginBottom: 10}}
        />
        <TextInput
          placeholder="email"
          onChangeText={(email) => {
            this.setState({ email });
          }}
          style={{padding: 20, borderWidth: 1, marginBottom: 10}}
        />
        <TextInput
          placeholder="password"
          secureTextEntry={true}
          onChangeText={(password) => {
            this.setState({ password });
          }}
          style={{padding: 20, marginBottom: 10, borderWidth: 1, marginBottom: 10}}
        />
        <TouchableOpacity onPress={() => this.onSignUp()}>
          <Text style={{borderWidth: 1, padding: 15, backgroundColor: '#eb3486', color: 'white'}}>Signup</Text>
        </TouchableOpacity>
        
      </View>
    );
  }
}

export default registerScreen;
