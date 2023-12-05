import moment from "moment";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useCreateVerifyMutation } from "../../../redux/apiSlice";

const VerifyScreen = ({ route, navigation }) => {
  const userData = route.params.data;

  // State for text fields
  const [recipient, setRecipient] = useState(userData.phone);
  const [message, setMessage] = useState(
    `Dear ${userData.name},\n\nWe are delighted to inform you that your profile has successfully undergone verification. Congratulations🎉 on achieving this milestone!\n\nBest regards,\nelife`
  );

  const [createVerify, { isLoading }] = useCreateVerifyMutation();

  // ... (other state variables)

  const [loading, setLoading] = useState(false);

  const handleVerifyButtonPress = () => {
    Alert.alert(
      !userData.verified ? "Confirm Verification" : "Confirm Unverification",
      !userData.verified
        ? `Do you want to verify ${userData.name}'s profile?`
        : `Do you want to unverify ${userData.name}'s profile?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: !userData.verified ? "Verify" : "Unverify",
          onPress: () => {
            // Handle the verification logic here
            setLoading(true); // Set loading to true when the button is pressed
            submitVerify();
          },
        },
      ]
    );
  };

  const submitVerify = async () => {
    try {
      const payload = {
        recipient: userData.phone,
        message: `Dear ${userData.name},\n\nWe are delighted to inform you that your profile has successfully undergone verification. Congratulations🎉 on achieving this milestone!\n\nBest regards,\nelife`,
        verify: userData.verified === true ? false : true,
      };

      const result = await createVerify(payload);

      navigation.navigate("validationScreen", {
        data: Math.floor(10000 + Math.random() * 90000),
      });
    } catch (error) {
      console.error("Verification failed", error);
    } finally {
      setLoading(false); // Set loading back to false after verification is complete
    }
  };

  // .
  const verifyButtonStyle = userData.verified
    ? styles.verifyButtonGreen
    : styles.verifyButtonRed;

  const verifyButtonTextStyle = userData.verified
    ? styles.verifyButtonTextGreen
    : styles.verifyButtonTextRed;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>User Verification</Text>
      </View>

      <View style={styles.content}>
        {/* User Profile Picture */}
        <View style={styles.profileContainer}>
          {userData.profilePic ? (
            <Image
              source={{ uri: userData.profilePic }}
              style={styles.profilePic}
            />
          ) : (
            <View style={styles.defaultProfilePic}>
              <Text style={styles.defaultProfileText}>No Profile Picture</Text>
            </View>
          )}
        </View>

        {/* User Information */}
        <View style={styles.userInfo}>
          <Text style={styles.userInfoText}>Name: {userData.name}</Text>
          <Text style={styles.userInfoText}>Phone: {userData.phone}</Text>
          <Text style={styles.userInfoText}>Role: {userData.role}</Text>
          <Text style={styles.userInfoText}>
            Created At:{" "}
            {moment(userData.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
          </Text>
          <Text style={styles.userInfoText}>Mark As: {userData.markAs}</Text>
          <Text style={styles.userInfoText}>
            Verified: {userData.verified ? "Yes" : "No"}
          </Text>
        </View>

        {/* Text Fields for Recipient and Message */}
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Recipient"
            value={recipient}
            onChangeText={(text) => setRecipient(text)}
          />
          <TextInput
            style={styles.textInputMultiLine}
            placeholder="Message"
            value={message}
            onChangeText={(text) => setMessage(text)}
            multiline
            numberOfLines={10} // Limit to 10 lines
          />
        </View>

        {/* Verify Button */}
        <TouchableOpacity
          style={[styles.verifyButton, verifyButtonStyle]}
          onPress={handleVerifyButtonPress}
          disabled={isLoading || loading} // Disable the button when loading
        >
          {isLoading || loading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={[styles.verifyButtonText, verifyButtonTextStyle]}>
              Verify User
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  header: {
    backgroundColor: "#3498db",
    padding: 15,
    alignItems: "center",
  },
  headerText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  profileContainer: {
    marginBottom: 20,
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  defaultProfilePic: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#95a5a6",
    alignItems: "center",
    justifyContent: "center",
  },
  defaultProfileText: {
    color: "#ecf0f1",
  },
  userInfo: {
    marginBottom: 20,
  },
  userInfoText: {
    fontSize: 16,
    marginBottom: 5,
    color: "#34495e",
  },
  verifyButton: {
    backgroundColor: "#2ecc71", // Green color for verified
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  verifyButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  verifyButtonRed: {
    backgroundColor: "#e74c3c", // Red color for not verified
  },
  verifyButtonTextRed: {
    color: "white",
  },

  textInputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  textInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },

  textInputMultiLine: {
    height: 120, // Adjust the height based on your design
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    paddingTop: 10,
  },
});

export default VerifyScreen;
