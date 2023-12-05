import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";
import { useAddStudentInBatchMutation } from "../../../redux/apiSlice";

const AddStudent = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);

  const [studentName, setStudentName] = useState("");
  const [studentNameError, setStudentNameError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [DateError, setDateError] = useState("");
  const [startDate, setStartDate] = useState("");

  const [addStudentInBatch] = useAddStudentInBatchMutation();

  const handleValidation = () => {
    let isValid = true;

    if (studentName.trim() === "") {
      setStudentNameError("Student Name cannot be empty");
      isValid = false;
    } else {
      setStudentNameError("");
    }

    // ? date input validation
    if (startDate.trim() === "") {
      setDateError("Student Start Date cannot be empty");
      isValid = false;
    } else {
      setDateError("");
    }

    if (phoneNumber.trim() === "") {
      setPhoneNumberError("Phone Number cannot be empty");
      isValid = false;
    } else if (!/^\d+$/.test(phoneNumber)) {
      setPhoneNumberError("Phone Number must contain only digits");
      isValid = false;
    } else if (phoneNumber.length < 10) {
      setPhoneNumberError("Phone Number must be at least 10 digits");
      isValid = false;
    } else {
      setPhoneNumberError("");
    }

    if (gender.trim() === "") {
      setGenderError("Gender cannot be empty");
      isValid = false;
    } else {
      setGenderError("");
    }

    return isValid;
  };
  const [gender, setGender] = useState("male");

  const handleGenderChange = (selectedGender) => {
    setGender(selectedGender);
  };

  const handleSubmit = async () => {
    if (handleValidation()) {
      setLoading(true);

      // Perform actions with valid data
      console.log(
        "Submitted:",

        studentName,
        gender,
        phoneNumber
      );

      const payload = {
        batchId: route.params.data._id,
        phone: phoneNumber,
        gender: gender,
        name: studentName,
        startDate: startDate,
      };

      console.log(payload);

      if (1 === 1) {
        try {
          const data = await addStudentInBatch(payload);

          console.log("data add student -> ", data.data.savedBatchDetail);

          let oldBatchData = { ...route.params.data };

          delete oldBatchData.batchdetails;

          console.log("this is delete oldBatch -> ", oldBatchData);

          let newStudentBatch = [
            ...route.params.data.batchdetails,
            data.data.savedBatchDetail,
          ];

          let newBatchData = { ...oldBatchData, batchdetails: newStudentBatch };

          console.log("this is final data -> ", newBatchData);

          navigation.navigate("ViewTeacherBatch", {
            data: newBatchData,
          });
          // navigation.goBack();
          setLoading(false);
        } catch (error) {
          console.log("this is error ,", error);
          setLoading(false);
        }
      }
    } else {
      // Handle validation errors
      console.log("Validation errors detected");
    }
  };

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [formattedDate, setFormattedDate] = useState("");

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

  return (
    <ScrollView>
      <View style={{ padding: 16 }}>
        <View style={{ marginTop: 10 }}>
          <Text style={{ padding: 5, fontWeight: "bold" }}>Name :</Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "#EEEEEE",
              padding: 10,
              borderRadius: 8,
              backgroundColor: "#F9F9F9",
            }}
            onChangeText={(text) => setStudentName(text)}
            value={studentName}
            editable={true}
          />
          <Text style={{ color: "red" }}>{studentNameError}</Text>
        </View>
        <View style={{}}>
          <Text style={{ padding: 5, fontWeight: "bold" }}>Phone Number :</Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "#EEEEEE",
              padding: 10,
              borderRadius: 8,
              backgroundColor: "#F9F9F9",
            }}
            onChangeText={(text) => setPhoneNumber(text)}
            value={phoneNumber}
            keyboardType="numeric"
          />
          <Text style={{ color: "red" }}>{phoneNumberError}</Text>
        </View>
        <View style={{}}>
          <Text style={{ padding: 5, fontWeight: "bold" }}>
            Start Date : {formattedDate}
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
          <Text style={{ color: "red" }}>{DateError}</Text>
        </View>

        <View style={{ marginTop: 10 }}>
          <Text style={{ padding: 5, fontWeight: "bold" }}>Gender :</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={
                gender === "male"
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
              onPress={() => handleGenderChange("male")}
            >
              <Text
                style={
                  gender === "male"
                    ? {
                        color: "#fff",
                      }
                    : {
                        color: "black",
                      }
                }
              >
                Male
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={
                gender === "female"
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
              onPress={() => handleGenderChange("female")}
            >
              <Text
                style={
                  gender === "female"
                    ? {
                        color: "#fff",
                      }
                    : {
                        color: "black",
                      }
                }
              >
                Female
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={{ color: "red" }}>{genderError}</Text>
        </View>

        <View style={{ alignItems: "flex-end" }}>
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
              <Text style={{ color: "white", fontSize: 16 }}>Add</Text>
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
    </ScrollView>
  );
};

export default AddStudent;
