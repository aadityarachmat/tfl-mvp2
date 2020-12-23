import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Button } from "react-native";
import * as firebase from "firebase";
import * as ImagePicker from "expo-image-picker";

export default class HomeScreen extends React.Component {
  componentDidMount() {
    this.getPermissions();
  }

  getPermissions = async () => {
    const {
      cameraRollStatus,
    } = await ImagePicker.getCameraRollPermissionsAsync();
    const { cameraStatus } = await ImagePicker.getCameraPermissionsAsync();
    if (cameraRollStatus !== "granted") {
      await ImagePicker.requestCameraRollPermissionsAsync();
    }
    if (cameraStatus !== "granted") {
      await ImagePicker.requestCameraPermissionsAsync();
    }
  };

  render() {
    return (
      <View>
        <Button
          title="Buku Harian"
          onPress={() => this.props.navigation.push("Buku Harian")}
        />
        <Button
          title="Jurnal"
          onPress={() => this.props.navigation.push("Jurnal")}
        />
        <Button
          title="Metrik"
          onPress={() => this.props.navigation.push("Metrik")}
        />
        <Button
          title="Profile"
          onPress={() => this.props.navigation.push("Profile")}
        />
        <Button title="Sign out" onPress={() => firebase.auth().signOut()} />
      </View>
    );
  }
}
