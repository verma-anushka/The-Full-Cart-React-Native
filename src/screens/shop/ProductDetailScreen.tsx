import React from "react";
import { View, Text, StyleSheet } from "react-native";

export interface Props {}

const ProductDetailScreen: React.FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <Text>ProductDetailScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default ProductDetailScreen;
