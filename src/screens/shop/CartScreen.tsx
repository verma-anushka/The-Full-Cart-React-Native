import React from "react";
import { View, Text, StyleSheet } from "react-native";

export interface Props {}

const CartScreen: React.FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <Text>CartScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default CartScreen;
