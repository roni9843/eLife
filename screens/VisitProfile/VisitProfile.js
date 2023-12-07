import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import IonIcon from "react-native-vector-icons/Ionicons";
import VerifyIcon from "react-native-vector-icons/MaterialIcons";
import { useSelector } from "react-redux";
import ViewPageHeader from "../../components/HeaderBar/ViewPageHeader";
import VisitProfileHeader from "../../components/HeaderBar/VisitProfileHeader";
import StatusComponent from "../../components/StatusComponent/StatusComponent ";
import { useGetThisUserStatusPostMutation } from "../../redux/apiSlice";
const VisitProfile = ({ route, navigation }) => {
  // * redux store user
  const userInfo = useSelector((state) => state.userInfo);

  const [thisUserInfo, setThisUserInfo] = useState(route?.params?.data);

  const [getThisUserStatusPost] = useGetThisUserStatusPostMutation();

  const [userPosts, setUserPosts] = useState(null);

  useEffect(() => {
    getAllPostFunc();
  }, [route]);

  const getAllPostFunc = async () => {
    const resStatus = await getThisUserStatusPost({
      currentUserId: route?.params?.data._id,
    });

    console.log("this is post -> ", route?.params?.data._id);
    setUserPosts(resStatus.data.posts);
  };

  return (
    <View style={Styles.container}>
      {route?.params?.navigateScreen &&
      route?.params?.navigateScreen === "MyProfile" ? (
        <View style={Styles.header}>
          <ViewPageHeader navigation={navigation}></ViewPageHeader>
        </View>
      ) : (
        <View style={Styles.header}>
          <VisitProfileHeader navigation={navigation}></VisitProfileHeader>
        </View>
      )}
      <ScrollView>
        <View style={Styles.containerTop}></View>

        <View style={Styles.ImageContainer}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {thisUserInfo?.profilePic && thisUserInfo?.profilePic !== null ? (
              <View
                style={{
                  fontWeight: "bold",
                  color: "white",
                  marginTop: -50,
                  backgroundColor: "#040E29",
                  borderRadius: 100,
                  margin: 0,
                  padding: 0,
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Image
                  style={{
                    borderRadius: 100,
                    height: 100,
                    width: 100,
                    borderWidth: 1,
                    borderColor: "#040E29",
                  }}
                  source={{
                    // uri: image,
                    uri: thisUserInfo.profilePic,
                  }}
                />
              </View>
            ) : (
              <View
                style={{
                  fontWeight: "bold",
                  color: "white",
                  marginTop: -50,
                  backgroundColor: "#040E29",
                  borderRadius: 100,
                  margin: 0,
                  padding: 0,
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <IonIcon
                  style={{
                    marginBottom: -9,
                    marginHorizontal: -5,
                    fontSize: 100,
                    color: "white",
                  }}
                  name={"person-circle-outline"}
                />
              </View>
            )}
          </View>
          <View
            style={{
              justifyContent: "center",
              alignContent: "center",
              textAlign: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  // justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    marginTop: 2,
                    fontSize: 20,
                    fontWeight: "bold",
                    justifyContent: "center",
                    alignContent: "center",
                    textAlign: "center",
                    fontSize: RFValue(20),
                  }}
                >
                  {thisUserInfo?.name}
                </Text>

                {thisUserInfo?.verified === true && (
                  <View style={{ marginLeft: 10 }}>
                    <VerifyIcon
                      name="verified-user"
                      size={16}
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
            <Text
              style={{
                marginTop: 2,
                fontSize: 14,
                justifyContent: "center",
                alignContent: "center",
                textAlign: "center",
                color: "#81818A",
              }}
            >
              {thisUserInfo?.markAs}
            </Text>
          </View>
        </View>

        <View
          style={{ marginTop: 8, height: 2, backgroundColor: "#E0E0E0" }}
        ></View>

        <View style={{ padding: 10 }}>
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <IonIcon
                style={{
                  fontSize: 18,
                  color: "#040E29",
                  marginRight: 10,
                }}
                name={"receipt-outline"}
              />
              <Text
                style={{ color: "#040E29", fontSize: 18, fontWeight: "bold" }}
              >
                Bio
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#81818A", marginTop: 5 }}>
                {thisUserInfo?.aboutMe ? thisUserInfo?.aboutMe : "No Bio"}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{ marginTop: 8, height: 2, backgroundColor: "#E0E0E0" }}
        ></View>

        <View style={{ padding: 10 }}>
          <View>
            {(thisUserInfo?.village ||
              thisUserInfo?.union ||
              thisUserInfo?.thana ||
              thisUserInfo?.district) && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text>🏠 </Text>

                <Text style={{ color: "#040E29" }}>
                  {" "}
                  {"  "} {thisUserInfo.village && `${thisUserInfo.village},`}{" "}
                  {thisUserInfo.union && `${thisUserInfo.union},`}{" "}
                  {thisUserInfo.thana && `${thisUserInfo.thana},`}{" "}
                  {thisUserInfo.district && `${thisUserInfo.district}`}
                </Text>
              </View>
            )}

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text>📞 </Text>
              <Text style={{ color: "#040E29" }}>
                {"  "} (0088) {thisUserInfo?.phone}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text>♂️ </Text>
              <Text style={{ color: "#040E29" }}>
                {"  "} {thisUserInfo?.gender === "male" ? "Male" : "Female"}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text>🩸 </Text>
              <Text style={{ color: "#040E29" }}>
                {"  "}{" "}
                {!thisUserInfo?.bloodGroup
                  ? "No Record"
                  : thisUserInfo?.bloodGroup}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text>💉 </Text>
              <Text style={{ color: "#040E29" }}>
                {"  "}{" "}
                {thisUserInfo?.wantToDonate == false
                  ? "Choosing not to donate Blood."
                  : "Choosing to donate Blood."}
              </Text>
            </View>
            {thisUserInfo?.numberOfDonate > 0 && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text>⏲️ </Text>
                <Text style={{ color: "#040E29" }}>
                  {"  "} Last Blood donate{" "}
                  {moment(thisUserInfo?.lastDonateDate).format("YYYY-MM-DD")}
                </Text>
              </View>
            )}

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text>⏳ </Text>
              <Text style={{ color: "#040E29" }}>
                {"  "} Donate the blood {thisUserInfo?.numberOfDonate} times
              </Text>
            </View>
          </View>
        </View>

        <View>
          <View
            style={{ marginTop: 8, height: 2, backgroundColor: "#E0E0E0" }}
          ></View>
          <View style={{ padding: 10 }}>
            <View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <IonIcon
                  style={{
                    fontSize: 20,
                    color: "#040E29",
                    marginRight: 10,
                  }}
                  name={"mail-open-outline"}
                />
                <Text
                  style={{
                    color: "#040E29",
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                >
                  Posts
                </Text>
              </View>
            </View>
          </View>
          <View style={Styles.containerTT}>
            {userPosts &&
              userPosts.map((post, index) => (
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
                  style={Styles.userBox}
                >
                  <StatusComponent
                    getAllPostFunc={getAllPostFunc}
                    navigation={navigation}
                    item={post}
                    reDirect={false}
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
                    userPosts={userPosts}
                    setUserPosts={setUserPosts}
                  />
                </View>
              ))}
            {userPosts === null && (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 30,
                }}
              >
                <ActivityIndicator size="large" color="#040E29" />
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default VisitProfile;

const Styles = StyleSheet.create({
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
    borderRadius: 8,
    //margin: 15,
    marginVertical: 10,
    marginHorizontal: 15,
    backgroundColor: "#ffffff",
  },

  container: {
    flex: 1,
    backgroundColor: "#F4F8FB",
    //    backgroundColor: "red",
    position: "relative",
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "blue", // Change this to your desired header background color

    zIndex: 1, // To ensure the header is on top of the content
  },
  containerTop: {
    backgroundColor: "#040E29",
    height: 200,
  },
  ImageContainer: {
    backgroundColor: "#F4F8FB",
    height: 100,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: -40,
  },
});
