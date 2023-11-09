import moment from "moment";
import { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuProvider,
  MenuTrigger,
} from "react-native-popup-menu";
import { useDispatch } from "react-redux";

import { ActivityIndicator, Alert } from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";
import { useDeleteOnePostMutation } from "../../redux/apiSlice";
import { addfetchForAllUserAndAllStatusData } from "../../redux/userSlice";

const ViewPageStatus = ({ item, uName, uImage, rParam, navigation }) => {
  const [loadingPage, setLoadingPage] = useState(false);

  const [timeAgo, setTimeAgo] = useState("");

  const [deleteOnePost] = useDeleteOnePostMutation();

  // ? redux dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    const updateRelativeTime = () => {
      const timeString = moment(item.createdAt).fromNow();
      setTimeAgo(timeString);
    };

    updateRelativeTime(); // Initial update

    // Update the relative time every minute
    const intervalId = setInterval(updateRelativeTime, 60000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [item.createdAt]);

  const alertFunc = () => {
    Alert.alert(
      "Confirmation",
      "Are you sure you want to delete status?",
      [
        {
          text: "Cancel",
          style: "cancel",
          onPress: () => {
            // navigation.navigate(optionOneNavigatefetchForAllUserAndAllStatusData);
          },
        },
        {
          text: "Delete",
          style: "destructive",
          // If the user confirmed, then we dispatch the action we blocked earlier
          // This will continue the action that had triggered the removal of the screen
          onPress: () => deleteThisStatus(),
        },
      ]
      // { cancelable: false }
    );
  };

  const deleteThisStatus = async () => {
    try {
      setTimeout(() => {
        setLoadingPage(true);
      }, 1000);

      const data = await deleteOnePost({
        id: item._id,
      });

      console.log("delete -> ", data);

      dispatch(
        addfetchForAllUserAndAllStatusData(
          Math.floor(10000 + Math.random() * 90000)
        )
      );

      setLoadingPage(false);

      // Optionally, you can perform additional actions after a successful deletion
    } catch (error) {
      // Handle error, e.g., show an alert
      console.error("Error deleting user:", error);
    }
  };

  return (
    <View
      style={{
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#E0E0E0",
        padding: 10,
        marginTop: 10,
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          marginTop: rParam && -10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {uImage && uImage !== null ? (
            <Image
              style={{
                borderRadius: 100,
                height: 40,
                width: 40,
                borderWidth: 1,
                borderColor: "#040E29",
              }}
              source={{
                // uri: image,
                uri: uImage,
              }}
            />
          ) : (
            <View>
              <IonIcon
                style={{
                  fontSize: 40,
                  color: "black",
                }}
                name={"person-circle-outline"}
              />
            </View>
          )}

          <View style={{ marginLeft: 10 }}>
            <View>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>{uName}</Text>
              <Text style={{ fontSize: 10, color: "gray" }}>{timeAgo}</Text>
            </View>
          </View>
        </View>
        {rParam && (
          <View style={{ marginTop: -12 }}>
            <MenuProvider backHandler={true} style={{ padding: 5 }}>
              <Menu backHandler={true}>
                <MenuTrigger
                  customStyles={{
                    triggerWrapper: {
                      marginLeft: 40,
                      paddingVertical: 20,
                    },
                  }}
                >
                  <IonIcon
                    style={{
                      fontSize: 20,
                      color: "black",
                    }}
                    name={"ellipsis-vertical-sharp"}
                  />
                </MenuTrigger>
                <MenuOptions
                  style={{
                    backgroundColor: "white",
                    borderWidth: 1,
                    borderColor: "#999EA2",
                    borderRadius: 5,
                    width: 60,
                  }}
                >
                  <MenuOption
                    onSelect={() => {
                      navigation.navigate("AddPost", {
                        data: item,
                        perviousPageInfo: "ViewPage",
                      });
                    }}
                    text="Edit"
                  />
                  <MenuOption
                    onSelect={() => {
                      //deleteThisStatus();
                      alertFunc();
                    }}
                  >
                    <Text style={{ color: "red" }}>Delete</Text>
                  </MenuOption>
                </MenuOptions>
              </Menu>
            </MenuProvider>
          </View>
        )}
      </View>
      <View style={{ marginLeft: 50, marginTop: rParam ? -5 : 5 }}>
        <Text>{item.status}</Text>
        {loadingPage === true && (
          <View style={{ alignItems: "center" }}>
            <ActivityIndicator size="large" color="#040E29" />
          </View>
        )}
      </View>
    </View>
  );
};

export default ViewPageStatus;
