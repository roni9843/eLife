import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import VerifyIcon from "react-native-vector-icons/MaterialIcons";
import ProfileIcon from "react-native-vector-icons/SimpleLineIcons";
import { useGetOnePostReactionMutation } from "../../redux/apiSlice";

const LikesList = ({ navigation, route }) => {
  const [getOnePostReaction] = useGetOnePostReactionMutation();
  const [loading, setLoading] = useState(true);
  const [reactionListData, setReactionListData] = useState([]);
  const [noLike, setLike] = useState("no likes");

  const getTimeAgo = (createdAt) => {
    // Implement your time ago logic here
    // For simplicity, you can use a library like `moment`
    // or implement a custom logic like the previous example

    // Placeholder logic
    return moment(createdAt).fromNow();
  };

  useEffect(() => {
    callReactionApi();
  }, []);

  const callReactionApi = async () => {
    try {
      const payload = {
        id: route.params.postId,
      };

      const reactionData = await getOnePostReaction(payload);

      console.log("reactionData.length ", !reactionData.length);

      setLike(reactionData.length === true && false);
      setReactionListData(reactionData.data.reaction);
      console.log("this is reactions ", reactionData.data.reaction);
    } catch (error) {
      // Handle error if necessary
      console.error("Error fetching reaction data:", error);
    } finally {
      setLoading(false); // Set loading to false after data is fetched
    }
  };

  const renderItem = ({ item }) => {
    console.log(item);

    return (
      <View
        style={{
          paddingHorizontal: 10,
          paddingVertical: 5,
          backgroundColor: "white",
          marginHorizontal: 10,
          marginTop: 10,
          borderRadius: 5,
        }}
      >
        <View style={styles.postContainer}>
          <View>
            {!item.reactId.profilePic ? (
              <View
                style={{
                  // backgroundColor: "green",
                  borderRadius: 50,
                  borderWidth: 2,
                  borderColor: "#040E29",
                  padding: 4,
                  backgroundColor: "#040E29",
                  marginRight: 5,
                  width: 40,
                  height: 40,
                  borderRadius: 25, // Make it round
                  marginRight: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ProfileIcon
                  name="user"
                  size={20}
                  color="white"
                  style={
                    {
                      // backgroundColor: "green",
                    }
                  }
                />
              </View>
            ) : (
              <Image
                source={{ uri: item.reactId.profilePic }}
                style={styles.userImage}
              />
            )}
          </View>
          <View style={styles.textContainer}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View>
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      // justifyContent: "center",
                      alignContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={styles.userName}>{item.reactId.name}</Text>

                    {item.reactId?.verified === true && (
                      <View style={{ marginLeft: 10 }}>
                        <VerifyIcon
                          name="verified-user"
                          size={16}
                          color="#040E29"
                          style={
                            {
                              // backgroundColor: "green",
                            }
                          }
                        />
                      </View>
                    )}
                  </View>
                </View>

                <Text style={styles.time}>{getTimeAgo(item.createdAt)}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <ScrollView>
      {loading && (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 30,
          }}
        >
          <ActivityIndicator size="large" color="#040E29" />
        </View>
      )}

      {!loading && (
        <View>
          {reactionListData.length === 0 ? (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                padding: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "gray",
                }}
              >
                NO LIKES
              </Text>
            </View>
          ) : (
            <FlatList
              data={reactionListData}
              keyExtractor={(item) => item._id}
              renderItem={renderItem}
            />
          )}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  Container: {
    margin: 7,
  },
  postContainer: {
    flexDirection: "row",
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 25, // Make it round
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  time: {
    fontSize: 12,
    color: "#888888",
  },
});

export default LikesList;
