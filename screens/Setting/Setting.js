import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import IonIcon from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";
import SettingPageHeader from "../../components/HeaderBar/SettingPageHeader";
import { useChangePasswordMutation } from "../../redux/apiSlice";

const Setting = ({ navigation }) => {
  // ** get current user info on redux store
  const userInfo = useSelector((state) => state.userInfo);

  // ** error state
  const [error, setError] = useState({
    msg: "",
    status: false,
  });

  // ? state for oldPass
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [conPass, setConPass] = useState("");

  const [loading, setLoading] = useState(false);

  const [changePassword] = useChangePasswordMutation();

  // ? submit change btn
  const submitChange = async () => {
    if (oldPass === "") {
      setError({ msg: "Please Enter your old password", status: true });
      return false;
    }
    if (newPass === "") {
      setError({ msg: "Please Enter your new password", status: true });
      return false;
    }
    if (newPass !== conPass) {
      setError({ msg: "Passwords do NOT match!", status: true });
      return false;
    }

    const payload = {
      phone: userInfo.currentUser.phone,
      oldPassword: oldPass,
      newPassword: newPass,
    };

    try {
      setLoading(true);
      const resData = await changePassword(payload);

      if (resData.error) {
        setError({ msg: "Old Password do NOT match!", status: true });
      } else {
        navigation.goBack();
      }

      setLoading(false);
      console.log(resData);
    } catch (error) {
      console.log("this is error ", error);
      setLoading(false);
    }
  };

  return (
    <View>
      <SettingPageHeader navigation={navigation}></SettingPageHeader>

      <View style={{ padding: 10, marginTop: 90 }}>
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
            // placeholder={userPhone}
            value={userInfo?.currentUser.phone}
            disabled
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={{ padding: 5, fontWeight: "bold" }}>Old Password :</Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "#EEEEEE",
              padding: 10,
              borderRadius: 8,
              backgroundColor: "#F9F9F9",
            }}
            placeholder={"Please enter your old password"}
            value={oldPass} // set the value prop to the state
            onChangeText={(text) => setOldPass(text)}
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={{ padding: 5, fontWeight: "bold" }}>New Password :</Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "#EEEEEE",
              padding: 10,
              borderRadius: 8,
              backgroundColor: "#F9F9F9",
            }}
            placeholder={"password"}
            value={newPass} // set the value prop to the state
            onChangeText={(text) => setNewPass(text)}
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={{ padding: 5, fontWeight: "bold" }}>
            confirm Password :
          </Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "#EEEEEE",
              padding: 10,
              borderRadius: 8,
              backgroundColor: "#F9F9F9",
            }}
            placeholder={"confirm password"}
            value={conPass} // set the value prop to the state
            onChangeText={(text) => setConPass(text)}
          />
        </View>

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

        <View style={{ marginTop: 10, alignItems: "flex-end" }}>
          <TouchableOpacity
            onPressIn={() => submitChange()}
            style={{
              borderRadius: 5,
              backgroundColor: "#040E29",
              padding: 10,
              width: 100,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => {
              //  submitStatus();
            }}
          >
            {loading ? (
              <View style={{ alignItems: "center" }}>
                <ActivityIndicator size="small" color="white" />
              </View>
            ) : (
              <Text style={{ color: "white", fontSize: 16 }}>Confirm</Text>
            )}

            <IonIcon
              style={{
                fontSize: 16,
                color: "white",
                marginLeft: 14,
              }}
              name={"send-sharp"}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Setting;
