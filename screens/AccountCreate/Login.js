import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
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
import IonIcon from "react-native-vector-icons/Ionicons";
import { useDispatch } from "react-redux";
import { useLoginUserMutation } from "../../redux/apiSlice";
import {
  addCurrentUser,
  addfetchForAllUserAndAllStatusData,
} from "../../redux/userSlice";

const Login = ({ setIsSignIn }) => {
  const navigation = useNavigation();

  // ? redux dispatch
  const dispatch = useDispatch();

  // ? is input valid
  const [isInputValid, setIsInputValid] = useState(0);

  // ? for user phone number
  const [userPhone, setUserPhone] = useState("");

  // ? for user password
  const [userPassword, setUserPassword] = useState("");

  // ? for error state
  const [error, setError] = useState({
    status: false,
    msg: "",
  });

  const [loading, setLoading] = useState(false);

  // * for check is valid for login
  useEffect(() => {
    if (userPhone.length >= 9 && userPassword.length >= 7) {
      setIsInputValid(1);
    } else {
      setIsInputValid(0);
    }
  }, [userPhone, userPassword]);

  //! hide bottom tabs
  useEffect(() => {
    navigation
      .getParent()
      ?.setOptions({ tabBarStyle: { display: "none" }, tabBarVisible: false });
    return () =>
      navigation
        .getParent()
        ?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
  }, [navigation]);

  // ? post data
  const [loginUser] = useLoginUserMutation();

  // ? submit btn
  const submitBtn = async () => {
    try {
      setLoading(true);
      const resData = await loginUser({
        phone: userPhone.toString(),
        password: userPassword,
      });

      if (resData.data?.message === "Login successful") {
        //  navigation.navigate("LandingScreen");

        console.log("this is login user -> ", resData.data);

        const payload = {
          user: resData.data.userInfo.user,
          token: resData.data.userInfo.token,
        };

        dispatch(addCurrentUser(payload));

        navigation.navigate("LandingScreen");
        setLoading(false);

        // navigation.navigate("LandingScreen", { screen: "Details" });
      }

      if (resData.error?.status === 400) {
        setLoading(false);
        setError({
          status: true,
          msg: resData.error.data.message,
        });
      }
    } catch (error) {
      console.log("this is error -> ", error);
    }
  };

  // ? set current user data on redux-store
  const setCurrentUserDataOnReduxStore = (props) => {
    dispatch(addCurrentUser(props));
  };

  // ? set screen name in redux-store
  const setfetchForAllUserAndAllStatusData = () => {
    dispatch(addfetchForAllUserAndAllStatusData("Login Screen"));
  };

  return (
    <View>
      <StatusBar animated={true} backgroundColor="#040E29" />
      <View>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={Styles.container}
        >
          <ScrollView contentContainerStyle={Styles.scrollContainer}>
            <View style={Styles.BoxContainer}>
              <View>
                <Image
                  style={Styles.logo}
                  source={require("../../assets/logo.png")}
                />
              </View>
              <View>
                <Text style={Styles.title}>Login</Text>
              </View>
              <View style={{ marginBottom: 5 }}>
                <Image source={require("../../assets/LineLogin.png")} />
              </View>
              <View>
                <View>
                  <View style={Styles.inputContainer}>
                    <View style={Styles.inputBoxContainer}>
                      <TextInput
                        style={Styles.input}
                        // onChangeText={onChangeText}
                        // value={text}
                        keyboardType="numeric"
                        placeholder="Phone"
                        placeholderTextColor="#96A2D5"
                        onChangeText={(e) => setUserPhone(e)}
                        value={userPhone}
                      />
                    </View>
                    <View style={Styles.inputIconBoxContainer}>
                      <IonIcon
                        style={{
                          fontSize: 23,
                          color: "#96A2D5",
                          marginRight: 10,
                        }}
                        name={"call-outline"}
                      />
                    </View>
                  </View>
                  <View style={Styles.inputContainer}>
                    <View style={Styles.inputBoxContainer}>
                      <TextInput
                        style={Styles.input}
                        // onChangeText={onChangeText}
                        // value={text}
                        placeholder="Password"
                        placeholderTextColor="#96A2D5"
                        onChangeText={(e) => setUserPassword(e)}
                        value={userPassword}
                      />
                    </View>
                    <View style={Styles.inputIconBoxContainer}>
                      <IonIcon
                        style={{
                          fontSize: 23,
                          color: "#96A2D5",
                          marginRight: 10,
                        }}
                        name={"lock-closed-outline"}
                      />
                    </View>
                  </View>
                </View>
                {error.status && (
                  <View
                    style={{
                      padding: 10,
                      backgroundColor: "red",
                      borderRadius: 10,
                      marginTop: 10,
                      textAlign: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        textAlign: "center",
                        justifyContent: "center",
                      }}
                    >
                      {error.msg}
                    </Text>
                  </View>
                )}

                <View>
                  <TouchableOpacity
                    onPress={() => {
                      if (userPhone.length < 9) {
                        console.log(1);
                        setError({
                          msg: "Please enter your valid phone number",
                          status: true,
                        });
                      } else if (userPassword.length <= 7) {
                        console.log(2);
                        setError({
                          msg: "Please enter your valid password",
                          status: true,
                        });
                      } else {
                        console.log(3);
                        isInputValid && submitBtn();
                      }
                    }}
                    style={
                      isInputValid
                        ? Styles.ValidBtnContainer
                        : Styles.btnContainer
                    }
                  >
                    <Text style={Styles.btnText}>
                      {loading ? "Loading..." : "Login"}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={Styles.desCon}>
                  <Text style={Styles.PageSwOr}>Or</Text>
                  <View>
                    <Text style={Styles.PageSw}>
                      If your don't have an account
                    </Text>
                  </View>
                  <View style={Styles.PageSwCon}>
                    <Text style={Styles.PageSw}>Please</Text>
                    <Text
                      onPress={() => setIsSignIn(true)}
                      style={Styles.PageSwSignLink}
                    >
                      {" "}
                      SIGN UP
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  container: {
    backgroundColor: "#040E29",
    height: "100%",
    paddingTop: 100,
  },
  BoxContainer: {
    alignItems: "center",
  },
  logo: {
    width: 190,
    height: 120,
  },
  title: {
    color: "#DBE7FF",

    fontSize: 40,
    marginTop: 30,
    marginBottom: 3,
  },
  input: {
    height: 40,
    fontSize: 18,
    paddingLeft: 10,
    color: "#96A2D5",
  },
  inputContainer: {
    marginTop: 15,
    flexDirection: "row",
    backgroundColor: "#232843",
    borderRadius: 40,
    width: 350,
    height: 50,
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputBoxContainer: {
    flex: 7,
  },
  inputIconBoxContainer: {
    flex: 1,
  },
  ValidBtnContainer: {
    marginTop: 65,
    flexDirection: "row",
    backgroundColor: "green",
    borderRadius: 40,
    width: 350,
    height: 60,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  btnContainer: {
    marginTop: 65,
    flexDirection: "row",
    backgroundColor: "#696B77",
    borderRadius: 40,
    width: 350,
    height: 60,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    fontSize: 24,
    fontWeight: "900",
    color: "#B8C7F9",
  },
  desCon: {
    alignItems: "center",
  },
  PageSwOr: {
    marginVertical: 20,
    color: "#858CAC",
    fontSize: 16,
  },
  PageSwCon: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    textAlign: "center",
  },
  PageSw: {
    color: "#858CAC",
    fontSize: 16,
  },
  PageSwSignLink: {
    fontWeight: "700",
    color: "#4868F0",
  },
});

export default Login;
