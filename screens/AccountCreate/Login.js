import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
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
import { addCurrentUser } from "../../redux/userSlice";

const Login = ({ setIsSignIn }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [isInputValid, setIsInputValid] = useState(0);
  const [userPhone, setUserPhone] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState({
    status: false,
    msg: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsInputValid(userPhone.length >= 9 && userPassword.length >= 7 ? 1 : 0);
  }, [userPhone, userPassword]);

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: { display: "none" },
      tabBarVisible: false,
    });
    return () =>
      navigation.getParent()?.setOptions({
        tabBarStyle: undefined,
        tabBarVisible: undefined,
      });
  }, [navigation]);

  const [loginUser] = useLoginUserMutation();

  const validatePhone = (input) => {
    setPhoneError(input.length < 9 ? "Please enter a valid phone number" : "");
  };

  const validatePassword = (input) => {
    setPasswordError(
      input.length < 7 ? "Please enter 8 or more characters" : ""
    );
  };

  const submitBtn = async () => {
    try {
      setLoading(true);
      const resData = await loginUser({
        phone: userPhone.toString(),
        password: userPassword,
      });

      if (resData.data?.message === "Login successful") {
        const payload = {
          user: resData.data.userInfo.user,
          token: resData.data.userInfo.token,
        };

        dispatch(addCurrentUser(payload));

        navigation.navigate("LandingScreen", {
          data: Math.floor(10000 + Math.random() * 90000),
        });
        setLoading(false);
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

  return (
    <View>
      <StatusBar animated={true} backgroundColor="#FFFFFF" />
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
                        keyboardType="numeric"
                        placeholder="Phone"
                        placeholderTextColor="#96A2D5"
                        onChangeText={(e) => {
                          setUserPhone(e);
                          validatePhone(e);
                        }}
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
                  {phoneError !== "" && (
                    <Text
                      style={{ color: "red", marginLeft: 10, opacity: 0.7 }}
                    >
                      {phoneError}
                    </Text>
                  )}

                  <View style={Styles.inputContainer}>
                    <View style={Styles.inputBoxContainer}>
                      <TextInput
                        style={Styles.input}
                        placeholder="Password"
                        placeholderTextColor="#96A2D5"
                        onChangeText={(e) => {
                          setUserPassword(e);
                          validatePassword(e);
                        }}
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
                  {passwordError !== "" && (
                    <Text
                      style={{ color: "red", marginLeft: 10, opacity: 0.7 }}
                    >
                      {passwordError}
                    </Text>
                  )}
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
                      validatePhone(userPhone);
                      validatePassword(userPassword);

                      if (userPhone.length >= 9 && userPassword.length >= 7) {
                        submitBtn();
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
                      If you don't have an account
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
    paddingLeft: 15,
    color: "#96A2D5",
  },
  inputContainer: {
    marginTop: 15,
    flexDirection: "row",
    backgroundColor: "#232843",
    borderRadius: 40,
    width: Dimensions.get("window").width * 0.8,
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
    width: Dimensions.get("window").width * 0.8,
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
    width: Dimensions.get("window").width * 0.8,
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
