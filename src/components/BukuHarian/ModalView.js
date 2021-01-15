import React from "react";
import {
  View,
  ScrollView,
  TextInput,
  Alert,
  Image,
  StyleSheet,
} from "react-native";
import PropTypes from "prop-types";

import { pickPhoto, takePhoto } from "../../helperfns/Camera";
import getDate from "../../helperfns/date";
import { getUserId } from "../../helperfns/InitializeUser";
import {
  getData,
  setData,
  deleteData,
  uploadImage,
  getImageURI,
} from "../../helperfns/firebaseHelpers";

import OptionsView from "./OptionsView";
import ModalHeader from "./ModalHeader";

const getPath = () => {
  const userId = getUserId();
  const date = getDate();
  return `userData/${userId}/bukuHarian/${date}`;
};

export default class ModalView extends React.Component {
  state = {
    text: "",
    uri: "",
    emotionSelected: "grin",
  };

  // TODO: loading
  componentDidMount() {
    this.displayLastPhoto();
    this.displayLastEntry();
  }

  // Buggy for some reasonnnnn
  displayLastPhoto = async () => {
    const path = getPath();
    console.log(path);
    const uri = await getImageURI(path);
    console.log("modal view uri", uri);
    if (uri) this.setState({ uri });
  };

  displayLastEntry = async () => {
    const path = getPath();
    const lastEntry = await getData(path);
    if (lastEntry) {
      const { text, emotionSelected } = lastEntry;
      this.setState({ text, emotionSelected });
    }
  };

  submit = () => {
    const { text, emotionSelected, uri } = this.state;
    const path = getPath();
    setData(path, { text, emotionSelected });
    if (uri) uploadImage(path, uri);
    Alert.alert("Uploaded");
  };

  delete = () => {
    const path = getPath();
    deleteData(path);
  };

  handleTextChange = (text) => {
    this.setState({ text });
  };

  getPhoto = () => {
    Alert.alert(
      "Pilih metode",
      "untuk mengupload foto",
      [
        {
          text: "Pilih dari camera roll",
          onPress: async () => {
            uri = await pickPhoto();
            this.setState({ uri });
          },
        },
        {
          text: "Ambil foto",
          onPress: async () => {
            uri = await takePhoto();
            this.setState({ uri });
          },
        },
        { text: "Cancel", onPress: () => console.log("Cancelled") },
      ],
      { cancelable: true }
    );
  };

  selectEmotion = (emotionSelected) => {
    this.setState({ emotionSelected });
  };

  render() {
    const { text, emotionSelected, uri } = this.state;
    const { toggleModal } = this.props;
    const date = getDate();
    return (
      <View style={[styles.container, { marginTop: 30 }]}>
        <ModalHeader currentDate={date} toggleModal={toggleModal} />

        {uri !== "" && <Image source={{ uri: uri }} style={styles.image} />}

        <OptionsView
          emotionSelected={emotionSelected}
          getPhoto={this.getPhoto}
          delete={this.delete}
          submit={this.submit}
          selectEmotion={this.selectEmotion}
        />

        <ScrollView keyboardDismissMode="interactive">
          <TextInput
            multiline={true}
            autoFocus={true}
            value={text}
            placeholder="Ketik di sini..."
            onChangeText={(text) => this.handleTextChange(text)}
            style={[styles.input, { height: this.state.height }]}
          />
        </ScrollView>
      </View>
    );
  }
}

ModalView.propTypes = {
  toggleModal: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
    marginLeft: 20,
    marginRight: 20,
  },
  image: {
    height: 300,
    width: "90%",
    marginBottom: 20,
    borderRadius: 10,
    alignSelf: "center",
  },
  input: {
    paddingTop: 20,
    fontSize: 18,
    fontFamily: "System",
  },
});
