import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Animatable from "react-native-animatable";

const OfflineUiScreen = () => {
  const [animationStarted, setAnimationStarted] = useState(false);

  useEffect(() => {
    // Start the animation after a delay or when some condition is met
    setTimeout(() => {
      setAnimationStarted(true);
    }, 1000);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <AnimatedLogo></AnimatedLogo>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Uh-oh! It looks like you're offline.
        </Text>
        <Text>Check your connection, try again</Text>
      </View>
    </View>
  );
};

const AnimatedLogo = () => {
  return (
    <Animatable.Image
      animation="bounceIn"
      duration={5000} // Adjust the duration as needed
      style={{ width: 320, height: 253 }}
      source={require("../assets/offline.jpg")}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    alignContent: "center",
  },
});

export default OfflineUiScreen;
