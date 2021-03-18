import React from "react";
import { View, StyleSheet, FlatList, Platform } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Product from "../../models/product";
import { RootState } from "../../store/reducers";
import { NavigationParams, NavigationScreenProp, NavigationState } from "react-navigation";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/common/HeaderButton";
import ProductItem from "../../components/shop/ProductItem";
import { addToCart } from "../../store/actions/cart";
interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

// const ProductOverviewScreen: React.FC<Props> = (props) => {
const ProductOverviewScreen = (props: Props): JSX.Element => {
  const products = useSelector((state: RootState) => state.products.availableProducts);
  const dispatch = useDispatch();

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
            onViewDetail={() =>
              props.navigation.navigate("ProductDetail", {
                productId: itemData.item.id,
                productTitle: itemData.item.title,
              })
            }
            onAddToCart={() => {
              dispatch(addToCart(itemData.item));
            }}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

ProductOverviewScreen.navigationOptions = (navData: Props) => {
  return {
    headerTitle: "All Products!",
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
