import React, { useEffect, useState } from "react";
import { BackHandler, ScrollView, StyleSheet, View } from "react-native";
import Login from "./Login";
import SignIn from "./SignIn";

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
    <View style={Styles.container}>
      <ScrollView>
        <View>
          {isSignIn == true ? (
            <SignIn setIsSignIn={setIsSignIn} />
          ) : (
            <Login setIsSignIn={setIsSignIn} />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#040E29",
  },
});

export default AccountCreate;
