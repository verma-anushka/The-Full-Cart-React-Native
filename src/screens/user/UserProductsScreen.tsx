import React from "react";
import { View, Text, StyleSheet } from "react-native";

export interface Props {}

const UserProductsScreen: React.FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <Text>UserProductsScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default UserProductsScreen;
