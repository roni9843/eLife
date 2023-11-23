import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetAllStatusPostWithPaginationMutation,
  useGetOneUserMutation,
} from "../redux/apiSlice";
import {
  addCurrentUser,
  addPostPaginationPage,
  addStatusPost,
} from "../redux/userSlice";
import isUserLogged from "../services/isUserLogged";
import StackNavi from "../stackNavi/StackNavi";
import clearUserInfo from "./../services/clearUserInfo";

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  // ? redux dispatch
  const dispatch = useDispatch();

  const [login, _setLogin] = useState(true);

  // * redux store user
  const userInfo = useSelector((state) => state.userInfo);

  // ? get all user by id
  const [getOneUser] = useGetOneUserMutation();

  // ? get all post with there reaction and with there react api
  //***** */ const { data: getAllStatusPost } = useGetAllStatusPostQuery();

  const [getAllStatusPostWithPagination] =
    useGetAllStatusPostWithPaginationMutation();

  // ? add post to state
  // useEffect(() => {
  //   if (getAllStatusPostWithPagination?.message === "successful") {
  //     dispatch(addStatusPost(getAllStatusPostWithPagination.posts));
  //   }
  // }, [getAllStatusPost]);

  useEffect(() => {
    callPostApi();
  }, []);

  const callPostApi = async () => {
    const payload = {
      page: userInfo.postPaginationPage,
    };

    const getAllPost = await getAllStatusPostWithPagination(payload);

    console.log("this is all  getAllPost - 78 -> ", getAllPost);

    if (getAllPost.data?.message === "successful") {
      dispatch(addStatusPost(getAllPost.data?.allPosts));

      dispatch(addPostPaginationPage(1));
    }
  };

  useEffect(() => {
    isUserLoggedFunc();
  }, []);

  // ? func is user logged
  const isUserLoggedFunc = async () => {
    const asyncStoreResult = await isUserLogged(); // ^ return value object or null

    // ? if token found
    if (asyncStoreResult !== null) {
      const payload = {
        id: asyncStoreResult.userId,
      };

      const thisUser = await getOneUser(payload);
      dispatch(addCurrentUser(thisUser.data));
    }
  };

  useEffect(() => {
    login === false &&
      clearUserInfo().then((e) => console.log("this is clear -> ", e));
  }, []);

  return (
    <View style={styles.container}>
      <StackNavi></StackNavi>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default BottomTabs;

<Tab.Navigator>
  <Tab.Screen
    options={{
      gestureEnabled: true,
      tabBarIcon: null,
      headerShown: false,

      tabBarOptions: {
        visible: false,
      },
      tabBarStyle: {
        display: "none",
      },
    }}
    screenOptions={{
      tabBarIconStyle: { backgroundColor: "red", color: "red" },
    }}
    name="Home"
    component={StackNavi}
  />
</Tab.Navigator>;
