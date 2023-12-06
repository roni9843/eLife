import React from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";

const BloodHeader = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor="#ED1F4C"
        barStyle="light-content"
        style="light"
      />

      <View
        style={{
          position: "absolute",
          top: StatusBar.currentHeight,
          //   borderBottomColor: "white",
          //  borderBottomWidth: 1,
          width: "100%",
          backgroundColor: "#ED1F4C",
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
            <Text style={{ fontSize: 16, color: "white" }}>Blood</Text>
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

export default BloodHeader;
