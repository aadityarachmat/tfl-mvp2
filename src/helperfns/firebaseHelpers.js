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
      console.log(JSON.stringify(error));
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

export const getImageURI = async (path) => {
  return firebase
    .storage()
    .ref(path)
    .getDownloadURL()
    .catch((error) => {
      return null;
    });
};
