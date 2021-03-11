import React from "react";
import { View, Text, StyleSheet } from "react-native";

export interface Props {}

const CreateEditProductScreen: React.FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <Text>CreateEditProductScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default CreateEditProductScreen;
