import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";
import IonIcon from "react-native-vector-icons/Ionicons";
import { useAddStudentFeeMutation } from "../../../redux/apiSlice";
const FeeCollect = ({ route, data, navigation }) => {
  const [addStudentFee] = useAddStudentFeeMutation();

  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const handlePressSubmit = async () => {
    setLoading(true);
    console.log(route);

    if (inputValue.trim() === "") {
      setErrorMessage("Please enter a number");
      setLoading(false);
    } else {
      setErrorMessage("");

      const payload = {
        batchId: route.params.selectedStudentInfo.batchId._id,
        studentId: route.params.selectedStudentInfo._id,
        paidAmount: parseInt(inputValue), // Convert inputValue to a float or as needed
        amount: parseInt(inputValue), // Assuming amount is the same as paidAmount in this case
      };

      console.log("this is data ", data);

      const addStudentFeeConst = await addStudentFee(payload);
      navigation.navigate("ViewTeacherBatch", {
        data: data,
      });
      setLoading(false);

      console.log(addStudentFeeConst);
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 16,
        }}
      >
        <Text style={{ color: "gray" }}>
          If you want to subtract an amount, simply use a minus (-) sign before
          the number you wish to deduct.
        </Text>
        <Text style={{ fontSize: 18, marginBottom: 8 }}>Amount :</Text>
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            borderRadius: 5,
            paddingHorizontal: 10,
            marginBottom: 16,
            width: "100%",
          }}
          placeholder="TAKA"
          keyboardType="numeric"
          value={inputValue}
          onChangeText={(text) => setInputValue(text)}
        />

        {errorMessage ? (
          <Text style={{ color: "red", marginBottom: 10 }}>{errorMessage}</Text>
        ) : null}

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
          onPress={handlePressSubmit}
        >
          {loading === true ? (
            <View style={{ alignItems: "center" }}>
              <ActivityIndicator size="small" color="white" />
            </View>
          ) : (
            <Text style={{ color: "white", fontSize: 16 }}>Collect</Text>
          )}

          <IonIcon
            style={{
              fontSize: 16,
              color: "white",
              marginLeft: 14,
            }}
            name={"cash-outline"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FeeCollect;

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
