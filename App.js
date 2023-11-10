import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import BottomTabs from "./bottomTabsNavi/BottomTabs";
import { store } from "./redux/store";

export default function App() {
  console.log("this is new repo");

  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <NavigationContainer>
          <StatusBar barStyle="white" />
          <BottomTabs></BottomTabs>
        </NavigationContainer>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
