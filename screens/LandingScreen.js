import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";
import IonIcon from "react-native-vector-icons/Ionicons";
import ProfileIcon from "react-native-vector-icons/SimpleLineIcons";
import { useDispatch, useSelector } from "react-redux";
import HomePageCard from "../components/HomePageCard";
import HomePageStatusLoading from "../components/HomePageLoading/HomePageStatusLoading";
import HomePageTopButton from "../components/HomePageTop/HomePageTopButton";
import { useGetAllStatusPostWithPaginationMutation } from "../redux/apiSlice";

import {
  addPostPaginationPage,
  addStatusPost,
  logOut,
} from "../redux/userSlice";
import StatusComponent from "./../components/StatusComponent/StatusComponent ";
import clearUserInfo from "./../services/clearUserInfo";

const Category = [
  {
    id: 1,
    title: "All",
  },
  {
    id: 2,
    title: "Student",
  },
  {
    id: 3,
    title: "Teacher",
  },
  {
    id: 4,
    title: "Post",
  },
  {
    id: 5,
    title: "Comments",
  },
  {
    id: 6,
    title: "News",
  },
  {
    id: 7,
    title: "Event",
  },
  {
    id: 8,
    title: "Blood",
  },
  {
    id: 9,
    title: "Football",
  },
];

const Item = ({ title, selectCategory, setSelectCategory }) => (
  <TouchableOpacity
    onPress={() => {
      setSelectCategory(title);
    }}
    style={{
      paddingHorizontal: 10,
      paddingVertical: 5,
      backgroundColor: `${selectCategory === title ? "#040E29" : "white"}`,
      marginHorizontal: 5,
      marginVertical: 15,
      borderRadius: 20,

      borderColor: "#040E29",
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
    <Text
      style={{ color: `${selectCategory !== title ? "#040E29" : "white"}` }}
    >
      {title}
    </Text>
  </TouchableOpacity>
);

const LandingScreen = ({ props, navigation, route }) => {
  React.useLayoutEffect(() => {
    setTimeout(() => {
      navigation.setOptions({
        tabBarStyle: {
          display: "none",
        },
      });
    }, 2000);
  }, [navigation]);

  // ? state for select category
  const [selectCategory, setSelectCategory] = useState("All");

  // * redux store user
  const userInfo = useSelector((state) => state.userInfo);

  //* all teacher info
  const [allTeacher, setAllTeacher] = useState([]);

  useEffect(() => {
    const filteredTeachers = userInfo?.AllUser.filter((user) => {
      return (
        user.userRole === "Teacher" &&
        user.isTeacherAvailableForTuition === "true"
      );
    });

    setAllTeacher(filteredTeachers);

    console.log("this is roni ", userInfo);
  }, [userInfo]);

  useEffect(() => {
    navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();
    });
  }, [navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      tabBarIcon: () => null,
    });
    //navigation.goBack(null);
  }, [navigation]);

  const [modalVisible, setModalVisible] = useState(false);

  // Function to open the modal
  const openModal = () => {
    setModalVisible(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalVisible(false);
  };

  // ? redux dispatch
  const dispatch = useDispatch();

  // Function to close the modal
  const addtestData = () => {
    // dispatch(testDataAdd(userInfo.allStatusPost));

    console.log("this is logggg ", userInfo.postPaginationPage);
  };

  // ? get all post with there reaction and with there react api
  //  const { data: getAllStatusPost } = useGetAllStatusPostQuery();
  const [loading, setLoading] = useState(false);
  const [getAllStatusPostWithPagination] =
    useGetAllStatusPostWithPaginationMutation();

  const callPostApi = async () => {
    setLoading(true);
    const payload = {
      page: userInfo.postPaginationPage,
    };

    const getAllPost = await getAllStatusPostWithPagination(payload);

    console.log("this is all  getAllPost - 78 -> ", getAllPost.data?.allPosts);

    if (getAllPost.data?.message === "successful") {
      dispatch(addStatusPost(getAllPost.data?.allPosts));
      setLoading(false);
      dispatch(addPostPaginationPage(getAllPost.data?.allPosts.length));
    }
  };

  return (
    <View style={{ flex: 1, position: "relative" }}>
      <StatusBar
        animated={true}
        backgroundColor="#040E29"
        barStyle="light-content"
        style="light"
      />

      <View style={styles.topBarContainer}>
        <View style={styles.headerContain}>
          <View
            //style={{ flex: 2 }}
            style={
              {
                //  flex: 1
              }
            }
          >
            <Image
              style={{ width: 57, height: 36 }}
              source={require("../assets/logo.png")}
            />
          </View>

          {/**  
          <View style={{ flex: 7, display: "none" }}>
            <TextInput
              style={styles.InputStyle}
              placeholder="Search..."
              placeholderTextColor="gray"
            />
          </View>
        */}

          <View
            style={{
              // flex: 7,
              position: "relative",
              // backgroundColor: "red",
            }}
          >
            <TouchableOpacity
              onPress={() => setModalVisible(!modalVisible)}
              style={
                {
                  // alignContent: "center",
                  // alignItems: "center",
                  // textAlign: "center",
                  // marginLeft: 3,
                  // marginTop: 5,
                }
              }
            >
              {userInfo.currentUser !== null ? (
                userInfo.currentUser.profilePic ? (
                  <Image
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 100,
                    }}
                    source={{
                      // uri: image,
                      uri: userInfo.currentUser.profilePic,
                    }}
                  />
                ) : (
                  <View
                    style={{
                      // backgroundColor: "green",
                      borderRadius: 50,
                      borderWidth: 1,
                      borderColor: "white",
                      padding: 4,
                      backgroundColor: "#040E29",
                      // marginRight: 5,
                      width: 35,
                      height: 35,
                      borderRadius: 25, // Make it round
                      //marginRight: 10,
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
                )
              ) : (
                <View
                  style={{
                    // backgroundColor: "green",
                    borderRadius: 50,
                    borderWidth: 1,
                    borderColor: "white",
                    padding: 4,
                    backgroundColor: "#040E29",
                    // marginRight: 5,
                    width: 35,
                    height: 35,
                    borderRadius: 25, // Make it round
                    //marginRight: 10,
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
            </TouchableOpacity>
            <View>
              <Modal
                visible={modalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={closeModal}
              >
                <TouchableWithoutFeedback onPress={closeModal}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "flex-start",
                      alignItems: "flex-end",
                      marginTop: StatusBar.currentHeight + 25,
                      marginRight: 30,
                    }}
                  >
                    {userInfo?.currentUser?._id && (
                      <View
                        style={{
                          backgroundColor: "white",
                          borderBottomEndRadius: 5,
                          borderBottomLeftRadius: 5,
                          borderTopLeftRadius: 5,
                          borderTopRightRadius: 5,
                          padding: 5,
                          textAlign: "center",
                          alignContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            if (userInfo.currentUser !== null) {
                              // clearUserInfo().then((e) =>
                              //   console.log("this is clear -> ", e)
                              // );

                              // isUserLogged().then((dt) => console.log(dt, userInfo));
                              closeModal();
                              navigation.navigate("VisitProfile", {
                                data: userInfo.currentUser,
                                navigateScreen: "MyProfile",
                              });
                            } else {
                              closeModal();
                              navigation.navigate("AccountCreate");
                            }
                          }}
                          style={{
                            padding: 10,
                            borderBottomWidth: 1,
                            borderColor: "#D3D3D3",
                          }}
                        >
                          <Text style={{ fontSize: 16 }}>Profile</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            if (userInfo.currentUser !== null) {
                              // clearUserInfo().then((e) =>
                              //   console.log("this is clear -> ", e)
                              // );

                              // isUserLogged().then((dt) => console.log(dt, userInfo));
                              closeModal();
                              navigation.navigate("CreateBatchScreen");
                            } else {
                              closeModal();
                              navigation.navigate("AccountCreate");
                            }
                          }}
                          style={{
                            padding: 10,
                            borderBottomWidth: 1,
                            borderColor: "#D3D3D3",
                          }}
                        >
                          <Text style={{ fontSize: 16 }}>Batch</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            if (userInfo.currentUser !== null) {
                              // clearUserInfo().then((e) =>
                              //   console.log("this is clear -> ", e)
                              // );

                              // isUserLogged().then((dt) => console.log(dt, userInfo));
                              closeModal();
                              navigation.navigate("Setting");
                            } else {
                              closeModal();
                              navigation.navigate("AccountCreate");
                            }
                          }}
                          style={{
                            padding: 10,
                            borderBottomWidth: 1,
                            borderColor: "#D3D3D3",
                          }}
                        >
                          <Text style={{ fontSize: 16 }}>Setting</Text>
                        </TouchableOpacity>
                        {userInfo?.currentUser?.role === "admin" && (
                          <TouchableOpacity
                            onPress={() => {
                              closeModal();
                              navigation.navigate("validationScreen");
                            }}
                            style={{
                              padding: 10,
                              borderBottomWidth: 1,
                              borderColor: "#D3D3D3",
                            }}
                          >
                            <Text style={{ fontSize: 16, color: "black" }}>
                              Validation
                            </Text>
                          </TouchableOpacity>
                        )}
                        <TouchableOpacity
                          onPress={() => {
                            clearUserInfo().then((e) => {
                              closeModal();
                              dispatch(logOut());
                              navigation.navigate("LogOut");
                            });
                          }}
                          style={{
                            padding: 10,

                            borderColor: "#D3D3D3",
                          }}
                        >
                          <Text style={{ fontSize: 16, color: "black" }}>
                            Log out
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )}
                    {!userInfo?.currentUser?._id && (
                      <View
                        style={{
                          backgroundColor: "white",
                          borderBottomEndRadius: 5,
                          borderBottomLeftRadius: 5,
                          borderTopLeftRadius: 5,
                          borderTopRightRadius: 5,
                          padding: 5,
                          textAlign: "center",
                          alignContent: "center",
                          alignItems: "center",
                          borderWidth: 1,
                          borderColor: "#040E29",
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            if (userInfo.currentUser !== null) {
                              // clearUserInfo().then((e) =>
                              //   console.log("this is clear -> ", e)
                              // );

                              // isUserLogged().then((dt) => console.log(dt, userInfo));
                              closeModal();
                              navigation.navigate("VisitProfile", {
                                data: userInfo.currentUser,
                                navigateScreen: "MyProfile",
                              });
                            } else {
                              closeModal();
                              navigation.navigate("AccountCreate");
                            }
                          }}
                          style={{
                            padding: 10,
                          }}
                        >
                          <Text style={{ fontSize: 16, color: "black" }}>
                            Log in
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                </TouchableWithoutFeedback>
              </Modal>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          style={{
            // borderRadius: 50,
            // borderWidth: 2,
            // borderColor: "yellow",
            // padding: 10,
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            margin: 5,
          }}
          onPress={() => {
            //    console.log(userInfo);

            userInfo.currentUser !== null
              ? navigation.navigate("AddPost", {
                  pageState: "new",
                  userId: userInfo.currentUser._id,
                  userName: userInfo.currentUser.name,
                  userImage: userInfo.currentUser.profilePic,
                  timestamps: null,
                  status: null,
                  verified: userInfo.currentUser.verified,
                })
              : navigation.navigate("AccountCreate");
          }}
        >
          <IonIcon
            style={{ fontSize: 35, color: "white" }}
            name={"add-circle-outline"}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.MainContentContainer}>
        <ScrollView style={styles.scrollView}>
          {
            //    <Button
            //       onPress={() => navigation.navigate("AddPost")}
            //       title={"this is button"}
            //     />
          }
          {1 === 2 && (
            <View>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled={false}
                data={Category}
                renderItem={({ item }) => (
                  <Item
                    setSelectCategory={setSelectCategory}
                    selectCategory={selectCategory}
                    title={item.title}
                  />
                )}
                keyExtractor={(item) => item.id}
              />
            </View>
          )}
          <ScrollView
            horizontal
            style={styles.scrollViewForTeacher}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            {allTeacher &&
              allTeacher.map((tData) => (
                <HomePageCard navigation={navigation} tData={tData} />
              ))}
          </ScrollView>

          <View style={{ paddingHorizontal: 5 }}>
            <HomePageTopButton navigation={navigation}></HomePageTopButton>
          </View>

          {userInfo.allStatusPost === null && (
            <HomePageStatusLoading></HomePageStatusLoading>
          )}

          <View style={styles.containerTT}>
            {userInfo?.allStatusPost &&
              userInfo?.allStatusPost?.map((post, index) => (
                <View
                  // onPress={() => {
                  //   userInfo?.currentUser?._id === post._id
                  //     ? navigation.navigate("VisitProfile", {
                  //         data: userInfo.currentUser._id,
                  //         navigateScreen: "MyProfile",
                  //       })
                  //     : navigation.navigate("VisitProfile", {
                  //         data: post._id,
                  //       });
                  // }}
                  key={index}
                  style={styles.userBox}
                >
                  <StatusComponent
                    navigation={navigation}
                    item={post}
                    reDirect={true}
                    isMenuShow={
                      userInfo?.currentUser?._id === post.userInfo[0][0]._id
                        ? true
                        : false
                    }
                    postId={post._id}
                    reaction={post.reactions}
                    userName={post.userInfo[0][0].name}
                    // userId={post.userInfo[0][0]._id}
                    userId={userInfo?.currentUser?._id}
                    time={post.createdAt}
                    statusText={post.status}
                    userImage={post.userInfo[0][0].profilePic}
                    userInfo={post.userInfo[0][0]}
                    userPosts={null}
                    setUserPosts={null}
                    route={route?.params?.data}
                  />
                </View>
              ))}
          </View>
          <View
            style={{
              marginTop: 5,
              marginBottom: 10,
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <TouchableOpacity
              style={{
                borderRadius: 5,
                backgroundColor: "#040E29",

                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: 5,
                paddingHorizontal: 10,
              }}
              onPress={() => callPostApi()}
            >
              {loading === true ? (
                <View>
                  <View style={{ alignItems: "center" }}>
                    <ActivityIndicator size="small" color="white" />
                  </View>
                </View>
              ) : (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ color: "white", fontSize: 14 }}>Get More</Text>

                  <IonIcon
                    style={{
                      fontSize: 20,
                      color: "white",
                      marginLeft: 14,
                    }}
                    name={"play-forward-circle-outline"}
                  />
                </View>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    paddingLeft: 0,
    marginBottom: 5,
  },
  buttonActive: {
    backgroundColor: "#ffffff", // Change the background color to your preference
    padding: 10,
    margin: 5,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: "#040E29",
  },
  button: {
    backgroundColor: "#ffffff", // Change the background color to your preference
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: "#040E29", // Change the text color to your preference
    fontWeight: "bold",
  },

  containerTT: {
    //  flexDirection: "row",
    // flexWrap: "wrap", // Allow items to wrap to the next row
    justifyContent: "center",
    textAlign: "center",
    //margin: 5,
    marginTop: -5,
  },
  userBox: {
    // flexBasis: "100%", // 48% to leave space for margins and allow two items in a row
    marginBottom: 5, // Add margin to the bottom for spacing between rows
    borderRadius: 5,
    //margin: 15,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: "#ffffff",
  },
  accountBox: {
    flexBasis: "48%", // 48% to leave space for margins and allow two items in a row
  },

  scrollViewForTeacher: {
    paddingHorizontal: 10,
    marginTop: 20,
  },

  container: {
    position: "absolute",
    bottom: 0,
    zIndex: 1000,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    height: 50,
    backgroundColor: "#040E29",
  },

  topBarContainer: {
    // position: "absolute",
    // top: 30,
    // zIndex: 1000,
    // flexDirection: "row",
    // paddingHorizontal: 10,
    // width: "100%",
    // height: 75,
    // backgroundColor: "#040E29",

    position: "absolute",
    top: StatusBar.currentHeight,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    width: "100%",
    backgroundColor: "#040E29",
    zIndex: 99,
    flex: 1,
    height: 55,

    // justifyContent: "center",
    // alignItems: "center",
    paddingHorizontal: 10,
  },
  headerContain: {
    flexDirection: "row",
    // alignItems: "center",
    // flex: 1,
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  InputStyle: {
    marginTop: 7,
    height: 40,
    backgroundColor: "#F4F8FB",
    borderRadius: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#020A0D",
    color: "white",
  },
  MainContentContainer: {
    marginTop: StatusBar.currentHeight + 40,
    marginBottom: 50,
    backgroundColor: "#F0F2F5",
  },
});

export default LandingScreen;
