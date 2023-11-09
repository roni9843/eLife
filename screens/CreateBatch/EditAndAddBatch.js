import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";
import Textarea from "react-native-textarea";
import IonIcon from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";
import { useUpdateTuitionBatchMutation } from "../../redux/apiSlice";

const EditAndAddBatch = ({ navigation, route }) => {
  // * redux store user
  const userInfo = useSelector((state) => state.userInfo);

  const [loading, setLoading] = useState(false);

  const [loadingDelete, setLoadingDelete] = useState(false);

  const [updateTuitionBatch] = useUpdateTuitionBatchMutation();

  const [batchDetails, setBatchDetails] = useState(
    route.params.status === "create" ? "" : route.params.data.bio
  );

  // Define state variables for input errors
  const [inputErrors, setInputErrors] = useState({
    batchTitle: "",
    batchTime: "",
    totalSet: "",
    courseFee: "",
  });

  const [batchData, setBatchData] = useState({
    batchTitle:
      route.params.status === "create" ? "" : route.params.data.batchTitle,
    batchTime:
      route.params.status === "create" ? "" : route.params.data.batchTime,
    totalSet:
      route.params.status === "create" ? "" : route.params.data.totalSet,
    courseFee:
      route.params.status === "create" ? "" : route.params.data.courseFee,
    feeType:
      route.params.status === "create" ? "monthly" : route.params.data.feeType,
  });

  const handleInputChange = (name, value) => {
    setBatchData({
      ...batchData,
      [name]: value,
    });

    // Clear the error message when the user starts typing in the input field
    setInputErrors({
      ...inputErrors,
      [name]: "",
    });
  };

  const handleSubmit = async () => {
    // Check for empty input fields and set error messages
    const errors = {};

    if (batchData.totalSet === "") {
      errors.totalSet = "Total Set is required";
    }
    if (batchData.courseFee === "") {
      errors.courseFee = "Course Fee is required";
    }

    // If there are errors, don't proceed with submission
    if (Object.keys(errors).length > 0) {
      setInputErrors(errors);
    } else {
      setLoading(true);

      let payload = {
        batchId: route.params.data._id,
        batchTime: batchData.batchTime,
        totalSet: batchData.totalSet,
        bio: batchDetails,
      };

      try {
        const data = await updateTuitionBatch(payload);

        console.log("data ", data);
        navigation.goBack();
        setLoading(false);
      } catch (error) {
        console.log("this is error ,", error);
        setLoading(false);
      }
    }
  };

  const handleDelete = () => {};

  return (
    <View>
      <ScrollView>
        <View style={{ padding: 10 }}>
          <View style={{ marginTop: 10 }}>
            <Text style={{ padding: 5, fontWeight: "bold" }}>
              Batch Title : (max 14 characters)
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#EEEEEE",
                padding: 10,
                borderRadius: 8,
                backgroundColor: "#F9F9F9",
              }}
              placeholder="FinanceBatch"
              maxLength={14}
              value={batchData.batchTitle}
              onChangeText={(text) => handleInputChange("batchTitle", text)}
              editable={false}
            />
            <Text style={{ color: "red" }}>{inputErrors.batchTitle}</Text>
            {/* Display error message */}
          </View>
          <View style={{ marginTop: 10 }}>
            <Text style={{ padding: 5, fontWeight: "bold" }}>
              Batch Details :
            </Text>
            <Textarea
              containerStyle={{
                height: 100,
                padding: 5,
                backgroundColor: "#F9F9F9",
                borderBottomColor: "#040E29",
                borderBottomWidth: 1,
              }}
              style={{
                textAlignVertical: "top", // hack android
                height: 100,
                fontSize: 14,
                color: "#333",
              }}
              onChangeText={(e) => setBatchDetails(e)}
              maxLength={100}
              defaultValue={batchDetails}
              placeholder={"Share details about your batch..."}
              placeholderTextColor={"#c7c7c7"}
              underlineColorAndroid={"transparent"}
            />
          </View>
          <View style={{ marginTop: 10 }}>
            <Text style={{ padding: 5, fontWeight: "bold" }}>Batch Time :</Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#EEEEEE",
                padding: 10,
                borderRadius: 8,
                backgroundColor: "#F9F9F9",
              }}
              placeholder="Time"
              value={batchData.batchTime}
              onChangeText={(text) => handleInputChange("batchTime", text)}
            />
            <Text style={{ color: "red" }}>{inputErrors.batchTime}</Text>
            {/* Display error message */}
          </View>
          <View style={{ marginTop: 10 }}>
            <Text style={{ padding: 5, fontWeight: "bold" }}>Total Set :</Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#EEEEEE",
                padding: 10,
                borderRadius: 8,
                backgroundColor: "#F9F9F9",
              }}
              placeholder="Total Set"
              keyboardType="numeric"
              value={batchData.totalSet.toString()}
              onChangeText={(text) => handleInputChange("totalSet", text)}
            />
            <Text style={{ color: "red" }}>{inputErrors.totalSet}</Text>
            {/* Display error message */}
          </View>
          <View style={{ marginTop: 10 }}>
            <Text style={{ padding: 5, fontWeight: "bold" }}>
              Course Fee : (TAKA)
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#EEEEEE",
                padding: 10,
                borderRadius: 8,
                backgroundColor: "#F9F9F9",
              }}
              value={batchData.courseFee.toString()}
              onChangeText={(text) => handleInputChange("courseFee", text)}
              placeholder="1000"
              keyboardType="numeric"
              editable={false}
            />

            {console.log("this is batchData.courseFee", batchData.courseFee)}
            <Text style={{ color: "red" }}>{inputErrors.courseFee}</Text>
            {/* Display error message */}
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 5,
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Fee type : </Text>

            <TouchableOpacity
              disabled
              style={
                batchData.feeType === "monthly"
                  ? {
                      backgroundColor: "#040E29",
                      borderWidth: 1,
                      borderColor: "#040E29",
                      padding: 8,
                      margin: 8,
                      borderRadius: 5,
                    }
                  : {
                      borderWidth: 1,
                      borderColor: "#040E29",
                      padding: 8,
                      margin: 8,
                      borderRadius: 5,
                    }
              }
              onPress={() => handleInputChange("feeType", "monthly")}
            >
              <Text
                style={
                  batchData.feeType === "monthly"
                    ? {
                        color: "#fff",
                      }
                    : {
                        color: "black",
                      }
                }
              >
                Monthly
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              disabled
              style={
                batchData.feeType === "onetime"
                  ? {
                      backgroundColor: "#040E29",
                      borderWidth: 1,
                      borderColor: "#040E29",
                      padding: 8,
                      margin: 8,
                      borderRadius: 5,
                    }
                  : {
                      borderWidth: 1,
                      borderColor: "#040E29",
                      padding: 8,
                      margin: 8,
                      borderRadius: 5,
                    }
              }
              onPress={() => handleInputChange("feeType", "onetime")}
            >
              <Text
                style={
                  batchData.feeType === "onetime"
                    ? {
                        color: "#fff",
                      }
                    : {
                        color: "black",
                      }
                }
              >
                Onetime
              </Text>
            </TouchableOpacity>
          </View>
          {/* Submit button */}
          <View
            style={{
              flexDirection: "row",
              justifyContent:
                route.params.status === "create" ? "flex-end" : "space-between",
            }}
          >
            {route.params.status !== "create" && (
              <View
                style={{
                  marginTop: 10,
                  alignItems: "flex-start",
                }}
              >
                <TouchableOpacity
                  style={{
                    borderRadius: 5,
                    backgroundColor: "red",
                    padding: 10,
                    width: 100,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={handleDelete}
                >
                  {loadingDelete === true ? (
                    <View style={{ alignItems: "center" }}>
                      <ActivityIndicator size="small" color="white" />
                    </View>
                  ) : (
                    <Text style={{ color: "white", fontSize: 16 }}>Delete</Text>
                  )}
                  <IonIcon
                    style={{
                      fontSize: 16,
                      color: "white",
                      marginLeft: 14,
                    }}
                    name={"trash-outline"}
                  />
                </TouchableOpacity>
              </View>
            )}

            <View style={{ marginTop: 10, alignItems: "flex-end" }}>
              <TouchableOpacity
                style={{
                  borderRadius: 5,
                  backgroundColor: "#040E29",
                  padding: 10,
                  width: 100,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={handleSubmit}
              >
                {loading === true ? (
                  <View style={{ alignItems: "center" }}>
                    <ActivityIndicator size="small" color="white" />
                  </View>
                ) : (
                  <Text style={{ color: "white", fontSize: 16 }}>
                    {route.params.status === "create" ? "Create" : "Update"}
                  </Text>
                )}
                <IonIcon
                  style={{
                    fontSize: 16,
                    color: "white",
                    marginLeft: 14,
                  }}
                  name={"send-sharp"}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default EditAndAddBatch;
