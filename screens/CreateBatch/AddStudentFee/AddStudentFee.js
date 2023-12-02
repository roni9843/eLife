import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";
import FeeCollect from "./FeeCollect";
const moment = require("moment");

import { RFValue } from "react-native-responsive-fontsize";

const StudentCard = ({ route }) => {
  console.log("this is data -> ", route);

  function calculateMonthsDifference(endDate) {
    const today = moment();
    const end = moment(endDate);

    const monthsDifference = end.diff(today, "months");

    return monthsDifference;
  }

  // Example usage
  const endDate = route.params.selectedStudentInfo.startDate;

  const monthsDifference = calculateMonthsDifference(endDate);
  console.log(monthsDifference);

  return (
    <View style={{ marginTop: 10 }}>
      <View>
        <View
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 5,
            backgroundColor: "white",
            marginHorizontal: 15,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: RFValue(14) }}>Batch Fee : </Text>
              <Text style={{ fontSize: RFValue(14) }}>
                {route.params.selectedStudentInfo.batchId.courseFee} TK
              </Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: RFValue(14) }}>Batch Start Date : </Text>
              <Text style={{ fontSize: RFValue(14) }}>
                {moment(
                  route.params.selectedStudentInfo.batchId.batchTime
                ).format("YYYY-MM-DD")}
              </Text>
            </View>
          </View>
          <View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: RFValue(14) }}>Fee Type : </Text>
              <Text style={{ fontSize: RFValue(14) }}>
                {route.params.selectedStudentInfo.batchId.feeType}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.container}>
        <Text style={styles.label}>Name: </Text>
        <Text style={styles.value}>
          {route.params.selectedStudentInfo.name}
        </Text>

        <Text style={styles.label}>Gender:</Text>
        <Text style={styles.value}>
          {route.params.selectedStudentInfo.gender}
        </Text>

        <Text style={styles.label}>Phone:</Text>
        <Text style={styles.value}>
          {route.params.selectedStudentInfo.phone}
        </Text>

        <Text style={styles.label}>Start Date:</Text>
        <Text style={styles.value}>
          {moment(route.params.selectedStudentInfo.startDate).format(
            "YYYY-MM-DD"
          )}
        </Text>

        <Text style={styles.label}>Period:</Text>
        <Text style={styles.value}>{Math.abs(monthsDifference)} Months</Text>

        <Text style={styles.label}>Paid Amount:</Text>
        <Text style={styles.value}>
          {route.params.selectedStudentInfo.paidAmount}
        </Text>

        {route.params.selectedStudentInfo.batchId.feeType === "monthly" && (
          <View>
            <Text
              style={{ fontSize: 16, fontWeight: "bold", marginVertical: 4 }}
            >
              Outstanding: {route.params.selectedStudentInfo.batchId.courseFee}{" "}
              X {Math.abs(monthsDifference)}
            </Text>
            <Text
              style={{
                fontSize:
                  route.params.selectedStudentInfo.batchId.courseFee *
                    Math.abs(monthsDifference) -
                    route.params.selectedStudentInfo.paidAmount >
                  0
                    ? 20
                    : 16,
                marginBottom: 16,
                color:
                  route.params.selectedStudentInfo.batchId.courseFee *
                    Math.abs(monthsDifference) -
                    route.params.selectedStudentInfo.paidAmount >
                  0
                    ? "red"
                    : "black",
              }}
            >
              {route.params.selectedStudentInfo.batchId.courseFee *
                Math.abs(monthsDifference) -
                route.params.selectedStudentInfo.paidAmount}{" "}
              TK
            </Text>
          </View>
        )}
        {route.params.selectedStudentInfo.batchId.feeType !== "monthly" && (
          <View>
            <Text style={styles.label}>
              Outstanding: {route.params.selectedStudentInfo.batchId.courseFee}
            </Text>
            <Text style={styles.value}>
              {route.params.selectedStudentInfo.batchId.courseFee} TK
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const AddStudentFee = ({ navigation, route }) => {
  const [isCollectFee, setIsCollectFee] = useState(false);

  useEffect(() => {
    console.log("fff 1", route.params.data);
    console.log("fff 2", route);
  }, [route]);

  const [oldData, _setOldData] = useState(route.params.data);

  return (
    <ScrollView>
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
            <StudentCard route={route}></StudentCard>
          )}
        </View>
        {isCollectFee && (
          <View>
            <FeeCollect
              navigation={navigation}
              route={route}
              data={oldData}
            ></FeeCollect>
          </View>
        )}

        {route.params.state === "View" && !isCollectFee && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <View></View>
            <View>
              <TouchableOpacity
                onPress={() => setIsCollectFee(true)}
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
                  Collect Fee
                </Text>

                <IonIcon
                  style={{
                    fontSize: 26,
                    color: "white",
                    marginLeft: 14,
                  }}
                  name={"cash-outline"}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default AddStudentFee;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    margin: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 4,
  },
  value: {
    fontSize: 16,
    marginBottom: 16,
  },
});
