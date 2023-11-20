import moment from "moment";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";
import { useGetOnePostReactionMutation } from "../../redux/apiSlice";

const LikesList = ({ navigation, route }) => {
  const [getOnePostReaction] = useGetOnePostReactionMutation();
  const [loading, setLoading] = useState(true);
  const [reactionListData, setReactionListData] = useState([]);
  const [noLike, setLike] = useState("no likes");

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

  const renderItem = ({ item }) => (
    <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
      {item.reactId.profilePic ? (
        <Image
          source={{ uri: item.reactId.profilePic }}
          style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }}
        />
      ) : (
        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            marginRight: 10,
            backgroundColor: "lightgray",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Use IonIcon when no profile picture */}
          <IonIcon
            style={{
              fontSize: 40,
              color: "black",
            }}
            name={"person-circle-outline"}
          />
        </View>
      )}

      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            {" "}
            {item.reactId.name}
          </Text>

          {item.reactId?.verified === true && (
            <View style={{ marginTop: 3, marginLeft: 5 }}>
              <Image
                source={require("../../assets/blueTick.png")}
                style={{ height: 15, width: 20 }}
              />
            </View>
          )}
        </View>
        <Text>{getTimeAgo(item.createdAt)}</Text>
      </View>
    </View>
  );

  const getTimeAgo = (createdAt) => {
    // Implement your time ago logic here
    // For simplicity, you can use a library like `moment`
    // or implement a custom logic like the previous example

    // Placeholder logic
    return moment(createdAt).fromNow();
  };

  return (
    <View>
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
    </View>
  );
};

export default LikesList;
