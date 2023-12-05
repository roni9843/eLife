import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  BackHandler,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import LoginNewScreen from "./AccountCreateNewScreen/LoginNewScreen";
import SignUpNewScreen from "./AccountCreateNewScreen/SignUpNewScreen";

const AccountCreate = ({ navigation }) => {
  // ? login or sign in state
  const [isSignIn, setIsSignIn] = useState(false);

  // useEffect(() => {
  //   // navigation.addListener("beforeRemove", (e) => {
  //   //   e.preventDefault();
  //   // });
  // }, [navigation]);

  // ** back handler
  useEffect(() => {
    const backAction = () => {
      navigation.navigate("LandingScreen");

      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: "white", height: "100%" }}
    >
      <StatusBar animated={true} backgroundColor="#FFFFFF" />
      <View>
        <View>
          {isSignIn == true ? (
            <SignUpNewScreen setIsSignIn={setIsSignIn} />
          ) : (
            <LoginNewScreen setIsSignIn={setIsSignIn} />
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default AccountCreate;
