import React from "react";
import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { Button } from "react-native-paper";
import { Circle } from "react-native-svg";
import ViewTeacherBatchHeader from "../../components/HeaderBar/ViewTeacherBatchHeader";

const ViewTeacherBatch = ({ navigation, route }) => {
  console.log("this is router ", route.params.data._id);

  return (
    <ScrollView>
      <ViewTeacherBatchHeader
        navigation={navigation}
        data={route.params.data}
      ></ViewTeacherBatchHeader>

      <View style={{ marginTop: StatusBar.currentHeight + 55 }}>
        <View style={{ padding: 20 }}>
          <View
            style={{
              elevation: 2,
              backgroundColor: "white",
              padding: 10,
              borderRadius: 10,
              marginVertical: 5,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontWeight: "bold", fontSize: 17 }}>
                Batch Title :
              </Text>
              <Text style={{ fontSize: 17 }}>
                {" "}
                {route.params.data.batchTitle}
              </Text>
            </View>
          </View>
          <View
            style={{
              elevation: 2,
              backgroundColor: "white",
              padding: 10,
              borderRadius: 10,
              marginVertical: 5,
            }}
          >
            <View style={{}}>
              <Text style={{ fontSize: 17, fontWeight: "bold" }}>Bio :</Text>
              <Text style={{ fontSize: 14 }}> {route.params.data.bio}</Text>
            </View>
          </View>
          <View
            style={{
              elevation: 2,
              backgroundColor: "white",
              padding: 10,
              borderRadius: 10,
              marginVertical: 5,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontWeight: "bold", fontSize: 17 }}>
                Start Time :
              </Text>
              <Text style={{ fontSize: 17 }}>
                {" "}
                {route.params.data.batchTime}
              </Text>
            </View>
          </View>
          <View
            style={{
              //   backgroundColor: "#FFEED9",
              padding: 10,
              borderRadius: 10,
              marginVertical: 5,
              elevation: 2,
              backgroundColor: "white",
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontWeight: "bold", fontSize: 17 }}>
                Course Fee :
              </Text>
              <Text style={{ fontSize: 17 }}>
                {" "}
                {route.params.data.courseFee} TAKA
              </Text>
            </View>
          </View>
          <View
            style={{
              elevation: 2,
              backgroundColor: "white",
              padding: 10,
              borderRadius: 10,
              marginVertical: 5,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontWeight: "bold", fontSize: 17 }}>
                Fee Type :
              </Text>
              <Text style={{ fontSize: 17 }}> {route.params.data.feeType}</Text>
            </View>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View
              style={{
                elevation: 2,
                backgroundColor: "white",
                padding: 10,
                borderRadius: 10,
                marginVertical: 5,
                width: "48%",
                borderBottomWidth: 3,
                borderBlockColor: "#040E29",
              }}
            >
              <View
                style={{
                  alignContent: "center",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    padding: 5,
                    borderRadius: 5,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: "#040E29",
                      fontSize: 18,
                    }}
                  >
                    Total Set : 0/20
                  </Text>
                </View>

                <AnimatedCircularProgress
                  size={100}
                  width={10}
                  fill={50}
                  tintColor="#040E29"
                  backgroundColor="gray"
                  padding={10}
                  renderCap={({ center }) => (
                    <Circle cx={center.x} cy={center.y} r="10" fill="#040E29" />
                  )}
                >
                  {(fill) => (
                    <View
                      style={{
                        alignContent: "center",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: "bold",
                          color: "#040E29",
                        }}
                      >
                        50
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: "bold",
                          color: "#040E29",
                        }}
                      >
                        Booked
                      </Text>
                    </View>
                  )}
                </AnimatedCircularProgress>
              </View>
            </View>
            <View
              style={{
                elevation: 2,
                backgroundColor: "white",
                padding: 10,
                borderRadius: 10,
                marginVertical: 5,
                width: "48%",
                borderBottomWidth: 3,
                borderBlockColor: "#040E29",
              }}
            >
              <View
                style={{
                  alignContent: "center",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View>
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: "#040E29",
                      fontSize: 18,
                    }}
                  >
                    Function
                  </Text>
                </View>
                <View
                  style={{
                    justifyContent: "center",
                    alignContent: "center",
                    marginTop: 20,
                  }}
                >
                  <View>
                    <Button
                      mode="contained" // You can use "contained" or "outlined"
                      onPress={() => {
                        // Handle button press here
                        navigation.navigate("AddStudent", {
                          data: route.params.data,
                        });
                      }}
                      style={{ borderRadius: 5, backgroundColor: "#040E29" }}
                    >
                      Add Student
                    </Button>
                  </View>
                  <View style={{ marginVertical: 5 }}>
                    <Button
                      mode="contained" // You can use "contained" or "outlined"
                      onPress={() => {
                        // Handle button press here
                        navigation.navigate("AddStudentFee", {
                          state: "Null",
                          id: route.params.data._id,
                        });
                      }}
                      style={{ borderRadius: 5, backgroundColor: "#040E29" }}
                    >
                      Add Fee
                    </Button>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View>
            <Text style={{ padding: 10, fontWeight: "bold", color: "gray" }}>
              Student Details
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "white",
              padding: 10,
              borderRadius: 10,
              borderLeftWidth: 3,
              borderLeftColor: "#040E29",
            }}
          >
            <View>
              <View>
                <View></View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default ViewTeacherBatch;
