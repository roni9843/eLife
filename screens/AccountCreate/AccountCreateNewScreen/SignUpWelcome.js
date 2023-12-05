import React, { useEffect } from "react";
import { Image, Text, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const SignUpWelcome = ({ navigation }) => {
  // ? animation na navigate
  useEffect(() => {
    // Navigate to the login screen after the animation finishes ->
    setTimeout(() => {
      navigation.navigate("EditProfile", { screen: "Details" });
    }, 4300);
  }, []);

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <View
        style={{
          paddingTop: 140,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../../../assets/TickMark.gif")}
          style={{
            width: 200,
            height: 200,
          }}
        />
      </View>
      <View>
        <Text
          style={{
            fontSize: RFValue(20),
            fontWeight: "bold",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            marginTop: 20,
          }}
        >
          Successfully
        </Text>
        <Text
          style={{
            fontSize: RFValue(14),
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          Your Account has been
        </Text>
        <Text
          style={{
            fontSize: RFValue(14),
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          Created.
        </Text>
      </View>
    </View>
  );
};

export default SignUpWelcome;
