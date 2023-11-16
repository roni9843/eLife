import moment from "moment";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, View } from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";
import { useGetOnePostReactionMutation } from "../../redux/apiSlice";

const LikesList = ({ navigation, route }) => {
  const [getOnePostReaction] = useGetOnePostReactionMutation();

  const [reactionListData, setReactionListData] = useState([]);

  useEffect(() => {
    callReactionApi();
  }, []);

  const callReactionApi = async () => {
    const payload = {
      id: route.params.postId,
    };

    const reactionData = await getOnePostReaction(payload);
    setReactionListData(reactionData.data.reaction);
    console.log("this is reactions ", reactionData.data.reaction);
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
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
          {item.reactId.name}
        </Text>
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
      <FlatList
        data={reactionListData}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
      />
    </View>
  );
};

export default LikesList;
