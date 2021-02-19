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
          placeholder="Email"
          onChangeText={(email) => {
            this.setState({ email });
          }}
          style={{textAlign: 'center', width: 120, padding: 20, borderBottomWidth: 1, borderBottomColor: 'green', marginBottom: 10}}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(password) => {
            this.setState({ password });
          }}
          style={{textAlign: 'center', width: 120,padding: 20, borderBottomWidth: 1, borderBottomColor: 'green', marginBottom: 10}}
        />
        <TouchableOpacity onPress={() => this.onLogin()}>
          <Text style={{ padding: 15, backgroundColor: '#cdff1f', color: 'black'}}>Login</Text>
        </TouchableOpacity>
       
      </View>
    );
  }
}

export default loginScreen;
