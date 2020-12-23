import * as firebase from "firebase";

export const getUserId = () => {
  const user = firebase.auth().currentUser;
  if (user) {
    return user.uid;
  } else {
    return "";
  }
};

export const getUserData = () => {
  const userId = getUserId();
  if (userId !== "") {
    return firebase
      .database()
      .ref(`users/${userId}`)
      .once("value")
      .then((snap) => {
        if (snap.exists()) {
          return snap.val();
        } else {
          console.log("User data doesn't exist!");
          return {};
        }
      });
  } else {
    console.log("Error getting user data, because the user isn't signed in!");
  }
};
