import React from "react";

import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";

import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import COLORS from "../constants/Colors";
import CartScreen from "../screens/shop/CartScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import UserProductsScreen from "../screens/user/UserProductsScreen";
import CreateEditProductScreen from "../screens/user/CreateEditProductScreen";
import AuthScreen from "../screens/user/AuthScreen";

const defaultNavOptions = {
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
};

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig: any) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  },
);

const OrdersNavigator = createStackNavigator(
  {
    Orders: OrdersScreen,
  },
  {
    navigationOptions: {
      drawerIcon: ({ tintColor }: { tintColor: string }) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-list" : "ios-list"}
          size={23}
          color={tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  },
);

const AdminNavigator = createStackNavigator(
  {
    UserProduct: UserProductsScreen,
    EditProduct: CreateEditProductScreen,
  },
  {
    navigationOptions: {
      drawerIcon: ({ tintColor }: { tintColor: string }) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-create" : "ios-create"}
          size={23}
          color={tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  },
);

const ShopNavigator = createDrawerNavigator(
  {
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
    Admin: AdminNavigator,
  },
  {
    contentOptions: {
      activeTintColor: COLORS.PRIMARY,
    },
  },
);

const AuthNavigator = createStackNavigator(
  {
    Auth: AuthScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  },
);

const HomeNavigator = createSwitchNavigator({
  // Startup: StartupScreen,
  Auth: AuthNavigator,
  Shop: ShopNavigator,
});

export default createAppContainer(HomeNavigator);
