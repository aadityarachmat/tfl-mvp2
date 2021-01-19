import React from "react";
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

import { getData } from "../../helperfns/firebaseHelpers";

import Tags from "../Tags";

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

const getJurnalData = async (date) => {
  const userId = getUserId();
  const path = `userData/${userId}/jurnal/${date}`;
  return await getData(path);
};

const getActivities = (jurnalData) => {
  const aktivitas = jurnalData["aktivitas"];
  if (aktivitas) {
    const beraktivitas = aktivitas["beraktivitas"];
    const values = [];
    for (let key in beraktivitas) {
      values.push(beraktivitas[key]["value"]);
    }
    return values;
  }
};

const getMakan = (jurnalData) => {
  const makan = jurnalData["makan"];
  if (makan) {
    const sarapanku = makan["sarapanku"];
    const values = [];
    for (let key in sarapanku) {
      values.push(sarapanku[key]["value"]);
    }
    return values;
  }
};

const colors = {
  header: "black",
  text: "grey",
  background: "white",
};

const emotionColors = {
  grin: "lightgreen",
  joy: "lightgreen",
  blush: "lightgreen",
  heart_eyes: "lightgreen",
  sunglasses: "lightgreen",
  sleepy: "gold",
  neutral_face: "gold",
  disappointed: "gold",
  sob: "crimson",
  rage: "crimson",
};

export default class EntryPreview extends React.Component {
  state = {
    uri: "",
    jurnalData: {},
  };

  componentDidMount() {
    this.downloadPhoto();
    this.setJurnalDataToState();
  }

  componentDidUpdate() {
    const { jurnalData } = this.state;

    this.downloadPhoto();
    if (!jurnalData) this.setJurnalDataToState();
  }

  downloadPhoto = async () => {
    const { day } = this.props;
    const { uri } = this.state;

    if (day && uri === "") {
      const userId = getUserId();
      const path = `userData/${userId}/bukuHarian/${day}`;
      const uri = await getImageURI(path);
      if (uri) {
        this.setState({ uri });
      } else {
        this.setState({ uri: "No Image" });
      }
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

  setJurnalDataToState = async () => {
    const { day } = this.props;
    const jurnalData = await getJurnalData(day);
    this.setState({ jurnalData });
  };

  render() {
    const { entries, day } = this.props;
    const { uri, jurnalData } = this.state;
    const activities = getActivities(jurnalData);
    const sarapanku = getMakan(jurnalData);
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

          <Text style={styles.emotionView}>
            <View
              style={[
                styles.emotionColorCircle,
                {
                  backgroundColor: emotionColors[entries[day].emotionSelected],
                },
              ]}
            />
            <Emoji name={entries[day].emotionSelected} />
          </Text>

          <Text style={styles.EntryPreviewText}>
            {shortenText(entries[day].text)}
          </Text>
        </View>

        <View style={{ flexGrow: 1 }}></View>

        <View style={styles.jurnalView}>
          {activities && (
            <Tags
              category="Aktivitas"
              items={activities}
              type="Selected"
              selected={true}
            />
          )}
          {sarapanku && (
            <Tags
              category="Makan"
              items={sarapanku}
              type="Selected"
              selected={true}
            />
          )}
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 260,
    width: "94%",
    backgroundColor: colors.background,
    alignSelf: "center",
    marginTop: 20,
    borderLeftWidth: 4,
    backgroundColor: "white",
  },
  dateView: {
    flexDirection: "row",
    marginBottom: 10,
  },
  textView: {
    marginLeft: 20,
    marginTop: 10,
    width: "50%",
  },
  dateText: {
    fontWeight: "bold",
    fontSize: 20,
    color: colors.header,
  },
  emotionView: {
    flexDirection: "row",
    marginBottom: 10,
    fontSize: 20,
    justifyContent: "center",
  },
  emotionColorCircle: {
    height: 16,
    width: 16,
    borderRadius: 10,
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
  jurnalView: {
    marginLeft: 20,
    marginBottom: 10,
  },
});
