import React from "react";
import { Platform } from "react-native";
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";

import COLORS from "../../constants/Colors";

interface Props {
  title: string;
}

const CustomHeaderButton = (props: Props): JSX.Element => {
  // const CustomHeaderButton: React.FC<> = () => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
      color={Platform.OS === "android" ? COLORS.WHITE : COLORS.PRIMARY}
    />
  );
};

export default CustomHeaderButton;
