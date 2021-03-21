import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";
import COLORS from "../../constants/Colors";
import CartItem from "../../components/shop/CartItem";
import { RootState } from "../../store/reducers";
import { removeFromCart } from "../../store/actions/cart";
import { addOrder } from "../../store/actions/orders";

export interface Props {}

const CartScreen = (props: Props): JSX.Element => {
  const totalAmount = useSelector((state: RootState) => state.cart.total);
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

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{" "}
          <Text style={styles.amount}>${Math.round(totalAmount.toFixed(2) * 100) / 100}</Text>
        </Text>
        <Button
          title="Order Now"
          color={COLORS.SECONDARY}
          disabled={cartItems.length === 0}
          onPress={() => {
            dispatch(addOrder(cartItems, totalAmount));
          }}
        />
      </View>

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
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
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
