import React from "react";
import { StyleSheet, KeyboardAvoidingView, Text } from "react-native";
import * as firebase from "firebase";
import LoginModule from "../components/LoginModule";

export default class LoginScreen extends React.Component {
  state = {
    email: "",
    password: "",
    error: "",
  };

  async handleLogin() {
    const { email, password } = this.state;
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => this.setState({ error: error.message }));
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.body} behavior="padding" enabled>
        <Text style={styles.title}>Login</Text>
        <LoginModule
          onChangeEmail={(email) => this.setState({ email })}
          email={this.state.email}
          onChangePassword={(password) => this.setState({ password })}
          password={this.state.password}
          firstButtonAction={() => this.handleLogin()}
          firstButtonTitle="Login"
          secondButtonAction={() => this.props.navigation.navigate("Signup")}
          secondButtonTitle="Daftar"
          error={this.state.error}
          loginButtonStyles={styles.button}
        ></LoginModule>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: "center" /* horizontal */,
    justifyContent: "center" /* vertical */,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 20,
    color: "cadetblue",
  },
  button: {
    backgroundColor: "cadetblue",
  },
});
