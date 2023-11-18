import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useGetStudentInBatchMutation } from "../../../redux/apiSlice";

const StudentListFee = ({ navigation, route }) => {
  const [getStudentInBatch] = useGetStudentInBatchMutation();

  const [allStudentInfo, setAllStudentInfo] = useState([]);

  useEffect(() => {
    console.log("ttt", route.params.id);

    apiFunc(route.params.id);
  }, [route]);

  // ? func for call api
  const apiFunc = async (id) => {
    try {
      const payload = { batchId: id };

      const getData = await getStudentInBatch(payload);

      console.log("this is id ", getData.data.batchDetails);

      setAllStudentInfo(getData.data.batchDetails);
    } catch (error) {
      console.log("this is error ", error);
    }
  };

  return (
    <ScrollView style={{ padding: 10, flex: 1 }}>
      {allStudentInfo &&
        allStudentInfo.map((dt) => (
          <View>
            <TouchableOpacity
              onPress={() => {
                // Handle button press here
                navigation.navigate("AddStudentFee", {
                  state: "View",
                  id: route.params.id,
                  selectedStudentInfo: dt,
                });
              }}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                borderWidth: 1,
                padding: 20,
                borderRadius: 10,
                marginVertical: 5,
                backgroundColor: "white",
              }}
            >
              <View>
                <Text style={{ fontWeight: "bold" }}>{dt.name}</Text>
              </View>
              <View>
                <Text>{dt.phone}</Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
    </ScrollView>
  );
};

export default StudentListFee;
