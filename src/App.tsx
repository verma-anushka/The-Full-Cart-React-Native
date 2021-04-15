import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import store from "./store";

import AppLoading from "expo-app-loading";
// import { AppLoading } from "expo";
// import * as Font from "expo-font";
import { useFonts } from "expo-font";

// import Navigator from "./navigation";
import NavigationContainer from "./navigation/NavigationContainer";

// const fetchFonts = () => {
//   return Font.loadAsync({
//     openSans: require("./assets/fonts/OpenSans-Regular.ttf"),
//     openSansBold: require("./assets/fonts/OpenSans-Bold.ttf"),
//   });
// };

export default function App() {
  // const [fontLoaded, setFontLoaded] = useState(false);

  // if (!fontLoaded) {
  //   return (
  //     <AppLoading
  //       startAsync={fetchFonts}
  //       onFinish={() => setFontLoaded(true)}
  //       onError={console.warn}
  //     />
  //   );
  // }

  // let [fontsLoaded] = useFonts({
  //   "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
  //   "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  // });
  // if (!fontsLoaded) {
  //   return <AppLoading />;
  // }

  return (
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
