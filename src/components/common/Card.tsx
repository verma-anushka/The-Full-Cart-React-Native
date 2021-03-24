import React from "react";
import { View, StyleSheet } from "react-native";
import COLORS from "../../constants/Colors";

interface Props {
  style: object;
  children: any;
}

const Card = (props: Props): JSX.Element => {
  return <View style={{ ...styles.card, ...props.style }}>{props.children}</View>;
};

const styles = StyleSheet.create({
  card: {
    shadowColor: COLORS.BLACK,
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: COLORS.WHITE,
  },
});

export default Card;
