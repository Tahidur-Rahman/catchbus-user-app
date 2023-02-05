import React, { useEffect, useState } from "react";
import { View } from "react-native";
import * as Font from "expo-font";
import { useDispatch } from "react-redux";
import { useGetMeQuery } from "../redux/features/api/authApi";
import { setUser } from "../redux/features/rootSlice";
import {getData} from '../utils/AsyncStorageManager'

export default function LoadingScreen({ navigation }) {
  const dispatch = useDispatch();
  const [authToken, setAuthToken] = useState("");
  const { data, isLoading, error } = useGetMeQuery(authToken);

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        SF_Compact_Display_Regular: require("../assets/fonts/SF-Compact-Display-Regular.ttf"),
        SF_Compact_Display_Medium: require("../assets/fonts/SF-Compact-Display-Medium.ttf"),
        SF_Compact_Display_SemiBold: require("../assets/fonts/SF-Compact-Display-Semibold.ttf"),
        SF_Compact_Display_Bold: require("../assets/fonts/SF-Compact-Display-Bold.ttf"),
        SF_Compact_Display_Light: require("../assets/fonts/SF-Compact-Display-Light.ttf"),
        SF_Compact_Display_UltraLight: require("../assets/fonts/SF-Compact-Display-Ultralight.ttf"),
        SF_Compact_Display_Black: require("../assets/fonts/SF-Compact-Display-Black.ttf"),
        Gidugu_Regular: require("../assets/fonts/Gidugu-Regular.ttf"),
      });
      getData("token")
        .then((value) => setAuthToken(value))
        .catch((err) => {
          navigation.navigate("Splash");
        });
      if (data?.user) {
        navigation.navigate("Home");
        dispatch(setUser(data?.user));
      }
      if (error || !authToken || !data?.user) {
        navigation.navigate("Splash");
      }
      navigation.navigate("Splash");
    }
    loadFont();
  }, []);

  return <View style={{ flex: 1, backgroundColor: "white" }}></View>;
}
