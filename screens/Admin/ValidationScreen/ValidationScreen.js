import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useFindAllUserFromAdminMutation } from "../../../redux/apiSlice";
import ValidationScreenHeader from "./ValidationScreenHeader";

const UserCard = ({ user, navigation }) => {
  const { name, phone, verified, profilePic } = user;

  const handleVerifyUser = () => {
    navigation.navigate("VerifyScreen", {
      data: user,
    });
  };

  return (
    <View style={styles.userCard}>
      {profilePic ? (
        <Image source={{ uri: profilePic }} style={styles.profilePic} />
      ) : (
        <View style={styles.defaultProfilePic} />
      )}
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{name}</Text>
        <Text style={styles.userPhone}>{phone}</Text>
        {verified ? (
          <Text style={styles.greenSign}>Verified</Text>
        ) : (
          <Text style={styles.redSign}>Not Verified</Text>
        )}
      </View>
      {!verified ? (
        <TouchableOpacity
          style={styles.verifyButton}
          onPress={handleVerifyUser}
        >
          <Text style={styles.verifyButtonText}>Verify</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.unVerifyButton}
          onPress={handleVerifyUser}
        >
          <Text style={styles.verifyButtonText}>Un Verify</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dashboard: {
    padding: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  userCard: {
    width: "48%", // Adjust the width as needed
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 3,
  },
  profilePic: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  defaultProfilePic: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: "#ccc",
  },
  userInfo: {
    padding: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  userPhone: {
    fontSize: 14,
    color: "#555",
  },
  greenSign: {
    color: "green",
    fontWeight: "bold",
  },
  redSign: {
    color: "red",
    fontWeight: "bold",
  },
  verifyButton: {
    backgroundColor: "#040E29",
    padding: 10,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    alignItems: "center",
  },
  unVerifyButton: {
    backgroundColor: "red",
    padding: 10,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    alignItems: "center",
  },
  verifyButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

const ValidationScreen = ({ navigation, route }) => {
  const [findAllUserFromAdmin] = useFindAllUserFromAdminMutation();

  const [search, setSearch] = useState("");

  const [user, setUser] = useState([]);

  useEffect(() => {
    // Initial API call without any search query
    callApi("");
  }, [route?.params?.data]);

  const callApi = async (query) => {
    try {
      const payload = {
        query: query,
      };

      const result = await findAllUserFromAdmin(payload);
      setUser(result.data.users);

      console.log("result -> ", result);
    } catch (error) {
      console.error("Error calling API:", error);
    }
  };

  const handleSearch = () => {
    // Call API with the search query when the submit button is pressed
    callApi(search);
  };

  return (
    <View>
      <ValidationScreenHeader navigation={navigation}></ValidationScreenHeader>
      <ScrollView>
        <View style={{ padding: 10, marginTop: 90 }}>
          {/* Search input */}
          <TextInput
            placeholder="Enter name or phone number"
            value={search}
            onChangeText={(text) => setSearch(text)}
            style={{
              marginBottom: 10,
              padding: 10,
              borderColor: "gray",
              borderWidth: 1,
            }}
          />

          {/* Submit button */}
          {/* Submit button */}
          <TouchableOpacity
            style={{
              backgroundColor: "#040E29",
              padding: 10,
              alignItems: "center",
              borderRadius: 5,
            }}
            onPress={handleSearch}
          >
            <Text style={{ color: "white", fontSize: 16 }}>Search</Text>
          </TouchableOpacity>

          <View style={{ marginTop: 10 }}>
            <ScrollView contentContainerStyle={styles.dashboard}>
              {user.map((user) => (
                <UserCard key={user._id} user={user} navigation={navigation} />
              ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ValidationScreen;
