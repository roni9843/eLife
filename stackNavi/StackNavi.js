import {
  CardStyleInterpolators,
  TransitionSpecs,
  createStackNavigator,
} from "@react-navigation/stack";
import React from "react";
import { Easing, StyleSheet, Text, View } from "react-native";
import AccountCreate from "../screens/AccountCreate/AccountCreate";
import LandingScreen from "../screens/LandingScreen";
import ViewProfile from "../screens/Profile/ViewProfile";

import LikesList from "../components/StatusComponent/LikesList";
import Blood from "../screens/Blood/Blood";
import AddStudent from "../screens/CreateBatch/AddStudent/AddStudent";
import AddStudentFee from "../screens/CreateBatch/AddStudentFee/AddStudentFee";
import StudentListFee from "../screens/CreateBatch/AddStudentFee/StudentListFee";
import CreateBatchScreen from "../screens/CreateBatch/CreateBatchScreen";
import EditAndAddBatch from "../screens/CreateBatch/EditAndAddBatch";
import ViewTeacherBatch from "../screens/CreateBatch/ViewTeacherBatch";
import OfflineUiScreen from "../screens/OfflineUiScreen";
import EditProfile from "../screens/Profile/EditProfile";
import Setting from "../screens/Setting/Setting";
import ViewTuitionBatch from "../screens/ViewTuitionBatch/ViewTuitionBatch";
import ViewTuitionBatchDetails from "../screens/ViewTuitionBatch/ViewTuitionBatchDetails";
import VisitProfile from "../screens/VisitProfile/VisitProfile";
import WelcomeScreen from "../screens/WelcomeScreen";
import AddPost from "./../screens/AddPost";

const Stack = createStackNavigator();

function DetailsScreen() {
  return (
    <View style={styles.container}>
      <Text>Details Screen</Text>
    </View>
  );
}

const StackNavi = ({ navigation }) => {
  const config = {
    animation: "spring",
    config: {
      stiffness: 1500,
      damping: 50,
      mass: 5,
      overshootClamping: false,
      restDisplacementThreshold: 0.5,
      restSpeedThreshold: 0.5,
    },
  };

  const closeConfig = {
    animation: "timing",
    config: {
      duration: 200,
      easing: Easing.linear,
    },
  };

  const customTransition = {
    gestureEnabled: false,
    gestureDirection: "horizontal",
    transitionSpec: {
      open: TransitionSpecs.TransitionIOSSpec,
      close: TransitionSpecs.TransitionIOSSpec,
    },
    cardStyleInterpolator: ({ current, next, layouts }) => {
      return {
        cardStyle: {
          transform: [
            {
              translateX: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [layouts.screen.width, 0],
              }),
            },
            {
              rotate: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: ["180deg", "0deg"],
              }),
            },
            {
              scale: next
                ? next.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 0.7],
                  })
                : 1,
            },
          ],
        },
        opacity: current.opacity,
      };
    },
  };

  const horizontalAnimation = {
    cardStyleInterpolator: ({ current, layouts }) => {
      return {
        cardStyle: {
          transform: [
            {
              translateX: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [layouts.screen.width, 0],
              }),
            },
          ],
        },
      };
    },
    title: "Edit Profile",

    headerStyle: {
      backgroundColor: "#040E29",
    },
    headerTintColor: "#fff",
    headerShown: false,
  };

  return (
    <Stack.Navigator
      screenOptions={{
        // gestureEnabled: true,
        gestureDirection: "horizontal",
      }}
      initialRouteName={"Welcome"}
    >
      <Stack.Screen
        options={{
          headerShown: false,
          headerLeft: null,
          //   tabBarIcon: () => null,
        }}
        name="LandingScreen"
        component={LandingScreen}
      />
      <Stack.Screen
        options={{
          gestureDirection: "vertical",
          transitionSpec: {
            open: config,
            close: closeConfig,
          },
          cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
          headerTitle: "Likes",
        }}
        name="LikesList"
        component={LikesList}
      />
      <Stack.Screen name="Profile" component={DetailsScreen} />
      <Stack.Screen
        options={{ headerShown: false, gestureEnabled: false }}
        name="AccountCreate"
        component={AccountCreate}
      />
      <Stack.Screen
        options={{
          gestureDirection: "vertical",
          transitionSpec: {
            open: config,
            close: closeConfig,
          },
          cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
          headerTitle: "Post",
        }}
        name="AddPost"
        component={AddPost}
      />
      <Stack.Screen
        options={horizontalAnimation}
        name="EditProfile"
        component={EditProfile}
      />

      <Stack.Screen
        options={{
          headerShown: false,
          tabBarOptions: {
            visible: false,
          },
          tabBarStyle: {
            display: "none",
          },
        }}
        screenOptions={{
          tabBarIconStyle: { display: "none" },
        }}
        name="Welcome"
        component={WelcomeScreen}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        // options={{
        //   title: "Profile",

        //   headerStyle: {
        //     backgroundColor: "#040E29",
        //   },
        //   // headerTintColor: "#fff",
        //   cardStyleInterpolator:
        //     CardStyleInterpolators.forFadeFromBottomAndroid,
        //   headerRight: () => (
        //     <TouchableOpacity
        //       onPress={() => navigation.navigate("EditProfile")}
        //     >
        //       <IonIcon
        //         style={{
        //           fontSize: 25,
        //           fontWeight: "bold",
        //           color: "white",
        //           marginRight: 20,
        //         }}
        //         name={"create-outline"}
        //       />
        //     </TouchableOpacity>
        //   ),
        // }}
        name="BloodScreen"
        component={Blood}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="ViewTuitionBatch"
        component={ViewTuitionBatch}
      />
      <Stack.Screen
        options={{
          gestureDirection: "vertical",
          transitionSpec: {
            open: config,
            close: closeConfig,
          },
          cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
          headerTitle: "Add Fee",
        }}
        name="ViewTuitionBatchDetails"
        component={ViewTuitionBatchDetails}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        // options={{
        //   title: "Profile",

        //   headerStyle: {
        //     backgroundColor: "#040E29",
        //   },
        //   // headerTintColor: "#fff",
        //   cardStyleInterpolator:
        //     CardStyleInterpolators.forFadeFromBottomAndroid,
        //   headerRight: () => (
        //     <TouchableOpacity
        //       onPress={() => navigation.navigate("EditProfile")}
        //     >
        //       <IonIcon
        //         style={{
        //           fontSize: 25,
        //           fontWeight: "bold",
        //           color: "white",
        //           marginRight: 20,
        //         }}
        //         name={"create-outline"}
        //       />
        //     </TouchableOpacity>
        //   ),
        // }}
        name="ViewProfile"
        component={ViewProfile}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        // options={{
        //   title: "Profile",

        //   headerStyle: {
        //     backgroundColor: "#040E29",
        //   },
        //   // headerTintColor: "#fff",
        //   cardStyleInterpolator:
        //     CardStyleInterpolators.forFadeFromBottomAndroid,
        //   headerRight: () => (
        //     <TouchableOpacity
        //       onPress={() => navigation.navigate("EditProfile")}
        //     >
        //       <IonIcon
        //         style={{
        //           fontSize: 25,
        //           fontWeight: "bold",
        //           color: "white",
        //           marginRight: 20,
        //         }}
        //         name={"create-outline"}
        //       />
        //     </TouchableOpacity>
        //   ),
        // }}
        name="Setting"
        component={Setting}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        // options={{
        //   title: "Profile",

        //   headerStyle: {
        //     backgroundColor: "#040E29",
        //   },
        //   // headerTintColor: "#fff",
        //   cardStyleInterpolator:
        //     CardStyleInterpolators.forFadeFromBottomAndroid,
        //   headerRight: () => (
        //     <TouchableOpacity
        //       onPress={() => navigation.navigate("EditProfile")}
        //     >
        //       <IonIcon
        //         style={{
        //           fontSize: 25,
        //           fontWeight: "bold",
        //           color: "white",
        //           marginRight: 20,
        //         }}
        //         name={"create-outline"}
        //       />
        //     </TouchableOpacity>
        //   ),
        // }}
        name="VisitProfile"
        component={VisitProfile}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          tabBarOptions: {
            visible: false,
          },
          tabBarStyle: {
            display: "none",
          },
          gestureEnabled: false,
        }}
        screenOptions={{
          tabBarIconStyle: { display: "none" },
        }}
        name="OfflineScreen"
        component={OfflineUiScreen}
      />

      <Stack.Screen
        options={{
          headerShown: false,
          tabBarOptions: {
            visible: false,
          },
          tabBarStyle: {
            display: "none",
          },
          gestureEnabled: false,
        }}
        screenOptions={{
          tabBarIconStyle: { display: "none" },
        }}
        name="CreateBatchScreen"
        component={CreateBatchScreen}
      />
      <Stack.Screen
        options={{
          gestureDirection: "vertical",
          transitionSpec: {
            open: config,
            close: closeConfig,
          },
          cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
          headerTitle: "Create a batch",
        }}
        name="EditAndAddBatch"
        component={EditAndAddBatch}
      />
      <Stack.Screen
        options={{
          gestureDirection: "vertical",
          transitionSpec: {
            open: config,
            close: closeConfig,
          },
          cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
          headerTitle: "Add Student",
        }}
        name="AddStudent"
        component={AddStudent}
      />
      <Stack.Screen
        options={{
          gestureDirection: "vertical",
          transitionSpec: {
            open: config,
            close: closeConfig,
          },
          cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
          headerTitle: "Select Student",
        }}
        name="StudentListFee"
        component={StudentListFee}
      />
      <Stack.Screen
        options={{
          gestureDirection: "vertical",
          transitionSpec: {
            open: config,
            close: closeConfig,
          },
          cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
          headerTitle: "Add Fee",
        }}
        name="AddStudentFee"
        component={AddStudentFee}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          tabBarOptions: {
            visible: false,
          },
          tabBarStyle: {
            display: "none",
          },
          gestureEnabled: false,
        }}
        screenOptions={{
          tabBarIconStyle: { display: "none" },
        }}
        name="ViewTeacherBatch"
        component={ViewTeacherBatch}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default StackNavi;
