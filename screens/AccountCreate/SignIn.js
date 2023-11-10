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
import { usePostUserMutation } from "../../redux/apiSlice";
import { addCurrentUser } from "../../redux/userSlice";

const SignIn = ({ setIsSignIn }) => {
  const navigation = useNavigation();

  // ? redux dispatch
  const dispatch = useDispatch();

  // ? is input valid
  const [isInputValid, setIsInputValid] = useState(0);

  // ? state for user phone number
  const [userPhone, setUserPhone] = useState("");

  // ? state for user name
  const [userName, setUserName] = useState("");

  // ? state for user password
  const [userPassword, setUserPassword] = useState("");

  const [loading, setLoading] = useState(false);

  // ? state for error msg
  const [error, setError] = useState({
    msg: "",
    status: false,
  });

  // * check is user valid
  useEffect(() => {
    if (userPhone.length >= 9 && userName && userPassword.length >= 7) {
      setIsInputValid(1);
    } else {
      setIsInputValid(0);
    }
  }, [userPhone, userName, userPassword]);

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

  // ? post user
  const [postUser] = usePostUserMutation();

  const submitBtn = async () => {
    setLoading(true);
    try {
      const data = await postUser({
        name: userName,
        phone: userPhone,
        password: userPassword,
      });

      console.log("tt 2 ewr", data);

      if (data?.error) {
        setLoading(false);

        setError({
          status: true,
          msg: "This phone number already exist!!!",
        });
      } else {
        const payload = {
          user: data.data.user.info,
          token: data.data.user.token,
        };

        dispatch(addCurrentUser(payload));

        navigation.navigate("EditProfile", { screen: "Details" });
        setLoading(false);
      }
    } catch (error) {
      console.log("this is error 3,", error);
    }
  };

  return (
    <View>
      <StatusBar animated={true} backgroundColor="#040E29" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={Styles.container}
      >
        <ScrollView contentContainerStyle={Styles.scrollContainer}>
          <View style={Styles.container}>
            <View style={Styles.BoxContainer}>
              <View>
                <Image
                  style={Styles.logo}
                  source={require("../../assets/logo.png")}
                />
              </View>
              <View>
                <Text style={Styles.title}>Sign Up</Text>
              </View>
              <View style={{ marginBottom: 5 }}>
                <Image source={require("../../assets/LineSignUp.png")} />
              </View>
              <View>
                <View>
                  <View style={Styles.inputContainer}>
                    <View style={Styles.inputBoxContainer}>
                      <TextInput
                        style={Styles.input}
                        // onChangeText={onChangeText}
                        // value={text}
                        placeholder="Phone"
                        placeholderTextColor="#96A2D5"
                        onChangeText={(e) => setUserPhone(e)}
                        value={userPhone}
                        keyboardType="numeric"
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
                        placeholder="Name"
                        placeholderTextColor="#96A2D5"
                        onChangeText={(e) => setUserName(e)}
                        value={userName}
                      />
                    </View>
                    <View style={Styles.inputIconBoxContainer}>
                      <IonIcon
                        style={{
                          fontSize: 23,
                          color: "#96A2D5",
                          marginRight: 10,
                        }}
                        name={"person-outline"}
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
                    // disabled={isInputValid ? false : true}
                    onPress={() => {
                      if (userPhone.length < 9) {
                        console.log(1);
                        setError({
                          msg: "Please enter your valid phone number",
                          status: true,
                        });
                      } else if (userName.length <= 3) {
                        console.log(2);
                        setError({
                          msg: "Please enter your name",
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
                      {loading ? "Loading..." : "Sign In"}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={Styles.desCon}>
                  <Text style={Styles.PageSwOr}>Or</Text>
                  <View>
                    <Text style={Styles.PageSw}>If your have an account</Text>
                  </View>
                  <View style={Styles.PageSwCon}>
                    <Text style={Styles.PageSw}>Please</Text>
                    <Text
                      onPress={() => setIsSignIn(false)}
                      style={Styles.PageSwSignLink}
                    >
                      {" "}
                      Login
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
    paddingTop: 50,
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
  inputOptionContainer: {
    marginTop: 15,
    flexDirection: "row",
    backgroundColor: "#696B77",
    borderRadius: 40,
    width: 350,
    height: 60,
    alignItems: "center",
    justifyContent: "space-between",
  },
  StudentBtnContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#0B2F4F",
    justifyContent: "center",
    height: 60,
    borderRadius: 40,
  },
  StudentBtnText: {
    color: "#96A2D5",
    fontSize: 18,
  },
  TeacherBtnContainer: {
    flex: 1,
    alignItems: "center",
  },
  TeacherBtnText: {
    color: "#CAD4FF",
    fontSize: 18,
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
    paddingBottom: 50,
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

export default SignIn;