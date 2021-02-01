import React, { Component } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import firebase from "firebase";

class loginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  onLogin = async () => {
    const { email, password, name } = this.state;
    let result = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    console.log(result);
  };

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
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
          style={{padding: 20, borderWidth: 1, marginBottom: 10}}
        />
        <TouchableOpacity onPress={() => this.onLogin()}>
          <Text style={{borderWidth: 1, padding: 15, backgroundColor: '#eb3486', color: 'white'}}>Login</Text>
        </TouchableOpacity>
       
      </View>
    );
  }
}

export default loginScreen;
