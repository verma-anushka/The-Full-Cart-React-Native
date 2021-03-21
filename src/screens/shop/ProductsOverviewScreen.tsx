import React from "react";
import { View, StyleSheet, Button, FlatList, Platform } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Product from "../../models/product";
import { RootState } from "../../store/reducers";
// import { NavigationParams, NavigationScreenProp, NavigationState } from "react-navigation";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/common/HeaderButton";
import ProductItem from "../../components/shop/ProductItem";
import { addToCart } from "../../store/actions/cart";

import COLORS from "../../constants/Colors";
interface Props {
  // navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

// const ProductOverviewScreen: React.FC<Props> = (props) => {
const ProductOverviewScreen = (props: any): JSX.Element => {
  const products = useSelector((state: RootState) => state.products.availableProducts);
  const dispatch = useDispatch();

  const selectItemHandler = (id: string, title: string) => {
    props.navigation.navigate("ProductDetail", {
      productId: id,
      productTitle: title,
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item: Product) => item.id}
        renderItem={(itemData: any) => (
          <ProductItem
            imageUrl={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            onSelect={() => selectItemHandler(itemData.item.id, itemData.item.title)}>
            <Button
              color={COLORS.PRIMARY}
              title="View Details"
              onPress={() => selectItemHandler(itemData.item.id, itemData.item.title)}
            />
            <Button
              color={COLORS.PRIMARY}
              title="To Cart"
              onPress={() => {
                dispatch(addToCart(itemData.item));
              }}
            />
          </ProductItem>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

ProductOverviewScreen.navigationOptions = (navData: any) => {
  return {
    headerTitle: "All Products!",
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
          title="Cart"
          iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          onPress={() => {
            navData.navigation.navigate("Cart");
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default ProductOverviewScreen;
