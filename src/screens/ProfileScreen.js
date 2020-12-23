import React from "react";
import { View, Text } from "react-native";
import { getUserId, getUserData } from "../helperfns/InitializeUser";

export default class ProfileScreen extends React.Component {
  state = {
    userId: "",
    userData: {},
  };

  componentDidMount() {
    this.initialize();
  }

  async initialize() {
    const promises = [];

    const userId = getUserId();
    const userData = getUserData();

    promises.push(userId);
    promises.push(userData);

    const settledPromises = await Promise.all(promises);

    this.setState({ userId: settledPromises[0], userData: settledPromises[1] });
  }

  render() {
    const { userId, userData } = this.state;
    return (
      <View>
        <Text>User ID: {userId}</Text>
        <Text>Nama: {userData.name}</Text>
        <Text>Address: {userData.address}</Text>
        <Text>Email: {userData.email}</Text>
        <Text>MK: {userData.mk}</Text>
      </View>
    );
  }
}
