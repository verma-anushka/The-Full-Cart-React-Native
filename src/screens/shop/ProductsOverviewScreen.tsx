import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Product from "../../models/product";
import { RootState } from "../../store/reducers";
// import { NavigationParams, NavigationScreenProp, NavigationState } from "react-navigation";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/common/HeaderButton";
import ProductItem from "../../components/shop/ProductItem";
import { addToCart } from "../../store/actions/cart";

import COLORS from "../../constants/Colors";
import { getProducts } from "../../store/actions/products";
interface Props {
  // navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

// const ProductOverviewScreen: React.FC<Props> = (props) => {
const ProductOverviewScreen = (props: any): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const products = useSelector((state: RootState) => state.products.availableProducts);
  const dispatch = useDispatch();

  const loadProducts = useCallback(async () => {
    setError("");
    setIsLoading(true);
    try {
      await dispatch(getProducts());
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // drawer navigation stores screens in memory,
  // therefore does not re render when we go to another screen inside the drawer navigation
  // to ensure re fetching of data everytime we come to this screen: add an event listener
  // works only on re-renders, not on initial render
  useEffect(() => {
    const willFocusRerender = props.navigation.addListener("willFocus", loadProducts);

    // cleanup code -> when component is destroyed, when this useEffect re runs
    return () => {
      willFocusRerender.remove();
    };
  }, [loadProducts]);

  const selectItemHandler = (id: string, title: string) => {
    props.navigation.navigate("ProductDetail", {
      productId: id,
      productTitle: title,
    });
  };

  if (error !== "") {
    return (
      <View style={styles.centered}>
        <Text>{error}</Text>
        <Button title="Try Again!" color={COLORS.PRIMARY} onPress={loadProducts} />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.PRIMARY} />
      </View>
    );
  }

  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No products found!</Text>
      </View>
    );
  }

  return (
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
  );
};

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
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
