import React from "react";
import { render } from "react-dom";
import { View, Text, StyleSheet, Image } from "react-native";
import Emoji from "react-native-emoji";

import getImageURI from "../../helperfns/firebaseHelpers";
import { getUserId } from "../../helperfns/InitializeUser";

getPath = () => {
  const userId = getUserId();
  const date = getDate();
  return `userData/${userId}/bukuHarian/${date}`;
};

export default class Masukan extends React.Component {
  state = {
    text: "",
    uri: "",
    emotionSelected: "grin",
  };

  componentDidMount() {
    this.displayLastPhoto();
  }

  displayLastPhoto = async () => {
    const path = getPath();
    const uri = await getImageURI(path);
    if (uri) this.setState({ uri });
  };

  render() {
    const { entries, day } = this.props;
    const { uri } = this.state;

    if (entries[day]) {
      return (
        <View style={styles.masukanView}>
          {uri !== "" && <Image source={{ uri: uri }} style={styles.image} />}
          <Text style={styles.masukanText}>{day}</Text>
          <Text style={styles.masukanText}>
            <Emoji name={entries[day].emotionSelected} />
          </Text>
          <Text style={styles.masukanText}>{entries[day].text}</Text>
        </View>
      );
    } else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  masukanView: {
    margin: 20,
  },
  masukanText: {
    marginBottom: 10,
    fontSize: 20,
  },
  image: { height: 100, width: 100, marginBottom: 20, borderRadius: 10 },
});
