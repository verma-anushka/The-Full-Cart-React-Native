import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { NavigationActions } from "react-navigation";
import { RootState } from "../store/reducers";

import ShopNavigator from "./index";
import { NavigationParams, NavigationScreenProp, NavigationState } from "react-navigation";

export interface Props {
  //   navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const NavigationContainer = (props: Props): JSX.Element => {
  const navRef: any = useRef();
  const isAuth = useSelector((state: RootState) => !!state.auth.token);

  useEffect(() => {
    if (!isAuth) {
      navRef.current.dispatch(NavigationActions.navigate({ routeName: "Auth" }));
    }
  }, [isAuth]);

  return <ShopNavigator ref={navRef} />;
};

export default NavigationContainer;
