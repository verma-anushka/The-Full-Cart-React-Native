import React, { useState, useEffect } from "react";
import { View, Text, Alert, Button, StyleSheet, ActivityIndicator } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";
import COLORS from "../../constants/Colors";
import CartItem from "../../components/shop/CartItem";
import { RootState } from "../../store/reducers";
import { removeFromCart } from "../../store/actions/cart";
import { addOrder } from "../../store/actions/orders";
import Card from "../../components/common/Card";

export interface Props {}

const CartScreen = (props: Props): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const totalAmount: number = useSelector((state: RootState) => state.cart.total);
  const cartItems: any = useSelector((state: RootState) => {
    const transformedCartItems = [];

    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }

    // console.log(transformedCartItems);
    return transformedCartItems.sort((a, b) => (a.productId > b.productId ? 1 : -1));
  });

  const dispatch = useDispatch();
  useEffect(() => {
    if (error !== "") {
      Alert.alert("Something went wrong!", error, [{ text: "Okay!" }]);
    }
  }, [error]);

  const sendOrderHandler = async () => {
    setError("");
    setIsLoading(true);
    try {
      await dispatch(addOrder(cartItems, totalAmount));
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  };

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{" "}
          <Text style={styles.amount}>${Math.round(+totalAmount.toFixed(2) * 100) / 100}</Text>
        </Text>
        {isLoading ? (
          <ActivityIndicator size="small" color={COLORS.PRIMARY} />
        ) : (
          <Button
            title="Order Now"
            color={COLORS.SECONDARY}
            disabled={cartItems.length === 0}
            onPress={sendOrderHandler}
          />
        )}
      </Card>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.productId}
        renderItem={(itemData) => (
          <CartItem
            quantity={itemData.item.quantity}
            title={itemData.item.productTitle}
            amount={itemData.item.sum}
            deletable
            onRemove={() => {
              dispatch(removeFromCart(itemData.item.productId));
            }}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
  },
  summaryText: {
    fontFamily: "openSansBold",
    fontSize: 18,
  },
  amount: {
    color: COLORS.PRIMARY,
  },
});

CartScreen.navigationOptions = () => {
  return {
    headerTitle: "Your Cart",
  };
};

export default CartScreen;
