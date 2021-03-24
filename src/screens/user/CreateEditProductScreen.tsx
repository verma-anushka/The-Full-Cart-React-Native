import React, { useState, useEffect, useCallback } from "react";
import { View, ScrollView, Text, TextInput, StyleSheet, Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";
import { NavigationParams, NavigationScreenProp, NavigationState } from "react-navigation";

import HeaderButton from "../../components/common/HeaderButton";
import { editProduct, createProduct } from "../../store/actions/products";
import { RootState } from "../../store/reducers";

export interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const CreateEditProductScreen = (props: Props): JSX.Element => {
  const prodId = props.navigation.getParam("productId");
  const editedProduct = useSelector((state: RootState) =>
    state.products.userProducts.find((product) => product.id === prodId),
  );
  const dispatch = useDispatch();

  const [title, setTitle] = useState(editedProduct ? editedProduct.title : "");
  const [imageUrl, setImageUrl] = useState(editedProduct ? editedProduct.imageUrl : "");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState(editedProduct ? editedProduct.description : "");

  const submitHandler = useCallback(() => {
    if (editedProduct) {
      dispatch(editProduct(prodId, title, description, imageUrl));
    } else {
      dispatch(createProduct(title, description, imageUrl, +price));
    }
    props.navigation.goBack();
  }, [dispatch, prodId, title, description, imageUrl, price]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Product Title</Text>
          <TextInput style={styles.input} value={title} onChangeText={(text) => setTitle(text)} />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={(text) => setImageUrl(text)}
          />
        </View>
        {editedProduct ? null : (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput style={styles.input} value={price} onChangeText={(text) => setPrice(text)} />
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
        </View>
      </View>
    </ScrollView>
  );
};

CreateEditProductScreen.navigationOptions = (navData: any) => {
  const submitFn = navData.navigation.getParam("submit");
  return {
    headerTitle: navData.navigation.getParam("productId") ? "Edit Product" : "Add Product",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Save"
          iconName={Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"}
          onPress={submitFn}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  formControl: {
    width: "100%",
  },
  label: {
    fontFamily: "openSansBold",
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
});

export default CreateEditProductScreen;
