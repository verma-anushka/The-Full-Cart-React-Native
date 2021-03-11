import React from "react";
import { View, Text, StyleSheet } from "react-native";

export interface Props {}

const ProductOverviewScreen: React.FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <Text>ProductOverviewScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default ProductOverviewScreen;
