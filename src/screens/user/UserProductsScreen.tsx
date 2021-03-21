import React from "react";
import { View, Text, StyleSheet, FlatList, Button, Platform, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { NavigationParams, NavigationScreenProp, NavigationState } from "react-navigation";

import ProductItem from "../../components/shop/ProductItem";
import HeaderButton from "../../components/common/HeaderButton";
import { RootState } from "../../store/reducers";
import COLORS from "../../constants/Colors";

import { deleteProduct } from "../../store/actions/products";

export interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  // navigation: any;
}

const UserProductsScreen = (props: Props): JSX.Element => {
  const userProducts = useSelector((state: RootState) => state.products.userProducts);
  const dispatch = useDispatch();

  const editProductHandler = (id: string) => {
    props.navigation.navigate("EditProduct", { productId: id });
  };

  const deleteHandler = (id: string) => {
    dispatch(deleteProduct(id));
  };

  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          imageUrl={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            editProductHandler(itemData.item.id);
          }}>
          <Button
            color={COLORS.PRIMARY}
            title="Edit"
            onPress={() => {
              editProductHandler(itemData.item.id);
            }}
          />
          <Button
            color={COLORS.PRIMARY}
            title="Delete"
            onPress={deleteHandler.bind(this, itemData.item.id)}
          />
        </ProductItem>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {},
});

UserProductsScreen.navigationOptions = (navData: any) => {
  return {
    headerTitle: "Your Products",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add"
          iconName={Platform.OS === "android" ? "md-create" : "ios-create"}
          onPress={() => {
            navData.navigation.navigate("EditProduct");
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default UserProductsScreen;
