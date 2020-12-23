import React from "react";
import { StyleSheet, KeyboardAvoidingView, Text, Picker } from "react-native";
import * as firebase from "firebase";
import CustomTextInput from "../components/CustomTextInput";
import LoginModule from "../components/LoginModule";

export default class SignupScreen extends React.Component {
  state = {
    email: "",
    password: "",
    name: "",
    address: "",
    error: "",
    mk: "",
    mkList: {},
  };

  async componentDidMount() {
    const mkList = await firebase
      .database()
      .ref("/mkList")
      .once("value")
      .then((snap) => snap.val());

    this.setState({ mkList });
  }

  handleSignup() {
    const { email, password, name, address, mk } = this.state;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        const user = firebase.auth().currentUser;
        return firebase
          .database()
          .ref(`/users/${user.uid}`)
          .set({ name, address, email, mk });
      });
  }

  renderMks() {
    const { mkList } = this.state;
    const mkArray = Object.values(mkList);
    return mkArray.map((mk) => (
      <Picker.Item key={mk.nama} label={mk.nama} value={mk.nama} />
    ));
  }

  render() {
    const { name, address } = this.state;
    return (
      <KeyboardAvoidingView style={styles.body} behavior="padding" enabled>
        <Text style={styles.title}>Daftar</Text>
        <Text style={styles.pickerTitle}>Pilih MK</Text>
        <Picker
          style={{ height: 200, width: "65%" }}
          selectedValue={this.state.mk}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({ mk: itemValue })
          }
          prompt="Pilih MK"
        >
          {this.renderMks()}
        </Picker>

        <CustomTextInput
          fieldTitle="Nama"
          placeholder="Nama"
          autoCapitalize="none"
          onChangeText={(name) => this.setState({ name })}
          value={name}
        />
        <CustomTextInput
          fieldTitle="Alamat"
          placeholder="Alamat"
          autoCapitalize="none"
          onChangeText={(address) => this.setState({ address })}
          value={address}
        />
        <LoginModule
          onChangeEmail={(email) => this.setState({ email })}
          email={this.state.email}
          onChangePassword={(password) => this.setState({ password })}
          password={this.state.password}
          firstButtonAction={() => this.handleSignup()}
          firstButtonTitle="Daftar"
          secondButtonAction={() => this.props.navigation.navigate("Login")}
          secondButtonTitle="Login"
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
    color: "orange",
  },
  pickerTitle: {
    fontSize: 18,
    marginBottom: 20,
    color: "navy",
  },
  button: {
    backgroundColor: "orange",
  },
});
