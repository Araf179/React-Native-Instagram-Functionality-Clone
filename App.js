import React, { Component } from "react";
import { View, Text } from "react-native";
import firebase from "firebase/app";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./redux/reducers";
import thunk from "redux-thunk";

import LandingScreen from "./screens/landingScreen";
import RegisterScreen from "./screens/registerScreen";
import LoginScreen from "./screens/loginScreen";
import MainScreen from "./screens/mainScreen";
import AddScreen from "./components/tabScreenComponents/add";
import Save from "./components/save";
import Comments from "./components/comments";

const firebaseConfig = {
  apiKey: "AIzaSyDhZEG8i1iRv08MWx6xPI5XJy4QHRBuuz8",
  authDomain: "react-native-social-demo.firebaseapp.com",
  projectId: "react-native-social-demo",
  storageBucket: "react-native-social-demo.appspot.com",
  messagingSenderId: "1049309602723",
  appId: "1:1049309602723:web:fd419f272a58af62d1b016",
  measurementId: "G-3GER6338JC",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const store = createStore(rootReducer, applyMiddleware(thunk));

const Stack = createStackNavigator();
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      loaded: false,
    };
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({ loggedIn: false, loaded: true });
      } else {
        this.setState({ loggedIn: true, loaded: true });
      }
    });
  };

  render() {
    if (!this.state.loaded) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text>Loading...</Text>
        </View>
      );
    }
    if (!this.state.loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen
              name="Landing"
              component={LandingScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    } else {
      return (
        <Provider store={store}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Main">
              <Stack.Screen
                name="Main"
                component={MainScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Add"
                component={AddScreen}
                navigation={this.props.navigation}
              />
              <Stack.Screen name="Save" component={Save} />
              <Stack.Screen name="Comment" component={Comments} />
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      );
    }
  }
}

export default App;
