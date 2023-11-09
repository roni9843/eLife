import React from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";

const ViewTeacherBatchHeader = ({ navigation, submitBtn, id, data }) => {
  console.log("this is height -> ", StatusBar.currentHeight);

  return (
    <View style={styles.container}>
      <View
        style={{
          position: "absolute",
          top: StatusBar.currentHeight,
          borderBottomColor: "gray",
          borderBottomWidth: 1,
          width: "100%",
          backgroundColor: "#040E29",
          zIndex: 99,
          flex: 1,

          justifyContent: "center",
          alignItems: "center",
          padding: 15,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <IonIcon
                style={{
                  fontSize: 25,
                  fontWeight: "bold",
                  color: "white",
                  marginRight: 20,
                }}
                name={"arrow-back-outline"}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={{ fontSize: 16, color: "white" }}>
              Edit Your Profile
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              alignContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("EditAndAddBatch", {
                  status: "edit",
                  data: data,
                })
              }
            >
              <Text
                style={{
                  color: "white",
                  marginRight: 10,
                  fontSize: 16,
                  borderWidth: 1,
                  borderColor: "white",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 5,
                }}
              >
                Edit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
});

export default ViewTeacherBatchHeader;
