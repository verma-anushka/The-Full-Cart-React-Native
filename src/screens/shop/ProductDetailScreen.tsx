import React from "react";
import { ScrollView, View, Text, Image, Button, StyleSheet } from "react-native";
import { NavigationParams, NavigationScreenProp, NavigationState } from "react-navigation";
import { RootState } from "../../store/reducers";
import { useSelector, useDispatch } from "react-redux";
import COLORS from "../../constants/Colors";
import { addToCart } from "../../store/actions/cart";
interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const ProductDetailScreen = (props: Props): JSX.Element => {
  const productId = props.navigation.getParam("productId");
  const selectedProduct = useSelector((state: RootState) =>
    state.products.availableProducts.find((product) => product.id === productId),
  );
  const dispatch = useDispatch();

  return (
    <ScrollView>
      {selectedProduct && (
        <React.Fragment>
          <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
          <View style={styles.actions}>
            <Button
              color={COLORS.PRIMARY}
              title="Add to Cart"
              onPress={() => {
                dispatch(addToCart(selectedProduct));
              }}
            />
          </View>
          <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
          <Text style={styles.description}>{selectedProduct.description}</Text>
        </React.Fragment>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
  actions: {
    marginVertical: 10,
    alignItems: "center",
  },
  price: {
    fontSize: 20,
    color: "#888",
    textAlign: "center",
    marginVertical: 20,
    fontFamily: "openSansBold",
  },
  description: {
    fontFamily: "openSans",
    fontSize: 14,
    textAlign: "center",
    marginHorizontal: 20,
  },
});

ProductDetailScreen.navigationOptions = (navData: Props) => {
  // console.log(typeof navData);
  // console.log(navData);

  return {
    headerTitle: navData.navigation.getParam("productTitle"),
  };
};

export default ProductDetailScreen;
