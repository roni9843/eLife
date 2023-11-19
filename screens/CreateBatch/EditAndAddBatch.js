import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import React, { useState } from "react";
import {
  Platform,
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
import {
  useCreateTuitionBatchMutation,
  useUpdateTuitionBatchMutation,
} from "../../redux/apiSlice";

const EditAndAddBatch = ({ navigation, route }) => {
  const userInfo = useSelector((state) => state.userInfo);
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [updateTuitionBatch] = useUpdateTuitionBatchMutation();
  const [createTuitionBatch] = useCreateTuitionBatchMutation();

  const [batchDetails, setBatchDetails] = useState(
    route.params.status === "create" ? "" : route.params.data.bio
  );
  const [customDetailsAddress, setCustomDetailsAddress] = useState(
    route.params.status === "create"
      ? ""
      : route.params.data.customDetailsAddress
  );

  const [inputErrors, setInputErrors] = useState({
    courseCategory: "",
    class: "",
    subject: "",
    batchTitle: "",
    batchTime: "",
    totalSet: "",
    courseFee: "",
    village: "",
    union: "",
    thana: "",
    district: "",
  });

  const CategoryData = [
    "Academic",
    "Language Learning",
    "Digital Marketing",
    "Design and Multimedia",
    "Technology and Programming",

    "Health and Fitness",
    "Photography and Videography",
    "Music and Performing Arts",
  ];
  const ClassData = [
    "others",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9-10 Science",
    "9-10 commerce",
    "9-10 Arts",
    "11-12 Science",
    "11-12 commerce",
    "11-12 Arts",
  ];

  const [category, setCategory] = useState(
    route.params.status === "create" ? null : route.params.data.category
  );

  const handleCategorySelection = (item) => {
    setCategory(item === category ? null : item);
  };
  const [batchClass, setBatchClass] = useState(
    route.params.status === "create" ? null : route.params.data.batchClass
  );

  const handleSelection = (item) => {
    setBatchClass(item === batchClass ? null : item);
  };

  const [batchData, setBatchData] = useState({
    subject: route.params.status === "create" ? "" : route.params.data.subject,
    batchTitle:
      route.params.status === "create" ? "" : route.params.data.batchTitle,

    totalSet:
      route.params.status === "create" ? "" : route.params.data.totalSet,
    courseFee:
      route.params.status === "create" ? "" : route.params.data.courseFee,
    village: route.params.status === "create" ? "" : route.params.data.village,
    union: route.params.status === "create" ? "" : route.params.data.union,
    thana: route.params.status === "create" ? "" : route.params.data.thana,
    district:
      route.params.status === "create" ? "" : route.params.data.district,
  });

  const [startDate, setStartDate] = useState(
    route.params.status === "create" ? "" : route.params.data.batchTime
  );

  const [feeType, setFeeType] = useState(
    route.params.status === "create" ? "monthly" : route.params.data.feeType
  );

  const handleInputChange = (name, value) => {
    setBatchData({
      ...batchData,
      [name]: value,
    });

    setInputErrors({
      ...inputErrors,
      [name]: "",
    });
  };

  const handleSubmit = async () => {
    const errors = {};

    if (category === null) {
      errors.category = "Course category is required";
    }
    if (batchClass === null) {
      errors.batchClass = "Class is required";
    }
    if (batchData.subject === "") {
      errors.subject = "Subject is required";
    }
    if (batchData.batchTitle === "") {
      errors.batchTitle = "Title is required";
    }
    if (startDate === "") {
      errors.batchTime = "Date is required";
    }
    if (batchData.totalSet === "") {
      errors.totalSet = "Total Set is required";
    }
    if (batchData.courseFee === "") {
      errors.courseFee = "Course Fee is required";
    }
    // Add validation for other fields if needed

    if (Object.keys(errors).length > 0) {
      setInputErrors(errors);
    } else {
      setLoading(true);

      if (route.params.status === "create") {
        let payload = {
          teacherId: userInfo.currentUser._id,
          category: category,
          batchClass: batchClass,
          subject: batchData.subject,
          batchTitle: batchData.batchTitle,
          bio: batchDetails,
          batchTime: startDate,
          totalSet: batchData.totalSet,
          courseFee: batchData.courseFee,
          feeType: feeType,
          village: batchData.village,
          union: batchData.union,
          thana: batchData.thana,
          district: batchData.district,
          customDetailsAddress: customDetailsAddress,
        };

        try {
          const data = await createTuitionBatch(payload);

          console.log("create ", data);

          navigation.navigate("CreateBatchScreen", {
            dataState: Math.floor(10000 + Math.random() * 90000),
          });
          setLoading(false);
        } catch (error) {
          console.log("Error:", error);
          setLoading(false);
        }
      } else {
        let payload = {
          batchId: route.params.data._id,
          batchTime: startDate,
          totalSet: batchData.totalSet,
          bio: batchDetails,
          feeType: feeType,
          village: batchData.village,
          union: batchData.union,
          thana: batchData.thana,
          district: batchData.district,
          category: category,
          batchClass: batchClass,
          subject: batchData.subject,

          customDetailsAddress: customDetailsAddress,
        };

        try {
          const data = await updateTuitionBatch(payload);

          //    navigation.goBack();

          console.log(route, "<- this is update data -> ", data);

          let newBatch = {
            batchdetails: route.params.data.batchdetails,
            ...data.data.saveBatch,
          };

          console.log("this is new batch ", newBatch);

          navigation.navigate("ViewTeacherBatch", {
            data: newBatch,
          });

          setLoading(false);
        } catch (error) {
          console.log("Error:", error);
          setLoading(false);
        }
      }
    }
  };

  const [date, setDate] = useState(
    route.params.status === "create" ? new Date() : route.params.data.batchTime
  );
  const [show, setShow] = useState(false);
  const [formattedDate, setFormattedDate] = useState(
    route.params.status === "create"
      ? ""
      : moment(route.params.data.batchTime).format("YYYY-MM-DD")
  );

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios"); // For iOS, set show to true only if the done button is pressed
    setDate(currentDate);
    setStartDate(currentDate.toString());
    // Format the date to your desired string format

    // const formatted = `${currentDate.getFullYear()}-${
    //   currentDate.getMonth() + 1
    // }-${currentDate.getDate()}`;

    //  const formatted = currentDate;

    console.log("data", selectedDate);

    const formattedDate = moment(currentDate).format("YYYY-MM-DD");

    console.log("this is formatted", formattedDate);

    setFormattedDate(formattedDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  const handleDelete = () => {
    // Add logic for deletion if needed
  };

  return (
    <View>
      <ScrollView>
        <View style={{ padding: 10 }}>
          <View style={{ marginTop: 10 }}>
            <Text style={{ padding: 5, fontWeight: "bold" }}>
              Batch Title: (max 14 characters)
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
            />
            <Text style={{ color: "red" }}>{inputErrors.batchTitle}</Text>
          </View>
          <View style={{ marginTop: 10 }}>
            <Text style={{ padding: 5, fontWeight: "bold" }}>Subject:</Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#EEEEEE",
                padding: 10,
                borderRadius: 8,
                backgroundColor: "#F9F9F9",
              }}
              placeholder="Subject"
              value={batchData.subject}
              onChangeText={(text) => handleInputChange("subject", text)}
            />
            <Text style={{ color: "red" }}>{inputErrors.subject}</Text>
          </View>
          <View style={{ marginTop: 10 }}>
            <Text style={{ padding: 5, fontWeight: "bold" }}>
              Category : {category}
            </Text>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <ScrollView horizontal>
                {CategoryData.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleCategorySelection(item)}
                    style={[
                      {
                        padding: 10,
                        borderWidth: 1,
                        borderColor: "black",

                        marginVertical: 5,
                        borderRadius: 5,
                        margin: 5,
                      },
                      {
                        backgroundColor:
                          item === category ? "#040E29" : "white",
                      },
                    ]}
                  >
                    <Text
                      style={{
                        color: item === category ? "white" : "#040E29",
                      }}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
            <Text style={{ color: "red" }}>{inputErrors.category}</Text>
          </View>
          <View style={{ marginTop: 10 }}>
            <Text style={{ padding: 5, fontWeight: "bold" }}>
              Class : {batchClass}
            </Text>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <ScrollView horizontal>
                {ClassData.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleSelection(item)}
                    style={[
                      {
                        padding: 10,
                        borderWidth: 1,
                        borderColor: "black",

                        marginVertical: 5,
                        borderRadius: 5,
                        margin: 5,
                      },
                      {
                        backgroundColor:
                          item === batchClass ? "#040E29" : "white",
                      },
                    ]}
                  >
                    <Text
                      style={{
                        color: item === batchClass ? "white" : "#040E29",
                      }}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
            <Text style={{ color: "red" }}>{inputErrors.batchClass}</Text>
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={{ padding: 5, fontWeight: "bold" }}>
              Batch Details:
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
                textAlignVertical: "top",
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
            <Text style={{ padding: 5, fontWeight: "bold" }}>Village:</Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#EEEEEE",
                padding: 10,
                borderRadius: 8,
                backgroundColor: "#F9F9F9",
              }}
              placeholder="Village"
              value={batchData.village}
              onChangeText={(text) => handleInputChange("village", text)}
            />
            <Text style={{ color: "red" }}>{inputErrors.village}</Text>
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={{ padding: 5, fontWeight: "bold" }}>Union:</Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#EEEEEE",
                padding: 10,
                borderRadius: 8,
                backgroundColor: "#F9F9F9",
              }}
              placeholder="Union"
              value={batchData.union}
              onChangeText={(text) => handleInputChange("union", text)}
            />
            <Text style={{ color: "red" }}>{inputErrors.union}</Text>
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={{ padding: 5, fontWeight: "bold" }}>Thana:</Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#EEEEEE",
                padding: 10,
                borderRadius: 8,
                backgroundColor: "#F9F9F9",
              }}
              placeholder="Thana"
              value={batchData.thana}
              onChangeText={(text) => handleInputChange("thana", text)}
            />
            <Text style={{ color: "red" }}>{inputErrors.thana}</Text>
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={{ padding: 5, fontWeight: "bold" }}>District:</Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#EEEEEE",
                padding: 10,
                borderRadius: 8,
                backgroundColor: "#F9F9F9",
              }}
              placeholder="District"
              value={batchData.district}
              onChangeText={(text) => handleInputChange("district", text)}
            />
            <Text style={{ color: "red" }}>{inputErrors.district}</Text>
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={{ padding: 5, fontWeight: "bold" }}>
              Custom Details Address:
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
                textAlignVertical: "top",
                height: 100,
                fontSize: 14,
                color: "#333",
              }}
              onChangeText={(e) => setCustomDetailsAddress(e)}
              maxLength={100}
              defaultValue={customDetailsAddress}
              placeholder={"Enter custom details..."}
              placeholderTextColor={"#c7c7c7"}
              underlineColorAndroid={"transparent"}
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={{ padding: 5, fontWeight: "bold" }}>
              Batch Date: {formattedDate}
            </Text>
            <View>
              <TouchableOpacity
                style={{
                  borderRadius: 5,
                  backgroundColor: "#040E29",
                  padding: 10,

                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={showDatepicker}
              >
                <Text style={{ color: "white" }}>Calender</Text>
                <IonIcon
                  style={{
                    fontSize: 16,
                    color: "white",
                    marginLeft: 14,
                  }}
                  name={"calendar-outline"}
                />
              </TouchableOpacity>
            </View>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode="date" // Change this to 'time' for time picker
                is24Hour={true}
                //  display="default"
                onChange={onChange}
              />
            )}

            <Text style={{ color: "red" }}>{inputErrors.batchTime}</Text>
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={{ padding: 5, fontWeight: "bold" }}>Total Set:</Text>
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
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={{ padding: 5, fontWeight: "bold" }}>
              Course Fee: (TAKA)
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
              editable={route.params.status === "create" ? true : false}
            />
            <Text style={{ color: "red" }}>{inputErrors.courseFee}</Text>
          </View>

          {/* ... (other fields) */}

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 5,
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Fee type: </Text>
            <TouchableOpacity
              disabled={route.params.status === "create" ? false : true}
              style={
                feeType === "monthly"
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
              onPress={() => setFeeType("monthly")}
            >
              <Text
                style={
                  feeType === "monthly"
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
              disabled={route.params.status === "create" ? false : true}
              style={
                feeType === "onetime"
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
              onPress={() => setFeeType("onetime")}
            >
              <Text
                style={
                  feeType === "onetime"
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
                onPress={() => {
                  handleSubmit();
                  console.log("this is click ", route.params);
                }}
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
