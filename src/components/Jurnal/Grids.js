import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";

import { toGridArr } from "../../helperfns/jurnalHelpers";
import getIcon from "../../helperfns/getIcons";
import { getImageURI } from "../../helperfns/firebaseHelpers";
import { getUserId } from "../../helperfns/InitializeUser";
import getDate from "../../helperfns/date";

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

const GridContainer = ({ items, path }) => {
  const [uri, setUri] = useState("");

  useEffect(() => {
    // Runs once on start
    getImage(path);
  }, []);

  const getImage = async (path) => {
    const uri = await getImageURI(path);
    setUri(uri);
  };

  return (
    <View>
      <Text style={styles.rowHeaderText}>{key}</Text>
      {uri ? (
        <Image style={{ width: 100, height: 100 }} source={{ uri }}></Image>
      ) : (
        <ActivityIndicator></ActivityIndicator>
      )}
      <Grid items={items} />
    </View>
  );
};

export default Grids = ({ data, type }) => {
  const userId = getUserId();
  const date = getDate();
  const keys = Object.keys(data);

  return (
    <View>
      {keys.map((key, i) => {
        const path = `userData/${userId}/${type}/${date}/${key}`;
        return <GridContainer key={i} items={data[key]} path={path} />;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  rowHeaderText: {
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    margin: 20,
  },
  columnText: {},
  column: {
    flex: 1,
    alignItems: "center",
  },
});
