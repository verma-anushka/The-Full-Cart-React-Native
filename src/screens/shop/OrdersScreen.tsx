import React from "react";
import { View, Text, StyleSheet } from "react-native";

export interface Props {}

const OrdersScreen: React.FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <Text>OrdersScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default OrdersScreen;
