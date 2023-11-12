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
    setReactionListData(reactionData);
    console.log("this is reactions ", reactionData);
  };

  return (
    <View>
      <View>
        <Text>hlw</Text>
      </View>
    </View>
  );
};

export default LikesList;
