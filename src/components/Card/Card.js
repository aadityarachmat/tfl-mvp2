import React from "react";
import { StyleSheet, View, Text, Button, Alert, Image } from "react-native";

import PropTypes from "prop-types";

import {
  setData,
  deleteData,
  deleteImage,
  uploadImage,
  getData,
  getImageURI,
} from "../../helperfns/firebaseHelpers";

import AddItemField from "./AddItemField";
import CardCamera from "./CardCamera";
import CardItems from "./CardItems";
import Header from "./Header";
import { pickPhoto, takePhoto } from "../../helperfns/Camera";
import CardOptionsView from "./CardOptionsView";

const filterObject = (obj, filterProperty) => {
  let result = {};
  for (key in obj) {
    if (obj[key][filterProperty]) {
      result[key] = obj[key];
    }
  }
  return result;
};

const getUpdatedItems = (items, itemsSelected) => {
  let result = { ...items };
  for (key in itemsSelected) {
    result[key] = itemsSelected[key];
  }
  return result;
};

class Card extends React.Component {
  state = {
    uri: "",
    items: {},
    newItem: "",
    minimized: false,
  };

  componentDidMount() {
    if (this.props.items) {
      this.setState({ items: this.props.items }, () =>
        this.updateSelectedItems()
      );
    }
  }

  updateSelectedItems = async () => {
    const { itemsPath, imagesPath } = this.props;
    const itemsSelected = await getData(itemsPath);
    const imageSelected = await getImageURI(imagesPath);
    if (imageSelected) {
      this.setState({ uri: imageSelected });
    }
    if (itemsSelected) {
      const updatedItems = getUpdatedItems(this.state.items, itemsSelected);
      this.setState({ items: updatedItems });
    }
  };

  getPhoto = () => {
    Alert.alert(
      "Pilih metode",
      "untuk mengupload foto",
      [
        {
          text: "Pilih dari camera roll",
          onPress: async () => {
            uri = await pickPhoto();
            this.setState({ uri });
          },
        },
        {
          text: "Ambil foto",
          onPress: async () => {
            uri = await takePhoto();
            this.setState({ uri });
          },
        },
        { text: "Cancel" },
      ],
      { cancelable: true }
    );
  };

  toggleSelected = (item) => {
    const items = { ...this.state.items };
    const previouslySelected = items[item].selected;
    items[item] = { ...items[item], selected: !previouslySelected };
    this.setState({ items });
  };

  toggleMinimized = () => {
    this.setState((prevState) => ({ minimized: !prevState.minimized }));
  };

  addItem = () => {
    const { newItem } = this.state;
    const items = {
      ...this.state.items,
      [newItem]: { value: newItem, selected: false },
    };
    this.setState({ items });
  };

  handleAddItemFieldChange = (newItem) => {
    this.setState({ newItem });
  };

  submit = () => {
    const { itemsPath, imagesPath } = this.props;
    const { items, uri } = this.state;
    const filteredItems = filterObject(items, "selected");
    setData(itemsPath, filteredItems);
    if (uri) uploadImage(imagesPath, uri);
    alert("Uploaded");
  };

  delete = () => {
    const { itemsPath, imagesPath } = this.props;
    deleteData(itemsPath);
    deleteImage(imagesPath);
    alert("Deleted");
  };

  render() {
    const { uri, items, newItem, minimized } = this.state;
    console.log("uri", uri);
    return (
      <View style={styles.card}>
        <Header
          title={this.props.title}
          toggleMinimized={this.toggleMinimized}
          minimized={minimized}
        />
        {!minimized && (
          <View>
            <CardOptionsView
              getPhoto={this.getPhoto}
              submit={this.submit}
              delete={this.delete}
            />
            {uri !== "" && <Image source={{ uri: uri }} style={styles.image} />}
            <CardItems items={items} toggleSelected={this.toggleSelected} />
            <AddItemField
              value={newItem}
              onChangeText={(text) => this.handleAddItemFieldChange(text)}
              addItem={() => this.addItem()}
            />
          </View>
        )}
      </View>
    );
  }
}

export default Card;

Card.propTypes = {
  title: PropTypes.string,
  items: PropTypes.objectOf(
    PropTypes.shape({ value: PropTypes.string, selected: PropTypes.bool })
  ),
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    margin: 10,
    borderRadius: 20,
  },
  image: {
    height: 300,
    width: 300,
    borderRadius: 20,
    alignSelf: "center",
    margin: 20,
  },
});
