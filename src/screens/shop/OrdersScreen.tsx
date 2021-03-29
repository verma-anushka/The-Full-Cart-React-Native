import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Platform,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { RootState } from "../../store/reducers";
import { NavigationParams, NavigationScreenProp, NavigationState } from "react-navigation";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/common/HeaderButton";
import OrderItem from "../../components/shop/OrderItem";
import { getOrders } from "../../store/actions/orders";
import COLORS from "../../constants/Colors";

interface Props {
  // navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const OrdersScreen = (props: Props): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const orders = useSelector((state: RootState) => state.orders.orders);

  const dispatch = useDispatch();

  const loadOrders = useCallback(async () => {
    setError("");
    setIsLoading(true);
    try {
      await dispatch(getOrders());
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    loadOrders();
  }, [dispatch]);

  if (error !== "") {
    return (
      <View style={styles.centered}>
        <Text>{error}</Text>
        <Button title="Try Again!" color={COLORS.PRIMARY} onPress={loadOrders} />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.PRIMARY} />
      </View>
    );
  }

  if (!isLoading && orders.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No orders found!</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={orders}
      keyExtractor={(item: any) => item.id}
      renderItem={(itemData) => (
        <OrderItem
          amount={itemData.item.totalAmount}
          date={itemData.item.readableDate}
          items={itemData.item.items}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
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
