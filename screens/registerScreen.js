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
    alert(result.Error);
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
          style={{textAlign: 'center', width: 140, padding: 20, borderBottomWidth: 1, borderBottomColor: 'green', marginBottom: 10}}
        />
        <TextInput
          placeholder="Email"
          onChangeText={(email) => {
            this.setState({ email });
          }}
          style={{textAlign: 'center', width: 140,padding: 20, borderBottomWidth: 1, borderBottomColor: 'green', marginBottom: 10}}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(password) => {
            this.setState({ password });
          }}
          style={{textAlign: 'center', width: 140, padding: 20, marginBottom: 10, borderBottomWidth: 1, borderBottomColor: 'green', marginBottom: 10}}
        />
        <TouchableOpacity onPress={() => this.onSignUp()}>
          <Text style={{ padding: 15, backgroundColor: '#cdff1f', color: 'black'}}>Signup</Text>
        </TouchableOpacity>
        
      </View>
    );
  }
}

export default registerScreen;
