import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Image,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { RFValue } from "react-native-responsive-fontsize";
import IonIcon from "react-native-vector-icons/Ionicons";
import { useDispatch } from "react-redux";
import { useLoginUserMutation } from "../../../redux/apiSlice";
import { addCurrentUser } from "../../../redux/userSlice";

const LoginNewScreen = ({ setIsSignIn }) => {
  const [isPasswordShow, setIsPasswordShow] = useState(false);
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
    setPhoneError(input.length < 11 ? "Please enter a valid phone number" : "");
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
    <KeyboardAwareScrollView
      contentContainerStyle={{
        flexGrow: 1,
        paddingHorizontal: 20,
        justifyContent: "center",
      }}
      enableOnAndroid={true}
      extraScrollHeight={Platform.select({ android: 100, ios: 40 })}
    >
      {/* Logo */}
      <View
        style={{
          paddingTop: 80,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../../../assets/logoBlack.png")}
          style={{
            width: 245,
            height: 160,
          }}
        />
      </View>

      {/* Login Text */}
      <Text
        style={{
          color: "#040E29",
          fontSize: RFValue(24),
          fontWeight: "bold",
          marginTop: 40,
        }}
      >
        Login
      </Text>

      {/* Subtitle */}
      <Text
        style={{ color: "#040E29", fontSize: RFValue(12), marginBottom: 20 }}
      >
        Please Sign in to continue.
      </Text>

      {/* Phone Number Input with Error */}
      <View
        style={{
          marginTop: 10,
          flexDirection: "row",
          alignItems: "center",

          backgroundColor: "#F8F7FB",
          padding: 10,
          borderRadius: 10,
        }}
      >
        <IonIcon name="call-outline" size={RFValue(18)} color="#040E29" />
        <TextInput
          placeholder="Phone Number"
          style={{
            flex: 1,
            marginLeft: 10,
            color: "#040E29",
          }}
          keyboardType="numeric"
          onChangeText={(e) => {
            setUserPhone(e);
            validatePhone(e);
          }}
          value={userPhone}
        />
      </View>

      {phoneError !== "" && <Text style={{ color: "red" }}>{phoneError}</Text>}

      {/* Password Input with Error */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 10,
          backgroundColor: "#F8F7FB",
          padding: 10,
          borderRadius: 10,
        }}
      >
        <IonIcon
          name="lock-closed-outline"
          size={RFValue(18)}
          color="#040E29"
        />
        <TextInput
          placeholder="Password"
          secureTextEntry={!isPasswordShow}
          style={{
            flex: 1,
            marginLeft: 10,
            color: "#040E29",
          }}
          onChangeText={(e) => {
            setUserPassword(e);
            validatePassword(e);
          }}
          value={userPassword}
        />
        <TouchableOpacity onPress={() => setIsPasswordShow(!isPasswordShow)}>
          <IonIcon
            name={isPasswordShow ? "eye-outline" : "eye-off-outline"}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      {passwordError !== "" && (
        <Text style={{ color: "red" }}>{passwordError}</Text>
      )}

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
      {/* Sign In Button */}
      <TouchableOpacity
        style={{
          backgroundColor: "#040E29",
          borderRadius: 10,
          paddingVertical: 15,
          alignItems: "center",
          marginTop: 20,
        }}
        onPress={() => {
          validatePhone(userPhone);
          validatePassword(userPassword);

          if (userPhone.length >= 9 && userPassword.length >= 7) {
            submitBtn();
          }
        }}
      >
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: RFValue(13),
          }}
        >
          {loading ? "Loading..." : "Login"}
        </Text>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          marginTop: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "gray" }}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => setIsSignIn(true)}>
          <Text style={{ color: "#040E29", fontWeight: "bold" }}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default LoginNewScreen;
