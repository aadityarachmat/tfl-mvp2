import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";

import { toGridArr } from "../../helperfns/jurnalHelpers";
import getIcon from "../../helperfns/getIcons";
import { getImageURI } from "../../helperfns/firebaseHelpers";
import { getUserId } from "../../helperfns/InitializeUser";
import getDate from "../../helperfns/date";

const interpret = (text) => {
  switch (text) {
    case "beraktivitas":
      return "Hari ini aku beraktivitas...";
    case "bersama":
      return "Hari ini aku bersama...";
    case "berada":
      return "Hari ini aku berada di...";
    case "sarapanku":
      return "Sarapanku...";
    case "makanSiangku":
      return "Makan Siangku...";
    case "makanMalamku":
      return "Makan Malamku...";
  }
};

const Column = ({ item }) => (
  <View style={styles.column}>
    {getIcon(item)}
    <Text>{item}</Text>
  </View>
);

const Row = ({ itemsRow }) => {
  return (
    <View style={styles.row}>
      {itemsRow.map((item, i) => (
        <Column item={item} key={i} />
      ))}
    </View>
  );
};

const Grid = ({ items }) => {
  const gridArr = toGridArr(items, 1, 3);
  return (
    <View>
      {gridArr.map((row, i) => (
        <Row itemsRow={row} key={i} />
      ))}
    </View>
  );
};

const GridContainer = ({ items, path, dataKey }) => {
  const [uri, setUri] = useState("");

  useEffect(() => {
    // Runs once on start
    getImage(path);
  }, []);

  const getImage = async (path) => {
    console.log(path);

    const uri = await getImageURI(path);
    setUri(uri);
  };

  const rowHeaderText = interpret(dataKey);

  return (
    <View style={styles.gridContainer}>
      <Text style={styles.rowHeaderText}>{rowHeaderText}</Text>
      {uri ? <Image style={styles.image} source={{ uri }}></Image> : null}
      <Grid items={items} />
    </View>
  );
};

const colors = {
  rowHeader: "grey",
  horizontalLine: "black",
};

export default Grids = ({ data, type }) => {
  const userId = getUserId();
  const date = getDate();
  const dataKeys = Object.keys(data);

  console.log("Grids dataKeys", dataKeys);

  return (
    <View>
      {dataKeys.map((dataKey, i) => {
        // Path is for images
        const path = `userData/${userId}/jurnal/${date}/${type}/${dataKey}`;
        console.log("Grids path", path);
        return (
          <View key={i}>
            <View style={styles.horizontalLine} />
            <GridContainer
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
    fontSize: 30,
    marginBottom: 20,
  },
  image: {
    height: 350,
    width: 350,
    borderRadius: 18,
  },
  row: {
    flexDirection: "row",
    margin: 20,
  },
  columnText: {},
  column: {
    alignItems: "center",
    margin: 20,
  },
  gridContainer: {
    margin: 20,
    alignItems: "center",
  },
  horizontalLine: {
    borderBottomColor: colors.horizontalLine,
    borderBottomWidth: 1,
    marginTop: 20,
  },
});
