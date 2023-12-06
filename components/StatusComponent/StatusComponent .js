import { BlurView } from "expo-blur";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Modal,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";

import VerifyIcon from "react-native-vector-icons/MaterialIcons";
import ProfileIcon from "react-native-vector-icons/SimpleLineIcons";

import { useDispatch } from "react-redux";
import {
  useCreatePostReactionMutation,
  useDeleteOnePostMutation,
  useDeletePostReactionMutation,
} from "../../redux/apiSlice";

import { Audio } from "expo-av";
import { removePost } from "../../redux/userSlice";

const StatusComponent = ({
  userName,
  time,
  statusText,
  userImage,
  navigation,
  isMenuShow,
  reaction,
  item,
  userId,
  postId,
  userInfo,
  reDirect,
  getAllPostFunc,
  userPosts,
  setUserPosts,
  route,
}) => {
  useEffect(() => {
    console.log(statusText, " 1 this is post reaction all   -> ", reaction);
  }, [reaction]);

  const [timeAgo, setTimeAgo] = useState("");

  const sound = new Audio.Sound();

  useEffect(() => {
    const updateRelativeTime = () => {
      const timeString = moment(time).fromNow();
      setTimeAgo(timeString);
    };

    updateRelativeTime(); // Initial update

    // Update the relative time every minute
    const intervalId = setInterval(updateRelativeTime, 60000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [time]);

  const [isThisUserLikeThisPost, setIsThisUserLikeThisPost] = useState(false);

  const [reactionId, setReactionId] = useState("");

  const [likeCount, setLikeCount] = useState(0);

  const [likeData, setLikeData] = useState([]);

  useEffect(() => {
    if (reaction[0].user[0]) {
      setLikeCount(reaction.length);

      isThisUserLikeThisPostLocalFunc().then((e) => {
        // {
        //   e === undefined
        //     ? setLikeCount(reaction.length)
        //     : setLikeCount(reaction[0].user.length);
        // }

        setLikeData(reaction);

        setIsThisUserLikeThisPost(Boolean(e));

        if (userId) {
          userId && setReactionId(e._id);
        }
      });
    } else {
      setIsThisUserLikeThisPost(false);
      console.log("outside");
      setLikeCount(0);
    }
  }, [reaction, route]);

  const alertFunc = () => {
    Alert.alert(
      "Confirmation",
      "Are you sure you want to delete status?",
      [
        {
          text: "Cancel",
          style: "cancel",
          onPress: () => {
            // navigation.navigate(optionOneNavigatefetchForAllUserAndAllStatusData);
            closeModal();
          },
        },
        {
          text: "Delete",
          style: "destructive",
          // If the user confirmed, then we dispatch the action we blocked earlier
          // This will continue the action that had triggered the removal of the screen
          onPress: () => deleteThisStatus(),
        },
      ]
      // { cancelable: false }
    );
  };

  const isThisUserLikeThisPostLocalFunc = async () => {
    const isThisUserLikeThisPostLocalV = await reaction.find(
      (dt) => dt.reactId == userId
    );

    console.log(
      "6666666666666666666666666666666666666666666666666666666666 ",
      isThisUserLikeThisPostLocalV
    );
    console.log(
      "6666666666666666666666666666666666666666666666666666666666 ",
      reaction
    );

    return isThisUserLikeThisPostLocalV;
  };

  const [deleteOnePost] = useDeleteOnePostMutation();

  // ? delete loading
  const [deleteLoading, setDeleteLoading] = useState(false);

  // ? redux dispatch
  const dispatch = useDispatch();

  const deleteThisStatus = async () => {
    try {
      setDeleteLoading(true);
      dispatch(removePost(item._id));

      const data = await deleteOnePost({
        id: item._id,
      });

      console.log("delete -> ", data);

      closeModal();
      setDeleteLoading(false);

      if (userPosts) {
        const filter = userPosts.filter((dt) => dt._id !== item._id);

        setUserPosts(filter);
      }

      //  dispatch(addStatusPost(data.data.post));
      // Optionally, you can perform additional actions after a successful deletion
    } catch (error) {
      // Handle error, e.g., show an alert
      console.error("Error deleting user:", error);
    }
  };

  const [createPostReaction] = useCreatePostReactionMutation();
  const [deletePostReaction] = useDeletePostReactionMutation();

  const submitLike = async (isThisUserLikeThisPost) => {
    console.log("this is ", isThisUserLikeThisPost);

    // ? add like
    if (isThisUserLikeThisPost === false) {
      console.log("this is create reaction ", likeCount + 1);

      setLikeCount(likeCount + 1);

      //  setIsThisUserClickLike(!isThisUserClickLike);
      playSound();
      const payload = {
        reactionId: 1,
        postId: postId,
        reactId: userId,
      };

      try {
        setIsThisUserLikeThisPost(true);
        let resReaction = await createPostReaction(payload);

        console.log("add like  ", resReaction);

        setReactionId(resReaction.data.posts._id);

        console.log("this is reaction 1", resReaction.data.posts);
        console.log("this is reaction 2", likeData);

        // getAllPostFunc && (await getAllPostFunc());

        // dispatch(addStatusPost(resReaction.data.posts));
        //    setLocalLike(0);
      } catch (error) {
        console.log("this is error ,", error);
      }
    } else {
      // ? delete like
      console.log("this is delete ", likeCount - 1);
      setLikeCount(likeCount - 1);
      //  setIsThisUserClickLike(!isThisUserClickLike);
      const payload = {
        id: reactionId,
      };

      try {
        setIsThisUserLikeThisPost(false);
        let resReaction = await deletePostReaction(payload);
        console.log("delete like  ", resReaction);
        console.log("this is delete reaction ", resReaction);

        setReactionId(resReaction.data.posts._id);

        console.log("this is reaction 3", resReaction.data.posts);

        //  getAllPostFunc && (await getAllPostFunc());
        //  dispatch(addStatusPost(resReaction.data.posts));
        //  setLocalLike(0);
      } catch (error) {
        console.log("this is error ,", error);
      }
    }
  };

  const goProfile = () => {
    navigation.navigate("VisitProfile", {
      data: userInfo,
      navigateScreen: "Visit",
    });
  };

  const playSound = async () => {
    try {
      // Load the sound file (you should have your sound effect file in your project)
      await sound.loadAsync(
        require("../../assets/SoundEffect/fbLikeSound.mp3")
      );
      await sound.playAsync(); // Play the sound
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  };

  const [modalVisible, setModalVisible] = useState(false);

  // Function to open the modal
  const openModal = () => {
    setModalVisible(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalVisible(false);
  };

  // ? share btn
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: statusText,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <View style={styles.Container}>
      <View style={styles.postContainer}>
        <TouchableOpacity onPress={() => reDirect && goProfile()}>
          {!userImage ? (
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
          ) : (
            <Image
              source={{
                uri: userImage,
              }}
              style={styles.userImage}
            />
          )}
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View>
              <TouchableOpacity onPress={() => reDirect && goProfile()}>
                <View
                  style={{
                    flexDirection: "row",
                    // justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.userName}>{userName}</Text>

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
              </TouchableOpacity>

              <Text style={styles.time}>{timeAgo}</Text>
            </View>
            {isMenuShow && (
              <View>
                <TouchableOpacity
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <IonIcon
                    style={{
                      fontSize: 20,
                      color: "#040E29",
                    }}
                    name={"ellipsis-vertical"}
                  />
                </TouchableOpacity>
              </View>
            )}

            <Modal
              visible={modalVisible}
              transparent={true}
              animationType="fade"
              onRequestClose={closeModal}
            >
              <BlurView
                style={{
                  flex: 1,
                }}
                intensity={0} // Adjust the blur intensity as needed
              >
                <TouchableWithoutFeedback
                  onPress={closeModal}
                  //onPress={() => console.log("clicked")}
                >
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                    }}
                  >
                    <View
                      style={{
                        borderRadius: 5,
                        padding: 5,
                        textAlign: "center",
                        alignContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: "#fff",
                          padding: 15,
                          borderRadius: 5,
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            if (userInfo.currentUser !== null) {
                              // clearUserInfo().then((e) =>
                              //   console.log("this is clear -> ", e)
                              // );

                              console.log(userId);
                              // isUserLogged().then((dt) => console.log(dt, userInfo));
                              closeModal();
                              navigation.navigate("AddPost", {
                                userId: userId,
                                pageState: "update",
                                status: statusText,
                                userName: userName,
                                userImage: userImage,
                                postId: postId,
                                verified: userInfo?.verified,
                              });
                            } else {
                              closeModal();
                              navigation.navigate("AccountCreate");
                            }
                          }}
                          style={{
                            padding: 15,
                            //  borderBottomWidth: 1,
                            // borderColor: "#D3D3D3",
                            backgroundColor: "#040E29",
                            borderRadius: 5,
                            margin: 1,
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 15,
                              color: "white",
                              textAlign: "center",
                            }}
                          >
                            Edit
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            alertFunc();
                          }}
                          style={{
                            padding: 15,
                            //  borderBottomWidth: 1,
                            // borderColor: "#D3D3D3",
                            backgroundColor: "red",
                            borderRadius: 5,
                            margin: 1,
                          }}
                        >
                          <Text style={{ fontSize: 15, color: "white" }}>
                            {deleteLoading ? "Loading" : "Delete"}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </BlurView>
            </Modal>
          </View>
        </View>
      </View>
      <Text
        style={{
          marginTop: 5,
          fontSize: 14,
        }}
      >
        {statusText}
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("LikesList", {
              postId: postId,
            })
          }
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View>
            {reaction[0]?.user[0] ? (
              <IonIcon
                style={{
                  fontSize: 20,
                  color: likeCount > 0 ? "#040E29" : "gray",
                  marginTop: 10,
                }}
                name={"leaf"}
              />
            ) : (
              <IonIcon
                style={{
                  fontSize: 20,
                  color: likeCount > 0 ? "#040E29" : "gray",
                  marginTop: 10,
                }}
                name={"leaf"}
              />
            )}
          </View>
          <View>
            <Text style={{ marginTop: 8, color: "gray", fontSize: 12 }}>
              {" "}
              {likeCount} Likes
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          borderWidth: 0.5,
          borderColor: "#D3D3D3",
          alignSelf: "center",
          marginTop: 5,
          width: "100%",
          marginBottom: 3,
        }}
      ></View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            userId
              ? submitLike(isThisUserLikeThisPost)
              : navigation.navigate("AccountCreate");
          }}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <View>
            {isThisUserLikeThisPost ? (
              <IonIcon
                style={{
                  fontSize: 22,
                  color: "#040E29",
                }}
                name={"leaf"}
              />
            ) : (
              <IonIcon
                style={{
                  fontSize: 22,
                  color: "#040E29",
                }}
                name={"leaf-outline"}
              />
            )}
          </View>
          <View>
            <Text style={{ color: "gray", marginLeft: 5 }}> Like</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            onShare();
            // console.log(postId);
          }}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <View>
            <IonIcon
              style={{
                fontSize: 22,
                color: "#040E29",
              }}
              name={"arrow-redo-outline"}
            />
          </View>
          <View>
            <Text style={{ color: "gray", marginLeft: 5 }}> Share</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    margin: 7,
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

export default StatusComponent;
