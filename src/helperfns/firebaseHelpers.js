import * as firebase from "firebase";

// TODO: add suffix Async to all fns

export const setData = async (path, data) => {
  return firebase.database().ref(path).set(data);
};

export const getData = async (path) => {
  return firebase
    .database()
    .ref(path)
    .once("value")
    .then((snap) => snap.val())
    .catch((error) => {
      return null;
    });
};

export const deleteData = async (path) => {
  return firebase.database().ref(path).remove();
};

export const uploadImage = async (path, uri) => {
  const response = await fetch(uri);
  const blob = await response.blob();

  await firebase.storage().ref(path).put(blob);
};

// If requires changes, also change components/BukuHarian/Masukan's getImageURI
export const getImageURI = async (path) => {
  return firebase
    .storage()
    .ref(path)
    .getDownloadURL()
    .catch((error) => {
      console.log("there is an error in getImageURI");
      return null;
    });
};

export const deleteImage = async (path) => {
  return firebase
    .storage()
    .ref(path)
    .delete()
    .catch((error) => {
      console.log(error);
    });
};
