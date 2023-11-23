import React from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";

const CreateBatchHeader = ({ navigation }) => {
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

          //   justifyContent: "center",
          //   alignItems: "center",
          padding: 15,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "start",
            alignItems: "center",
          }}
        >
          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate("LandingScreen")}
            >
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
            <Text style={{ fontSize: 16, color: "white" }}>Tuition</Text>
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

export default CreateBatchHeader;
