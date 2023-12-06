import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";

const HomePageTopButton = ({ navigation }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.buttonContainer}
    >
      <TouchableOpacity
        // onPress={() =>
        // //  clearUserInfo().then((e) => console.log("this is clear -> ", e))
        // }
        style={styles.buttonActive}
      >
        <Text style={styles.buttonText}>Feed 📰</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={
          () => navigation.navigate("ViewTuitionBatch")
          // clearUserInfo().then((e) =>
          //   console.log("this is clear -> ", e)
          // )

          // console.log("ee", userInfo.allStatusPost)
        }
        style={styles.button}
      >
        <Text style={styles.buttonText}>Tuition 👨‍🏫</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("BloodScreen")}
      >
        <Text style={styles.buttonText}>Blood 🩸</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    paddingLeft: 0,
    marginBottom: 5,
  },
  buttonActive: {
    backgroundColor: "#ffffff", // Change the background color to your preference
    padding: 10,
    margin: 5,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: "#040E29",
  },
  button: {
    backgroundColor: "#ffffff", // Change the background color to your preference
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: "#040E29", // Change the text color to your preference
    fontWeight: "bold",
  },
});

export default HomePageTopButton;
