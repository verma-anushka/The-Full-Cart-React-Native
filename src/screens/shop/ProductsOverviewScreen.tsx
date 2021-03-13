import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";

export interface Props {}

const ProductOverviewScreen: React.FC<Props> = (props) => {
  // console.log();
  // state.products.availableProducts
  const products = useSelector((state) => console.log(state));
  return (
    <View style={styles.container}>
      <Text>ProductOverviewScreen</Text>

      {/* <FlatList data={[]} keyExtractor={(item) => item.id} renderItem={itemData => <Text>{itemData.item.title}</Text>} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default ProductOverviewScreen;
