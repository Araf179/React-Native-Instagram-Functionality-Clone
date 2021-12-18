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
  apiKey: "AIzaSyAJFsbFigj1LCtg3qwsBl-Ul8iE0NLoHpU",
  authDomain: "backendservice-ab685.firebaseapp.com",
  databaseURL: "https://backendservice-ab685.firebaseio.com",
  projectId: "backendservice-ab685",
  storageBucket: "backendservice-ab685.appspot.com",
  messagingSenderId: "806890630702",
  appId: "1:806890630702:web:3f81a52fdab4be562379bf",
  measurementId: "G-EPM2DG96MZ"
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
