import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import { Platform } from "react-native";

import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import COLORS from "../constants/Colors";

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === "android" ? COLORS.PRIMARY : "",
      },
      headerTitleStyle: {
        fontFamily: "openSansBold",
      },
      headerBackTitleStyle: {
        fontFamily: "openSans",
      },
      headerTintColor: Platform.OS === "android" ? COLORS.WHITE : COLORS.PRIMARY,
    },
  },
);

export default createAppContainer(ProductsNavigator);
