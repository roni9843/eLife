import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  BackHandler,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Textarea from "react-native-textarea";
import IonIcon from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import EditProfileHeader from "../../components/HeaderBar/EditProfileHeader";
import {
  useGetAllStatusPostQuery,
  useUpdateTheUserMutation,
} from "../../redux/apiSlice";
import { addCurrentUser, addStatusPost } from "../../redux/userSlice";
import uploadImage from "../../services/uploadImage";

const EditProfile = ({ navigation }) => {
  // ** get current user info on redux store
  const userInfo = useSelector((state) => state.userInfo);

  const [gender, setGender] = useState("male"); // Initial state set to 'male'

  const handleGenderChange = (selectedGender) => {
    setGender(selectedGender);
  };

  // ? loading for image
  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);

  const [image, setImage] = useState(null);
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("018********");
  const [useVillage, setUserVillage] = useState("");
  const [useUnion, setUserUnion] = useState("");
  const [useThana, setUserThana] = useState("");
  const [useDistrict, setUserDistrict] = useState("");
  const [useSubject, setUseSubject] = useState("");
  const [rowImage, setRowImage] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [wantToDonate, setWantToDonate] = useState(null);
  const [lastDonateDate, setLastDonateDate] = useState(null);
  const [aboutMe, setAboutMe] = useState("");
  const [markAs, setMarkAs] = useState("");
  const [verified, setVerified] = useState("");
  const [active, setActive] = useState("");
  const [numberOfDonate, setNumberOfDonate] = useState(0);

  const [allBloodGroup, _setAllBloodGroup] = useState([
    "A+",
    "A-",
    "B+",
    "B-",
    "AB+",
    "AB-",
    "O+",
    "O-",
  ]);
  const [allMark, _setAllMark] = useState(["Student", "Teacher", "Guest"]);

  const [date, setDate] = useState(new Date(1598051730000));

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  // ** error state
  const [error, setError] = useState({
    msg: "",
    status: false,
  });

  //   onSelectedItemsChange = selectedItems => {
  //     this.setState({ selectedItems });
  //   };

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });

      const source = {
        uri: result.assets[0].uri,
        type: `test/${result.assets[0].uri.split(".")[1]}`,
        name: `test.${result.assets[0].uri.split(".")[1]}`,
      };

      setRowImage(source);
      // setLoading(true);
      // await cloudinaryUpload(source);

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.log("error reading an image");
    }
  };

  const cloudinaryUpload = async (photo) => {
    const imgLink = await uploadImage(photo);

    setImage(imgLink);
    setLoading(false);

    return imgLink;
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("LandingScreen");
          }}
        >
          <IonIcon
            style={{
              fontSize: 30,
              color: "white",
              marginRight: 20,
              color: "white",
            }}
            name={"checkmark-circle-outline"}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useLayoutEffect(() => {
    if (userInfo.fetchForAllUserAndAllStatusData === "Login Screen") {
      navigation.setOptions({
        //  headerLeft: () => null, // Set headerLeft to null to hide it
      });
      //navigation.goBack(null);
    }
  }, [navigation]);

  // ** set all value on the states
  useEffect(() => {
    setUserName(userInfo.currentUser.name);

    setUserPhone(userInfo.currentUser.phone);

    if (userInfo.currentUser.hasOwnProperty("profilePic") === true) {
      setImage(userInfo.currentUser.profilePic);
    }
    if (userInfo.currentUser.hasOwnProperty("gender") === true) {
      setGender(userInfo.currentUser.gender);
    }
    if (userInfo.currentUser.hasOwnProperty("village") === true) {
      setUserVillage(userInfo.currentUser.village);
    }
    if (userInfo.currentUser.hasOwnProperty("thana") === true) {
      setUserThana(userInfo.currentUser.thana);
    }
    if (userInfo.currentUser.hasOwnProperty("union") === true) {
      setUserUnion(userInfo.currentUser.union);
    }
    if (userInfo.currentUser.hasOwnProperty("district") === true) {
      setUserDistrict(userInfo.currentUser.district);
    }

    setBloodGroup(
      userInfo.currentUser?.bloodGroup ? userInfo.currentUser?.bloodGroup : ""
    );

    setLastDonateDate(
      userInfo.currentUser?.lastDonateDate
        ? userInfo.currentUser?.lastDonateDate
        : null
    );

    setWantToDonate(userInfo.currentUser?.wantToDonate);

    setAboutMe(
      userInfo.currentUser?.aboutMe ? userInfo.currentUser?.aboutMe : ""
    );

    setMarkAs(userInfo.currentUser?.markAs);

    setVerified(userInfo.currentUser?.verified);

    setActive(userInfo.currentUser?.active);
    setNumberOfDonate(
      userInfo.currentUser?.numberOfDonate ? numberOfDonate : 0
    );
  }, [userInfo]);

  // ** back handler
  useEffect(() => {
    const backAction = () => {
      navigation.navigate("VisitProfile", {
        data: userInfo.currentUser._id,
        navigateScreen: "MyProfile",
      });

      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const scrollViewRef = useRef(null);

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  const [updateUser] = useUpdateTheUserMutation();
  // ? redux dispatch
  const dispatch = useDispatch();

  // ? get all post with there reaction and with there react api
  const { data: getAllStatusPost, refetch: statusRefetch } =
    useGetAllStatusPostQuery();

  // ** for submit btn
  const submitBtn = async () => {
    const validate = await checkValidation();

    if (validate === false) {
      scrollToBottom();

      return false;
    }

    if (validate) {
      let imageLink = image;
      scrollToBottom();

      setLoadingPage(true);

      rowImage !== "" && (imageLink = await cloudinaryUpload(rowImage));

      const payload = {
        id: userInfo.currentUser._id,
        name: userName,
        gender: gender,
        bloodGroup: bloodGroup ? bloodGroup : null,
        wantToDonate: wantToDonate,
        lastDonateDate: lastDonateDate,
        numberOfDonate: numberOfDonate,
        village: useVillage,
        union: useUnion,
        thana: useThana,
        district: useDistrict,
        profilePic: imageLink,
        aboutMe: aboutMe,
        markAs: markAs,
      };

      !bloodGroup && delete payload.bloodGroup;

      console.log("payload", payload);

      if (1 == 1) {
        try {
          const data = await updateUser(payload);

          if (data?.error) {
            setLoadingPage(false);
          } else {
            const payload = {
              user: data.data.user,
              token: data.data.token,
            };

            dispatch(addCurrentUser(payload));

            const newPost = await statusRefetch();

            console.log("this is update post ", newPost.data.posts);

            dispatch(addStatusPost(newPost.data.posts));

            setLoadingPage(false);
            navigation.navigate("LandingScreen");

            console.log("confirm");
          }
        } catch (error) {
          console.log("this is error ,", error);
        }
      }
    }
  };

  const checkValidation = async () => {
    userName === "" &&
      setError({ status: true, msg: "Kindly provide your name." });

    return userName === "" ? false : true;
  };

  return (
    <View>
      <EditProfileHeader
        id={userInfo.currentUser._id}
        navigation={navigation}
        submitBtn={submitBtn}
      ></EditProfileHeader>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          style={{ backgroundColor: "white", marginTop: 80 }}
          ref={scrollViewRef}
        >
          <View>
            <View
              style={{
                height: 200,
                backgroundColor: "#040E29",
                borderBottomRightRadius: 1000,
                borderBottomLeftRadius: 1000,
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    fontWeight: "bold",
                    color: "white",
                    position: "relative",
                    backgroundColor: "#040E29",
                    borderRadius: 100,
                    margin: 0,
                    padding: 0,
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  {image ? (
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    >
                      <Image
                        style={{
                          width: 150,
                          height: 150,
                          borderRadius: 100,
                          marginTop: 38,
                        }}
                        source={{
                          // uri: image,
                          uri: image,
                        }}
                      />
                    </View>
                  ) : loading ? (
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    >
                      <Image
                        style={{
                          width: 162,
                          height: 162,
                          borderRadius: 100,
                          marginTop: 25,
                        }}
                        source={require("../../assets/LoadingImageAnimation.jpg")}
                      />
                    </View>
                  ) : (
                    <IonIcon
                      style={{
                        fontSize: 200,
                        color: "white",
                      }}
                      name={"person-circle-outline"}
                    />
                  )}
                  {loading === false && (
                    <TouchableOpacity
                      onPress={() => selectImage()}
                      style={{
                        borderWidth: 1,
                        borderColor: "white",
                        position: "absolute",
                        bottom: 10,
                        right: image ? 10 : loading ? 23 : 40,
                        backgroundColor: "#040E29",
                        borderRadius: 100,
                        padding: 5,
                        height: 30,
                        width: 30,
                        textAlign: "center",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <IonIcon
                        style={{
                          color: "white",
                          fontSize: 20,
                        }}
                        name={"camera-sharp"}
                      />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 25,
                  fontWeight: "bold",
                  marginTop: 5,
                }}
              >
                {userName}
              </Text>
              {verified === true && !userName.length === false && (
                <View style={{ marginTop: 5, marginLeft: 5 }}>
                  <Image
                    source={require("../../assets/blueTick.png")}
                    style={{ height: 22, width: 25 }}
                  />
                </View>
              )}
            </View>

            <View style={{ padding: 10, marginTop: 15 }}>
              <View>
                <Text style={{ padding: 5, fontWeight: "bold" }}>Name : </Text>
                <TextInput
                  value={userName} // set the value prop to the state
                  onChangeText={(text) => setUserName(text)}
                  style={{
                    borderWidth: 1,
                    borderColor: "#EEEEEE",
                    padding: 10,
                    borderRadius: 8,
                    backgroundColor: "#F9F9F9",
                  }}
                />
              </View>
              {userInfo.currentUser.userRole === "Teacher" && (
                <View style={{ marginTop: 10 }}>
                  <Text style={{ padding: 5, fontWeight: "bold" }}>
                    Your Subject :
                  </Text>
                  <TextInput
                    style={{
                      borderWidth: 1,
                      borderColor: "#EEEEEE",
                      padding: 10,
                      borderRadius: 8,
                      backgroundColor: "#F9F9F9",
                    }}
                    placeholder="Computer Science & Engineering (CSE)"
                    value={useSubject} // set the value prop to the state
                    onChangeText={(text) => setUseSubject(text)}
                  />
                </View>
              )}

              <View style={{ marginTop: 10 }}>
                <Text style={{ padding: 5, fontWeight: "bold" }}>Phone :</Text>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: "#EEEEEE",
                    padding: 10,
                    borderRadius: 8,
                    backgroundColor: "#F9F9F9",
                  }}
                  placeholder={userPhone}
                  value={userPhone}
                  disabled
                />
              </View>
              <View style={{ marginTop: 10 }}>
                <Text style={{ padding: 5, fontWeight: "bold" }}>Bio :</Text>
                <Textarea
                  containerStyle={{
                    borderWidth: 1,
                    borderColor: "#EEEEEE",
                    padding: 10,
                    borderRadius: 8,
                    backgroundColor: "#F9F9F9",
                  }}
                  defaultValue={aboutMe}
                  onChangeText={(e) => setAboutMe(e)}
                  maxLength={120}
                  // defaultValue={userStatus}
                  placeholder={"Tell about yourself...."}
                  placeholderTextColor={"#c7c7c7"}
                  underlineColorAndroid={"transparent"}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <Text style={{ fontWeight: "bold" }}>Gender:</Text>

                <TouchableOpacity
                  style={
                    gender === "male"
                      ? {
                          backgroundColor: "#040E29",
                          borderWidth: 1,
                          borderColor: "#040E29",
                          padding: 8,
                          margin: 8,
                          borderRadius: 5,
                        }
                      : {
                          borderWidth: 1,
                          borderColor: "#040E29",
                          padding: 8,
                          margin: 8,
                          borderRadius: 5,
                        }
                  }
                  onPress={() => handleGenderChange("male")}
                >
                  <Text
                    style={
                      gender === "male"
                        ? {
                            color: "#fff",
                          }
                        : {
                            color: "black",
                          }
                    }
                  >
                    Male
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={
                    gender === "female"
                      ? {
                          backgroundColor: "#040E29",
                          borderWidth: 1,
                          borderColor: "#040E29",
                          padding: 8,
                          margin: 8,
                          borderRadius: 5,
                        }
                      : {
                          borderWidth: 1,
                          borderColor: "#040E29",
                          padding: 8,
                          margin: 8,
                          borderRadius: 5,
                        }
                  }
                  onPress={() => handleGenderChange("female")}
                >
                  <Text
                    style={
                      gender === "female"
                        ? {
                            color: "#fff",
                          }
                        : {
                            color: "black",
                          }
                    }
                  >
                    Female
                  </Text>
                </TouchableOpacity>

                {/* Add more gender options as needed */}
              </View>

              <View style={{ marginTop: 10 }}>
                <Text style={{ padding: 5, fontWeight: "bold" }}>
                  Mark : {markAs}
                </Text>
                <ScrollView horizontal>
                  {allMark.map((b) => (
                    <TouchableOpacity
                      style={{
                        margin: 2,
                        marginHorizontal: 4,
                        borderWidth: 1,
                        borderColor: `${b === markAs ? "white" : "#040E29"}`,
                        backgroundColor: `${
                          b === markAs ? "#040E29" : "white"
                        }`,
                        borderRadius: 5,
                      }}
                      onPress={() => setMarkAs(b)}
                    >
                      <Text
                        style={{
                          color: `${b === markAs ? "white" : "#040E29"}`,
                          padding: 5,
                        }}
                      >
                        {b}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
              <View style={{ marginTop: 10 }}>
                <Text style={{ padding: 5, fontWeight: "bold" }}>
                  Blood Group 🩸 : {bloodGroup}
                </Text>
                <ScrollView horizontal>
                  {allBloodGroup.map((b) => (
                    <TouchableOpacity
                      style={{
                        margin: 2,
                        marginHorizontal: 4,
                        borderWidth: 1,
                        borderColor: `${
                          b === bloodGroup ? "white" : "#040E29"
                        }`,
                        backgroundColor: `${
                          b === bloodGroup ? "#040E29" : "white"
                        }`,
                        borderRadius: 5,
                      }}
                      onPress={() => setBloodGroup(b)}
                    >
                      <Text
                        style={{
                          color: `${b === bloodGroup ? "white" : "#040E29"}`,
                          padding: 5,
                        }}
                      >
                        {b}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 5,
                }}
              >
                <Text style={{ fontWeight: "bold" }}>
                  Do you want to donate blood : {wantToDonate}
                </Text>

                <TouchableOpacity
                  style={
                    wantToDonate
                      ? {
                          backgroundColor: "#040E29",
                          borderWidth: 1,
                          borderColor: "#040E29",
                          padding: 8,
                          margin: 8,
                          borderRadius: 5,
                        }
                      : {
                          borderWidth: 1,
                          borderColor: "#040E29",
                          padding: 8,
                          margin: 8,
                          borderRadius: 5,
                        }
                  }
                  onPress={() => setWantToDonate(true)}
                >
                  <Text
                    style={
                      wantToDonate
                        ? {
                            color: "#fff",
                          }
                        : {
                            color: "black",
                          }
                    }
                  >
                    Yes
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={
                    !wantToDonate
                      ? {
                          backgroundColor: "#040E29",
                          borderWidth: 1,
                          borderColor: "#040E29",
                          padding: 8,
                          margin: 8,
                          borderRadius: 5,
                        }
                      : {
                          borderWidth: 1,
                          borderColor: "#040E29",
                          padding: 8,
                          margin: 8,
                          borderRadius: 5,
                        }
                  }
                  onPress={() => setWantToDonate(false)}
                >
                  <Text
                    style={
                      !wantToDonate
                        ? {
                            color: "#fff",
                          }
                        : {
                            color: "black",
                          }
                    }
                  >
                    No
                  </Text>
                </TouchableOpacity>

                {/* Add more gender options as needed */}
              </View>

              <View style={{ marginTop: 5 }}>
                <Text style={{ padding: 5, fontWeight: "bold" }}>
                  How many times have you donated blood ? :
                </Text>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: "#EEEEEE",
                    padding: 10,
                    borderRadius: 8,
                    backgroundColor: "#F9F9F9",
                  }}
                  value={numberOfDonate} // set the value prop to the state
                  onChangeText={(text) => setNumberOfDonate(text)}
                  keyboardType="numeric"
                />
              </View>
              <View style={{ marginTop: 10 }}>
                <Text style={{ padding: 5, fontWeight: "bold" }}>
                  Last Donate Date :
                </Text>
              </View>
              <View style={{ marginTop: 10 }}>
                <Text style={{ padding: 5, fontWeight: "bold" }}>
                  Address Village :
                </Text>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: "#EEEEEE",
                    padding: 10,
                    borderRadius: 8,
                    backgroundColor: "#F9F9F9",
                  }}
                  placeholder="New Sonakanda"
                  value={useVillage} // set the value prop to the state
                  onChangeText={(text) => setUserVillage(text)}
                />
              </View>
              <View style={{ marginTop: 10 }}>
                <Text style={{ padding: 5, fontWeight: "bold" }}>
                  Address Union :
                </Text>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: "#EEEEEE",
                    padding: 10,
                    borderRadius: 8,
                    backgroundColor: "#F9F9F9",
                  }}
                  placeholder="Ruhitpur"
                  value={useUnion} // set the value prop to the state
                  onChangeText={(text) => setUserUnion(text)}
                />
              </View>
              <View style={{ marginTop: 10 }}>
                <Text style={{ padding: 5, fontWeight: "bold" }}>Thana :</Text>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: "#EEEEEE",
                    padding: 10,
                    borderRadius: 8,
                    backgroundColor: "#F9F9F9",
                  }}
                  placeholder="Keranigonj"
                  value={useThana} // set the value prop to the state
                  onChangeText={(text) => setUserThana(text)}
                />
              </View>
              <View style={{ marginTop: 10 }}>
                <Text style={{ padding: 5, fontWeight: "bold" }}>
                  District :
                </Text>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: "#EEEEEE",
                    padding: 10,
                    borderRadius: 8,
                    backgroundColor: "#F9F9F9",
                  }}
                  placeholder="Dhaka"
                  value={useDistrict} // set the value prop to the state
                  onChangeText={(text) => setUserDistrict(text)}
                />
              </View>

              {userInfo.currentUser.userRole === "Teacher" && (
                <View style={{ marginTop: 10 }}>
                  <Text style={{ padding: 5, fontWeight: "bold" }}>
                    Target Student :
                  </Text>
                  <View
                    style={{
                      flex: 1,
                      paddingHorizontal: 10,
                    }}
                  ></View>
                </View>
              )}

              {error.status && (
                <View
                  style={{
                    backgroundColor: "red",
                    padding: 10,
                    borderRadius: 5,
                    margin: 5,
                  }}
                >
                  <Text style={{ color: "white" }}>{error.msg}</Text>
                </View>
              )}

              {loadingPage === true && (
                <View style={{ alignItems: "center" }}>
                  <ActivityIndicator size="large" color="#3498db" />
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
