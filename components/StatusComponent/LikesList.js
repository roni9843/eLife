import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
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

  return (
    <View>
      <View>
        {reactionListData &&
          reactionListData.map((dt) => (
            <View>
              <Text>{dt.reactId.name}</Text>
            </View>
          ))}
      </View>
    </View>
  );
};

export default LikesList;
