import React from "react";
import { useSelector } from "react-redux";
import { View, Text, StyleSheet, Platform } from "react-native";
import { RootState } from "../../store/reducers";
import { NavigationParams, NavigationScreenProp, NavigationState } from "react-navigation";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/common/HeaderButton";

interface Props {
  // navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const OrdersScreen = (props: Props): JSX.Element => {
  const orders = useSelector((state: RootState) => state.orders.orders);
  return (
    <View style={styles.container}>
      <Text>OrdersScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

OrdersScreen.navigationOptions = (navData: any) => {
  // console.log(typeof navData);
  // console.log(navData);

  return {
    headerTitle: "Your Orders",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default OrdersScreen;
