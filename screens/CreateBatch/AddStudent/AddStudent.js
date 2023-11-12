import React, { useState } from "react";
import {
  ActivityIndicator,
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

  const [addStudentInBatch] = useAddStudentInBatchMutation();

  const handleValidation = () => {
    let isValid = true;

    if (studentName.trim() === "") {
      setStudentNameError("Student Name cannot be empty");
      isValid = false;
    } else {
      setStudentNameError("");
    }

    if (phoneNumber.trim() === "") {
      setPhoneNumberError("Phone Number cannot be empty");
      isValid = false;
    } else if (!/^\d+$/.test(phoneNumber)) {
      setPhoneNumberError("Phone Number must contain only digits");
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
      };

      console.log(payload);

      if (1 === 1) {
        try {
          const data = await addStudentInBatch(payload);

          console.log("data ", data);
          navigation.goBack();
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
