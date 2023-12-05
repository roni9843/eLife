import NetInfo from "@react-native-community/netinfo";
import React, { useEffect, useState } from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { useDispatch, useSelector } from "react-redux";
import { useGetAllStatusPostWithPaginationMutation } from "../redux/apiSlice";
import { addPostPaginationPage, addStatusPost } from "../redux/userSlice";

const LogOutScreen = ({ navigation }) => {
  const [animationStarted, setAnimationStarted] = useState(false);

  // * redux store user
  const userInfo = useSelector((state) => state.userInfo);

  let online = false;

  // ? check internet connection
  useEffect(() => {
    NetInfo.addEventListener((networkState) => {
      console.log("Is connected? - ", networkState.isConnected);

      online = networkState.isConnected;
    });
  }, []);

  // ? redux dispatch
  const dispatch = useDispatch();

  // ? animation na navigate
  useEffect(() => {
    callPostApi();
    // Start the animation after a delay or when some condition is met
    // setTimeout(() => {
    //   setAnimationStarted(true);
    // }, 1000);
  }, []);

  const [getAllStatusPostWithPagination] =
    useGetAllStatusPostWithPaginationMutation();

  const callPostApi = async () => {
    const payload = {
      page: userInfo.postPaginationPage,
    };

    const getAllPost = await getAllStatusPostWithPagination(payload);

    if (getAllPost.data?.message === "successful") {
      dispatch(addStatusPost(getAllPost.data?.allPosts));
      dispatch(addPostPaginationPage(getAllPost.data?.allPosts.length));

      // Navigate to the login screen after the animation finishes
      setTimeout(() => {
        navigation.navigate(online ? "LandingScreen" : "OfflineScreen");

        console.log("this is is user connect -> ", online);
      }, 5500);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="white" />
      {
        // animationStarted ? <AnimatedLogo /> : <Text>Loading...</Text>
      }
      <Text style={{ color: "white", fontSize: 25 }}>Log out</Text>
      <Text style={{ color: "white", marginTop: 30 }}>Loading...</Text>
    </View>
  );
};

// 19 : 12

const AnimatedLogo = () => {
  return (
    <Animatable.Image
      animation="bounceIn"
      duration={5000} // Adjust the duration as needed
      style={{ width: 114, height: 73 }}
      source={require("../assets/logo.png")}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#040E29",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    alignContent: "center",
  },
});

export default LogOutScreen;
