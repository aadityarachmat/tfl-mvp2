import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

import { toGridArr } from "../../helperfns/jurnalHelpers";
import getIcon from "../../helperfns/getIcons";
import { getImageURI } from "../../helperfns/firebaseHelpers";
import { getUserId } from "../../helperfns/InitializeUser";
import getDate from "../../helperfns/date";

import { SelectedIconTag } from "../IconTag";

const colors = {
  rowHeader: "orange",
  horizontalLine: "orange",
};

const interpret = (text) => {
  switch (text) {
    case "beraktivitas":
      return "Hari ini saya beraktivitas...";
    case "bersama":
      return "Hari ini saya bersama...";
    case "berada":
      return "Hari ini saya berada di...";
    case "sarapanku":
      return "Sarapanku...";
    case "makanSiangku":
      return "Makan Siangku...";
    case "makanMalamku":
      return "Makan Malamku...";
  }
};

const Grid = ({ items }) => {
  return (
    <View style={styles.gridContainer}>
      {items.map((item) => (
        <SelectedIconTag icon={item} text={item} key={item} />
      ))}
    </View>
  );
};

const GridAndImageView = ({ items, path, dataKey }) => {
  const [uri, setUri] = useState("");

  useEffect(() => {
    // Runs once on start
    getImage(path);
  }, []);

  const getImage = async (path) => {
    const uri = await getImageURI(path);
    setUri(uri);
  };

  const rowHeaderText = interpret(dataKey);

  return (
    <View style={styles.gridAndImageView}>
      <Text style={styles.rowHeaderText}>{rowHeaderText}</Text>
      <View style={styles.horizontalLine} />
      {uri ? <Image style={styles.image} source={{ uri }}></Image> : <View />}
      <Grid items={items} />
    </View>
  );
};

export default Grids = ({ data, type, date }) => {
  const userId = getUserId();
  const dataKeys = Object.keys(data);

  return (
    <View>
      {dataKeys.map((dataKey, i) => {
        // Path is for images
        const path = `userData/${userId}/jurnal/${date}/${type}/${dataKey}`;
        return (
          <View key={i}>
            <GridAndImageView
              dataKey={dataKey}
              items={data[dataKey]}
              path={path}
            />
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  rowHeaderText: {
    fontWeight: "bold",
    color: colors.rowHeader,
    fontSize: 20,
  },
  image: {
    height: 300,
    width: "100%",
    borderRadius: 18,
  },
  gridContainer: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  gridAndImageView: {
    marginBottom: 10,
  },
  horizontalLine: {
    borderBottomColor: colors.horizontalLine,
    borderBottomWidth: 1,
    marginTop: 10,
    marginBottom: 10,
  },
});
