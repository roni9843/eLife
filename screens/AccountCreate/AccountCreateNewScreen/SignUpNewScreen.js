import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { RFValue } from "react-native-responsive-fontsize";
import IonIcon from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import {
  usePostOtpMutation,
  usePostUserMutation,
} from "../../../redux/apiSlice";
import { addCurrentUser } from "../../../redux/userSlice";

const SignUpNewScreen = ({ setIsSignIn }) => {
  // * redux store user
  const userInfo = useSelector((state) => state.userInfo);

  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [isInputValid, setIsInputValid] = useState(0);
  const [userPhone, setUserPhone] = useState("");
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [phoneError, setPhoneError] = useState(
    "Please enter a valid phone number"
  );
  const [nameError, setNameError] = useState(
    "Please enter at lest 3 characters"
  );
  const [passwordError, setPasswordError] = useState(
    "Please enter 8 or more characters"
  );
  const [error, setError] = useState({
    msg: "",
    status: false,
  });

  useEffect(() => {
    setIsInputValid(
      phoneError === false && nameError === false && passwordError === false
        ? 1
        : 0
    );
  }, [userPhone, userName, userPassword]);

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

  const [postUser] = usePostUserMutation();
  const [postOtp] = usePostOtpMutation();

  const validatePhone = (input) => {
    setPhoneError(
      !isValidBangladeshiNumber(input)
        ? "Please enter a valid phone number"
        : false
    );
  };

  /**
   * Checks if the given phone number is a valid Bangladeshi mobile number.
   * Valid formats: +8801712345678, 8801712345678, 01712345678
   *
   * @param {string} number - The phone number to validate.
   * @returns {boolean} - True if the number is a valid Bangladeshi mobile number, false otherwise.
   */
  const isValidBangladeshiNumber = (number) => {
    // Regular expression for validating Bangladeshi mobile numbers
    const bdNumberRegex = /^(?:\+88|88)?(01[3-9]\d{8})$/;

    // Check if the number matches the pattern
    return bdNumberRegex.test(number);
  };

  const validateName = (input) => {
    setNameError(
      input.length <= 3 ? "Please enter at lest 3 characters " : false
    );
  };

  const validatePassword = (input) => {
    setPasswordError(
      input.length < 7 ? "Please enter 8 or more characters" : false
    );
  };

  const [isOtp, setIsOtp] = useState(false);
  const [otpDigits, setOtpDigits] = useState(["", "", "", ""]);
  const [errorOtp, setErrorOtp] = useState("");
  const inputRefs = useRef([]);

  const [correctOTP, setCorrectOtp] = useState(null);

  const handleVerifyOTP = () => {
    const enteredOTP = otpDigits.join("");

    if (/^\d{4}$/.test(enteredOTP)) {
      console.log("this is inside matching--> ", enteredOTP, correctOTP);
      if (parseInt(enteredOTP) === correctOTP) {
        console.log("this is inside matching ", enteredOTP === correctOTP);

        submitToCreateNewUser();
      } else {
        setErrorOtp("Invalid OTP. Please try again.");
      }
    } else {
      setErrorOtp("Please enter a 4-digit OTP.");
    }
  };

  const handleDigitChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const newOtpDigits = [...otpDigits];
      newOtpDigits[index] = value;
      setOtpDigits(newOtpDigits);
      setError("");

      // Move focus to the next input field
      if (index < otpDigits.length - 1 && value !== "") {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyPress = (index, event) => {
    if (event.nativeEvent.key === "Backspace" && index > 0) {
      // Move focus to the previous input field on backspace press
      inputRefs.current[index - 1].focus();
    }
  };

  const submitToGetOtp = async () => {
    setLoading(true);
    try {
      const data = await postOtp({
        name: userName,
        phone: userPhone,
        password: userPassword,
      });

      if (data?.error) {
        setLoading(false);

        setError({
          status: true,
          msg: "This phone number already exists!!!",
        });
      } else {
        setCorrectOtp(data.data.message);

        console.log("this is otp : ", data);
        setLoading(false);
        setIsOtp(true);
      }
    } catch (error) {
      console.log("this is error 3,", error);
    }
  };

  const submitToCreateNewUser = async () => {
    setLoading(true);
    try {
      const data = await postUser({
        name: userName,
        phone: userPhone,
        password: userPassword,
      });

      if (data?.error) {
        setLoading(false);

        setError({
          status: true,
          msg: "This phone number already exists!!!",
        });
      } else {
        const payload = {
          user: data.data.user.info,
          token: data.data.user.token,
        };

        dispatch(addCurrentUser(payload));

        navigation.navigate("SignUpWelcome");
        setLoading(false);
      }
    } catch (error) {
      console.log("this is error 3,", error);
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingBottom: 50,
        justifyContent: "center",
      }}
      enableOnAndroid={true}
      extraScrollHeight={Platform.select({ android: 100, ios: 40 })}
    >
      <View style={{ display: isOtp ? "none" : "block" }}>
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
          Register
        </Text>

        {/* Subtitle */}
        <Text
          style={{ color: "#040E29", fontSize: RFValue(12), marginBottom: 20 }}
        >
          Please register in to continue.
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
          <IonIcon name="person-outline" size={RFValue(18)} color="#040E29" />
          <TextInput
            placeholder="Name"
            style={{
              flex: 1,
              marginLeft: 10,
              color: "#040E29",
            }}
            onChangeText={(e) => {
              setUserName(e);
              validateName(e);
            }}
            value={userName}
          />
        </View>

        {nameError !== false && (
          <Text style={{ color: "red" }}>{nameError}</Text>
        )}

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
            onChangeText={(e) => {
              setUserPhone(e);
              validatePhone(e);
            }}
            value={userPhone}
            keyboardType="numeric"
          />
        </View>

        {phoneError !== false && (
          <Text style={{ color: "red" }}>{phoneError}</Text>
        )}

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

        {passwordError !== false && (
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
            validateName(userName);
            validatePassword(userPassword);

            if (
              phoneError === false &&
              nameError === false &&
              passwordError === false
            ) {
              userInfo.isOtp === true
                ? submitToGetOtp()
                : submitToCreateNewUser();
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
            {loading ? "Loading..." : "Sign Up"}
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
          <Text style={{ color: "gray" }}>Already have an account? </Text>
          <TouchableOpacity onPress={() => setIsSignIn(false)}>
            <Text style={{ color: "#040E29", fontWeight: "bold" }}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ display: !isOtp ? "none" : "block" }}>
        <View
          style={{
            paddingTop: 100,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../../assets/otpImage.png")}
            style={{
              width: 245,
              height: 260,
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
          Enter Verification code
        </Text>

        {/* Subtitle */}
        <Text
          style={{ color: "#040E29", fontSize: RFValue(12), marginBottom: 20 }}
        >
          We are automatically detecting a SMS send to your mobile number{" "}
          {userPhone.replace(/^(\d{3})\d+(\d{3})$/, "$1*****$2")}
        </Text>

        <View style={styles.container}>
          <View style={styles.innerContainer}>
            <View style={styles.otpContainer}>
              {otpDigits.map((digit, index) => (
                <View key={index} style={styles.inputDigitContainer}>
                  <TextInput
                    style={styles.inputDigit}
                    keyboardType="numeric"
                    maxLength={1}
                    value={digit}
                    onChangeText={(text) => handleDigitChange(index, text)}
                    onKeyPress={(event) => handleKeyPress(index, event)}
                    ref={(ref) => (inputRefs.current[index] = ref)}
                  />
                  <View style={styles.borderBottom} />
                </View>
              ))}
            </View>

            {errorOtp !== "" ? (
              <Text style={styles.errorText}>{errorOtp}</Text>
            ) : null}

            <TouchableOpacity
              style={styles.verifyButton}
              onPress={() => {
                if (loading === false) console.log("click");
                handleVerifyOTP();
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: RFValue(13),
                }}
              >
                {loading ? "Loading..." : "Verify OTP"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default SignUpNewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  innerContainer: {
    width: "80%",
    maxWidth: 300,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  inputDigitContainer: {
    position: "relative",
  },
  inputDigit: {
    borderWidth: 0,
    borderColor: "transparent",
    borderRadius: 8,
    padding: 10,
    fontSize: 18,
    width: 40,
    textAlign: "center",
    backgroundColor: "#F8F7FB",
  },
  borderBottom: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 1,
    backgroundColor: "#000",
  },
  verifyButton: {
    backgroundColor: "#040E29",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  verifyButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
  },
});
