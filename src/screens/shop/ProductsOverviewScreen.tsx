import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";
import Product from "../../models/product";
import { RootState } from "../../store/reducers";

import ProductItem from "../../components/shop/ProductItem";

// export interface Props {}

// const ProductOverviewScreen: React.FC<Props> = (props) => {
const ProductOverviewScreen = (props: any): JSX.Element => {
  const products = useSelector((state: RootState) => state.products.availableProducts);
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
            onAddToCart={() => {}}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

ProductOverviewScreen.navigationOptions = {
  headerTitle: "All Products!",
};

export default ProductOverviewScreen;
