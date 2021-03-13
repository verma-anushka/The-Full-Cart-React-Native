import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";
import Product from "../../models/product";
import { RootState } from "../../store/reducers";

// export interface Props {}

// const ProductOverviewScreen: React.FC<Props> = (props) => {
const ProductOverviewScreen = ({}): JSX.Element => {
  const products = useSelector((state: RootState) => state.products.availableProducts);
  return (
    <View style={styles.container}>
      <Text>ProductOverviewScreen</Text>
      <FlatList
        data={products}
        keyExtractor={(item: Product) => item.id}
        renderItem={(itemData: any) => <Text>{itemData.item.title}</Text>}
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
