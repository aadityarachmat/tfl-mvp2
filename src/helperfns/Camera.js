import * as ImagePicker from "expo-image-picker";
import * as firebase from "firebase";
import { Alert } from "react-native";

export const getPermissions = async () => {
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

export const pickPhoto = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
  });
  if (!result.cancelled) {
    return result.uri;
  }
  return "";
};

export const takePhoto = async () => {
  let result = await ImagePicker.launchCameraAsync({ allowsEditing: true });
  if (!result.cancelled) {
    return result.uri;
  }
  return "";
};

// export const getPhoto = () => {
//   Alert.alert(
//     "Pilih metode",
//     "untuk mengupload foto",
//     [
//       {
//         text: "Pilih dari camera roll",
//         onPress: async () => {
//           uri = await pickPhoto();
//           this.setState({ uri });
//         },
//       },
//       {
//         text: "Ambil foto",
//         onPress: async () => {
//           uri = await takePhoto();
//           this.setState({ uri });
//         },
//       },
//       { text: "Cancel", onPress: () => console.log("Cancelled") },
//     ],
//     { cancelable: true }
//   );
// };

export const uploadImage = async (uri, path) => {
  const response = await fetch(uri);
  const blob = await response.blob();

  var ref = firebase.storage().ref(`${path}`);
  return ref.put(blob);
};
