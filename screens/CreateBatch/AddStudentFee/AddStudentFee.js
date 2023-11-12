import React, { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";

const AddStudentFee = ({ navigation, route }) => {
  useEffect(() => {
    console.log("fff 1", route.params.id);
    console.log("fff 2", route);
  }, [route]);

  return (
    <View>
      <View style={{ padding: 10 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <View>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>
              Select Student
            </Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("StudentListFee", {
                  id: route.params.id,
                })
              }
              style={{
                borderRadius: 5,
                backgroundColor: "#040E29",
                padding: 10,
                width: 170,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "white", fontSize: 16 }}>
                Select Student
              </Text>

              <IonIcon
                style={{
                  fontSize: 26,
                  color: "white",
                  marginLeft: 14,
                }}
                name={"people-circle-outline"}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          {route.params.state === "View" && (
            <View>
              <View>
                <View>
                  <Text>Name : </Text>
                  <Text>Name</Text>
                </View>
              </View>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default AddStudentFee;
