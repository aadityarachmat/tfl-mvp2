import React from "react";
import {
  StyleSheet,
  Text,
  Button,
  View,
  TouchableOpacity,
  Image,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { Icon } from "react-native-elements";

import * as ImagePicker from "expo-image-picker";
import * as firebase from "firebase";

import CustomTextInput from "../components/CustomTextInput.js";

export default class MetrikBulananScreen extends React.Component {
  state = {
    tinggiBadan: "",
    beratBadan: "",
    fotoObat: "",
    fotoLaporanKesehatan: ""
  };

  componentDidMount() {
    this.getPermissions();
  }

  async handleSubmit() {
    const {
      tinggiBadan,
      beratBadan,
      fotoObat,
      fotoLaporanKesehatan
    } = this.state;

    const userId = "testUserId"; // TODO: store user in global state
    const database = firebase.database();

    // Get timePath
    const d = new Date();
    const tahun = d.getFullYear();
    const bulan = d.getMonth();
    const timePushed = Date.now();
    const timePath = `Tahun_${tahun}/Bulan_${bulan}/TimePushed_${timePushed}`;

    // push promises to an array to take advantage of Promise.all()
    const promises = [];

    promises.push(
      database.ref(`/metrikBulanan/${userId}/${timePath}`).push({
        tinggiBadan,
        beratBadan
      })
    );

    if (fotoObat !== "") {
      promises.push(this.uploadImage(fotoObat, userId, "fotoObat", timePath));
    }
    if (fotoLaporanKesehatan !== "") {
      promises.push(
        this.uploadImage(
          fotoLaporanKesehatan,
          userId,
          "fotoLaporanKesehatan",
          timePath
        )
      );
    }

    await Promise.all(promises)
      .then(() => Alert.alert("Upload Berhasil!"))
      .catch(error => Alert.alert(error));
  }

  getPermissions = async () => {
    const {
      cameraRollStatus
    } = await ImagePicker.getCameraRollPermissionsAsync();
    const { cameraStatus } = await ImagePicker.getCameraPermissionsAsync();
    if (cameraRollStatus !== "granted") {
      await ImagePicker.requestCameraRollPermissionsAsync();
    }
    if (cameraStatus !== "granted") {
      await ImagePicker.requestCameraPermissionsAsync();
    }
  };

  pickPhoto = async imageType => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true
    });
    if (!result.cancelled) {
      if (imageType === "fotoObat") {
        this.setState({ fotoObat: result.uri });
      } else if (imageType === "fotoLaporanKesehatan") {
        this.setState({ fotoLaporanKesehatan: result.uri });
      }
    }
  };

  takePhoto = async imageType => {
    let result = await ImagePicker.launchCameraAsync({ allowsEditing: true });
    if (!result.cancelled) {
      if (imageType === "fotoObat") {
        this.setState({ fotoObat: result.uri });
      } else if (imageType === "fotoLaporanKesehatan") {
        this.setState({ fotoLaporanKesehatan: result.uri });
      }
    }
  };

  choosePhotoMethod = async imageType => {
    Alert.alert(
      "Pilih metode",
      "untuk mengupload foto",
      [
        {
          text: "Pilih dari camera roll",
          onPress: () => this.pickPhoto(imageType)
        },
        {
          text: "Ambil foto",
          onPress: () => this.takePhoto(imageType)
        },
        { text: "Cancel", onPress: () => console.log("Cancelled") }
      ],
      { cancelable: true }
    );
  };

  uploadImage = async (uri, userId, imageType, timePath) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    var ref = firebase
      .storage()
      .ref()
      .child(`${userId}/${imageType}/${timePath}`);
    return ref.put(blob);
  };

  render() {
    const { fotoObat, fotoLaporanKesehatan } = this.state;
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView style={styles.body} behavior="padding">
          {/* <Text style={styles.title}>.-.</Text> */}
          <CustomTextInput
            placeholder="Tinggi Badan (cm)"
            onChangeText={text => this.setState({ tinggiBadan: text })}
            value={this.state.tinggiBadan}
            keyboardType="phone-pad"
            fieldTitle="Tinggi Badan (cm)"
          ></CustomTextInput>
          <CustomTextInput
            placeholder="Berat Badan (kg)"
            onChangeText={text => this.setState({ beratBadan: text })}
            value={this.state.beratBadan}
            keyboardType="phone-pad"
            fieldTitle="Berat Badan (kg)"
          ></CustomTextInput>

          <View
            style={{
              flexDirection: "row",
              width: "64%",
              justifyContent: "space-between",
              marginBottom: 20
            }}
          >
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.choosePhotoMethod("fotoObat")}
            >
              <Text style={styles.buttonText}>Obat</Text>
              <Icon name="camera-alt" color="white" />
              {fotoObat !== "" && <Icon name="check-circle" color="white" />}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => this.choosePhotoMethod("fotoLaporanKesehatan")}
            >
              <Text style={styles.buttonText}>Laporan Kesehatan</Text>
              <Icon name="camera-alt" color="white" />
              {fotoLaporanKesehatan !== "" && (
                <Icon name="check-circle" color="white" />
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.button, styles.submitButton]}
            onPress={() => this.handleSubmit()}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 20
  },
  button: {
    padding: 10,
    backgroundColor: "lightseagreen",
    borderRadius: 20,
    alignItems: "center",
    marginTop: 20,
    width: 110,
    justifyContent: "center",
    height: 120
  },
  submitButton: {
    backgroundColor: "orange",
    height: 50,
    width: "64%"
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center"
  },
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
