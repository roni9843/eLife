import React, { useEffect, useState } from "react";
import { Image, Pressable, StatusBar, Text, View } from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";
import CreateBatchHeader from "../../components/HeaderBar/CreateBatchHeader";
import { useGetAllBatchQuery } from "../../redux/apiSlice";

const CreateBatchScreen = ({ navigation }) => {
  // * redux store user
  const userInfo = useSelector((state) => state.userInfo);

  const { data: getAllBatch } = useGetAllBatchQuery();

  const [batchData, setBatchData] = useState([]);

  useEffect(() => {
    if (getAllBatch?.tuitionBatches) {
      setBatchData(getAllBatch.tuitionBatches);
      console.log(getAllBatch.tuitionBatches);
    }
  }, [getAllBatch]);

  return (
    <View>
      <CreateBatchHeader navigation={navigation}></CreateBatchHeader>

      <View style={{ marginTop: StatusBar.currentHeight + 55 }}>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              padding: 10,
            }}
          >
            <Pressable
              onPress={() =>
                navigation.navigate("EditAndAddBatch", {
                  status: "create",
                  data: null,
                })
              }
              android_ripple={{ color: "white" }}
              style={{
                padding: 35,
                borderRadius: 20,
                borderWidth: 1,
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
                backgroundColor: "#040E29",
                height: 180,
                width: 150,
              }}
            >
              <View>
                <IonIcon
                  style={{
                    fontSize: 35,
                    fontWeight: "bold",
                    color: "black",
                    fontWeight: "bold",
                    color: "white",
                  }}
                  name={"add-outline"}
                />
              </View>
              <View>
                <Text
                  style={{ fontSize: 20, fontWeight: "bold", color: "white" }}
                >
                  ADD
                </Text>
              </View>
            </Pressable>
          </View>

          {batchData &&
            batchData.map((b) => (
              <View
                style={{
                  padding: 10,
                }}
              >
                <Pressable
                  onPress={() =>
                    navigation.navigate("ViewTeacherBatch", {
                      status: "view",
                      data: b,
                    })
                  }
                  android_ripple={{ color: "#040E29" }}
                  style={{
                    borderRadius: 20,
                    padding: 10,
                    backgroundColor: "white",
                    height: 180,
                    width: 150,
                  }}
                >
                  <View>
                    <View>
                      <View
                        style={{
                          backgroundColor: "green",
                          width: 13,
                          height: 13,
                          borderRadius: 100,
                          alignSelf: "flex-end",
                        }}
                      ></View>
                    </View>
                    <View style={{ marginTop: 35 }}>
                      <View>
                        <Image
                          style={{
                            borderRadius: 100,
                            height: 30,
                            width: 30,
                            borderWidth: 1,
                            borderColor: "#040E29",
                          }}
                          source={{
                            uri: userInfo.currentUser.profilePic,
                          }}
                        />
                      </View>
                      <View>
                        <View style={{ flexDirection: "row" }}>
                          <Text
                            style={{
                              color: "gray",
                              fontWeight: "100",
                              fontSize: 14,
                            }}
                          >
                            {b.batchTitle}
                          </Text>
                          <Text style={{ fontWeight: "bold", display: "none" }}>
                            {" "}
                            #2234
                          </Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                          <Text
                            style={{
                              color: "black",
                              fontWeight: "100",
                              fontSize: 14,
                            }}
                          >
                            Start:
                          </Text>
                          <Text style={{ fontWeight: "bold" }}>
                            {" "}
                            {b.batchTime}
                          </Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                          <Text
                            style={{
                              color: "black",
                              fontWeight: "100",
                              fontSize: 14,
                            }}
                          >
                            Set:
                          </Text>
                          <Text style={{ fontWeight: "bold" }}>
                            {" "}
                            {b?.bookedSet ? b.bookedSet : 0}/{b.totalSet}
                          </Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                          <Text
                            style={{
                              color: "black",
                              fontWeight: "100",
                              fontSize: 14,
                            }}
                          >
                            Fee:
                          </Text>
                          <Text style={{ fontWeight: "bold" }}>
                            {" "}
                            {b.courseFee}/-
                          </Text>
                          <Text style={{ fontWeight: "gray" }}>
                            {" "}
                            ({b.feeType})
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </Pressable>
              </View>
            ))}
        </View>
      </View>
    </View>
  );
};

export default CreateBatchScreen;