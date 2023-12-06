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
import VerifyIcon from "react-native-vector-icons/MaterialIcons";

import { ActivityIndicator } from "react-native-paper";
import IonIcon from "react-native-vector-icons/Ionicons";
import ProfileIcon from "react-native-vector-icons/SimpleLineIcons";
import { useDispatch, useSelector } from "react-redux";
import {
  useStatusPostMutation,
  useUpdateOnePostMutation,
} from "../redux/apiSlice";
import {
  addLatestPost,
  addPostPaginationPage,
  updatePost,
} from "../redux/userSlice";

const AddPost = ({ navigation, route }) => {
  // * redux store user
  const userInfo = useSelector((state) => state.userInfo);
  // ? redux dispatch
  const dispatch = useDispatch();

  const [currentTime, setCurrentTime] = useState(moment().format("DD-MM-YYYY"));

  //  const { data: getAllStatusPost, refetch } = useGetAllStatusPostQuery();

  const [userStatus, setUserStatus] = useState(
    route?.params?.status ? route?.params?.status : ""
  );

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);

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
      if (!userStatus.trim()) {
        setError("Please enter something before submitting.");
        setLoading(false);
        return;
      }

      // Reset the error state when user input is not empty
      setError(null);

      try {
        if (route?.params?.pageState === "update") {
          const payloadForUpdate = {
            id: route?.params?.postId,
            status: userStatus,
          };

          const data = await updateOnePost(payloadForUpdate);
          /// await refetch();

          console.log("this update res data -> ", data.data.post[0]);

          dispatch(updatePost(data.data.post[0]));

          //navigation.navigate("LandingScreen");

          setTimeout(() => {
            navigation.navigate("LandingScreen");

            //      console.log("5---> ", getAllStatusPost.posts);
            navigation.goBack();
            setLoading(false);
          }, 0);
        } else {
          const payload = {
            postBy: route?.params?.userId,
            status: userStatus,
          };

          const data = await statusPost(payload);

          console.log("this is post 9833 ->  ", data.data.posts);

          dispatch(addLatestPost(data.data.posts));
          dispatch(addPostPaginationPage(1));

          //await refetch();

          setTimeout(() => {
            // navigation.navigate("LandingScreen");

            //   console.log("5---> ", getAllStatusPost.posts);
            navigation.goBack();
            setLoading(false);
          }, 0);
        }
      } catch (error) {
        console.log(error);
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

  // ? add post to state
  // useEffect(() => {
  //   if (getAllStatusPost?.message === "successful") {
  //     dispatch(addStatusPost(getAllStatusPost.posts));
  //   }
  // }, [getAllStatusPost]);

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
                  source={{
                    // uri: image,
                    uri: route?.params?.userImage,
                  }}
                  style={styles.userImage}
                />
              ) : (
                <View
                  style={{
                    // backgroundColor: "green",
                    borderRadius: 50,
                    borderWidth: 2,
                    borderColor: "#040E29",
                    padding: 4,
                    backgroundColor: "#040E29",
                    marginRight: 5,
                    width: 40,
                    height: 40,
                    borderRadius: 25, // Make it round
                    marginRight: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ProfileIcon
                    name="user"
                    size={20}
                    color="white"
                    style={
                      {
                        // backgroundColor: "green",
                      }
                    }
                  />
                </View>
              )}
            </View>
          </View>
          <View style={styles.textContainer}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View>
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      // justifyContent: "center",
                      alignContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={styles.userName}>
                      {route?.params?.userName}
                    </Text>

                    {userInfo?.verified === true && (
                      <View style={{ marginLeft: 10 }}>
                        <VerifyIcon
                          name="verified-user"
                          size={18}
                          color="#040E29"
                          style={
                            {
                              // backgroundColor: "green",
                            }
                          }
                        />
                      </View>
                    )}
                  </View>
                </View>

                <Text style={styles.time}>
                  {" "}
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

          {error && (
            <Text style={{ color: "red", marginBottom: 5 }}>{error}</Text>
          )}
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
  postContainer: {
    flexDirection: "row",
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 25, // Make it round
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  time: {
    fontSize: 12,
    color: "#888888",
  },
});
