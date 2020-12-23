import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import * as firebase from "firebase";

import MainNavigator from "./src/screens/MainNavigator";
import LoginScreen from "./src/screens/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen";

const firebaseConfig = {
  apiKey: "AIzaSyDQp7-Jl-NDbtDszNGWUjmknxoII2a19NU",
  authDomain: "tfl-mvp2.firebaseapp.com",
  databaseURL: "https://tfl-mvp2.firebaseio.com",
  projectId: "tfl-mvp2",
  storageBucket: "tfl-mvp2.appspot.com",
  messagingSenderId: "400517861923",
  appId: "1:400517861923:web:5b37471c11a51b6c9e9796",
  measurementId: "G-QQW6WBFX80",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const Stack = createStackNavigator();

class App extends React.Component {
  state = {
    loggedIn: false,
  };

  componentDidMount() {
    this.checkUserListener();
  }

  checkUserListener = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  };

  render() {
    const { loggedIn } = this.state;
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          {loggedIn && <Stack.Screen name="Main" component={MainNavigator} />}
          {!loggedIn && (
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Signup" component={SignupScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
