import React, { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Textarea from "react-native-textarea";
import IonIcon from "react-native-vector-icons/Ionicons";

const AddStudent = () => {
  const [loading, setLoading] = useState(false);

  const [batchId, setBatchId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentNameError, setStudentNameError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [note, setNote] = useState("");
  const [noteError, setNoteError] = useState("");

  const handleValidation = () => {
    let isValid = true;

    if (studentName.trim() === "") {
      setStudentNameError("Student Name cannot be empty");
      isValid = false;
    } else {
      setStudentNameError("");
    }
    if (note.trim() === "") {
      setNoteError("Note cannot be empty");
      isValid = false;
    } else {
      setNoteError("");
    }

    if (gender.trim() === "") {
      setGenderError("Gender cannot be empty");
      isValid = false;
    } else {
      setGenderError("");
    }

    return isValid;
  };

  const [gender, setGender] = useState("male"); // Initial state set to 'male'

  const handleGenderChange = (selectedGender) => {
    setGender(selectedGender);
  };

  const handleSubmit = () => {
    if (handleValidation()) {
      // Perform actions with valid data
      console.log("Submitted:", batchId, studentName, gender);
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
            editable={false}
          />
          <Text style={{ color: "red" }}>{studentNameError}</Text>
          {/* Display error message */}
        </View>

        <View style={{ marginTop: 10 }}>
          <Text style={{ padding: 5, fontWeight: "bold" }}>Note :</Text>
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
            onChangeText={(text) => setNote(text)}
            maxLength={100}
            placeholder={"Take note for this student...."}
            placeholderTextColor={"#c7c7c7"}
            underlineColorAndroid={"transparent"}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Gender:</Text>

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

          {/* Add more gender options as needed */}
        </View>

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
