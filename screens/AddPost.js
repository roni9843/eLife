import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Textarea from "react-native-textarea";

import { ActivityIndicator } from "react-native-paper";
import IonIcon from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import {
  useStatusPostMutation,
  useUpdateOnePostMutation,
} from "../redux/apiSlice";
import { addStatusPost } from "../redux/userSlice";

const AddPost = ({ navigation, route }) => {
  // * redux store user
  const userInfo = useSelector((state) => state.userInfo);
  // ? redux dispatch
  const dispatch = useDispatch();

  const [currentTime, setCurrentTime] = useState(moment().format("DD-MM-YYYY"));

  const [userStatus, setUserStatus] = useState(
    route?.params?.status ? route?.params?.status : ""
  );

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(route.params);

    // Update the time every second
    const intervalId = setInterval(() => {
      setCurrentTime(moment().format("DD-MM-YYYY "));
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures that useEffect runs only once on mount

  const [statusPost] = useStatusPostMutation();
  const [updateOnePost] = useUpdateOnePostMutation();

  const submitStatus = async () => {
    setLoading(true);

    try {
      if (route?.params?.pageState === "update") {
        const payloadForUpdate = {
          id: route?.params?.postId,
          status: userStatus,
        };

        const data = await updateOnePost(payloadForUpdate);

        console.log(data);

        dispatch(addStatusPost(data.data.post));
        setLoading(false);
        navigation.goBack();
        //navigation.navigate("LandingScreen");
      } else {
        const payload = {
          postBy: route?.params?.userId,
          status: userStatus,
        };

        const data = await statusPost(payload);

        console.log("this is post ", data.data.posts);

        dispatch(addStatusPost(data.data.posts));

        setLoading(false);
        navigation.goBack();
      }
    } catch (error) {
      console.log(error);
    }

    //  navigation.navigate("LandingScreen");
    // navigation.goBack();
  };

  const submitTest = () => {
    console.log(route?.params?.pageState);
  };

  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          borderRadius: 10,
          borderWidth: 1,
          borderColor: "#E0E0E0",
          padding: 10,

          backgroundColor: "#FFFFFF",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.2,
          shadowRadius: 1.41,
          elevation: 2,
        }}
      >
        <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View>
              {route?.params?.userImage ? (
                <Image
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 100,
                  }}
                  source={{
                    // uri: image,
                    uri: route?.params?.userImage,
                  }}
                />
              ) : (
                <IonIcon
                  style={{
                    fontSize: 40,
                    color: "black",
                  }}
                  name={"person-circle-outline"}
                />
              )}
            </View>
            <View style={{ marginLeft: 5 }}>
              <View>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  {route?.params?.userName}
                </Text>
                <Text style={{ fontSize: 10, color: "gray" }}>
                  {route?.params?.timestamps
                    ? moment(route?.params?.timestamps).format("YYYY-MM-DD")
                    : currentTime}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{ marginTop: 5 }}>
          <Textarea
            autoFocus={true}
            containerStyle={styles.textareaContainer}
            style={styles.textarea}
            onChangeText={(e) => setUserStatus(e)}
            maxLength={120}
            defaultValue={userStatus}
            placeholder={"Share your thoughts, dear..."}
            placeholderTextColor={"#c7c7c7"}
            underlineColorAndroid={"transparent"}
          />

          <View style={{ marginTop: 10, alignItems: "flex-end" }}>
            <TouchableOpacity
              style={{
                borderRadius: 5,
                backgroundColor: "#040E29",
                padding: 10,
                width: 100,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => {
                submitStatus();
              }}
            >
              {loading === true ? (
                <View style={{ alignItems: "center" }}>
                  <ActivityIndicator size="small" color="white" />
                </View>
              ) : (
                <Text style={{ color: "white", fontSize: 16 }}>Post</Text>
              )}

              <IonIcon
                style={{
                  fontSize: 16,
                  color: "white",
                  marginLeft: 14,
                }}
                name={"send-sharp"}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default AddPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F8FB",
    padding: 5,
  },
  textareaContainer: {
    height: 180,
    padding: 5,
    backgroundColor: "#FFFFFF",
    borderBottomColor: "#040E29",
    borderBottomWidth: 1,
  },
  textarea: {
    textAlignVertical: "top", // hack android
    height: 170,
    fontSize: 14,
    color: "#333",
  },
});
