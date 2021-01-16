import React from "react";
import { render } from "react-dom";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Emoji from "react-native-emoji";
import * as firebase from "firebase";
import Icon from "react-native-vector-icons/MaterialIcons";

const getUserId = () => {
  const user = firebase.auth().currentUser;
  if (user) {
    return user.uid;
  } else {
    return "";
  }
};

const getImageURI = async (path) => {
  return firebase
    .storage()
    .ref(path)
    .getDownloadURL()
    .catch((error) => {
      console.log("there is an error in getImageURI");
      return null;
    });
};

const shortenText = (text) => {
  const length = text.length;
  if (length > 40) {
    return text.substring(0, 39) + "...";
  }
  return text;
};

const colors = {
  header: "black",
  text: "grey",
  background: "white",
};

export default class EntryPreview extends React.Component {
  state = {
    text: "",
    uri: "",
    emotionSelected: "grin",
    metadata: "",
    mounted: false,
  };

  componentDidMount() {
    this.setState({ mounted: true });
  }

  async componentDidUpdate() {
    this.displayPhoto();
  }

  componentWillUnmount() {
    this.setState({ mounted: false });
  }

  displayPhoto = async () => {
    const { day } = this.props;
    const { mounted } = this.state;

    if (day) {
      const userId = getUserId();

      const path = `userData/${userId}/bukuHarian/${day}`;
      const uri = await getImageURI(path);
      if (uri && mounted) this.setState({ uri });
    }
  };

  onPress = () => {
    const { entries, day } = this.props;
    const { uri } = this.state;
    this.props.navigation.push("Masukan Details", {
      uri: uri,
      entries: entries,
      day: day,
    });
  };

  render() {
    const { entries, day } = this.props;
    const { uri } = this.state;

    if (entries[day]) {
      return (
        <TouchableOpacity onPress={this.onPress} style={styles.container}>
          <View style={styles.imageView}>
            {uri !== "" ? (
              <Image source={{ uri: uri }} style={styles.image} />
            ) : (
              <ActivityIndicator
                size="large"
                style={styles.imageActivityIndicator}
              />
            )}
          </View>

          <View style={styles.textView}>
            <View style={styles.dateView}>
              <Icon name="today" size={25} color={colors.header} />
              <Text style={styles.dateText}>{day}</Text>
            </View>

            <Text style={styles.EntryPreviewText}>
              <Emoji name={entries[day].emotionSelected} />
            </Text>
            <Text style={styles.EntryPreviewText}>
              {shortenText(entries[day].text)}
            </Text>
          </View>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: "94%",
    backgroundColor: colors.background,
    alignSelf: "center",
    marginTop: 20,
    borderLeftWidth: 1,
  },
  dateView: {
    flexDirection: "row",
    marginBottom: 10,
  },
  textView: {
    margin: 20,
    width: "50%",
  },
  dateText: {
    fontWeight: "bold",
    fontSize: 20,
    color: colors.header,
  },
  EntryPreviewText: {
    marginBottom: 10,
    fontSize: 20,
    color: colors.text,
  },
  imageView: {
    position: "absolute",
    alignSelf: "flex-end",
    height: "100%",
    width: "40%",
    justifyContent: "center",
  },
  imageActivityIndicator: {
    alignSelf: "center",
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
    opacity: 1,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
});
