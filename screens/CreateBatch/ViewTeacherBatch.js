import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { Button } from "react-native-paper";
import { RFValue } from "react-native-responsive-fontsize";
import { Circle } from "react-native-svg";
import IonIcon from "react-native-vector-icons/Ionicons";
import ViewTeacherBatchHeader from "../../components/HeaderBar/ViewTeacherBatchHeader";
import { useDeleteStudentMutation } from "../../redux/apiSlice";

const StudentCard = ({ s, setStudent, student }) => {
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [deleteStudent] = useDeleteStudentMutation();

  const alertFunc = ({ data }) => {
    Alert.alert(
      "Confirmation",
      "Are you sure you want to delete The Batch?",
      [
        {
          text: "Cancel",
          style: "cancel",
          onPress: () => {
            // navigation.navigate(optionOneNavigatefetchForAllUserAndAllStatusData);
            closeModal();
          },
        },
        {
          text: "Delete",
          style: "destructive",
          // If the user confirmed, then we dispatch the action we blocked earlier
          // This will continue the action that had triggered the removal of the screen
          onPress: () => handleDelete({ data }),
        },
      ]
      // { cancelable: false }
    );
  };

  const handleDelete = async ({ data }) => {
    // Add logic for deletion if needed
    setLoadingDelete(true);
    const payload = {
      batchDetailId: data,
    };

    const deleteStudentFunc = await deleteStudent(payload);

    const filterData = student.filter((dt) => dt._id !== data);

    console.log("4444 deleteStudentFunc ", deleteStudentFunc);
    console.log("4444 filterData ", filterData);
    console.log("4444 route.params.data._id ", data);

    setStudent(filterData);

    setLoadingDelete(false);
  };

  const [modalVisible, setModalVisible] = useState(false);

  // Function to open the modal
  const openModal = () => {
    setModalVisible(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View
      style={{
        backgroundColor: "white",
        padding: 10,
        borderRadius: 10,
        borderLeftWidth: 3,
        borderLeftColor: "#040E29",
        marginVertical: 5,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flex: 5 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontWeight: "bold" }}>Name : </Text>
                <Text>{s.name}</Text>
              </View>
            </View>
            <View>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontWeight: "bold" }}>Phone : </Text>
                <Text>{s.phone}</Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontWeight: "bold" }}>Gender : </Text>
                <Text>{s.gender}</Text>
              </View>
            </View>
            <View>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontWeight: "bold" }}>Join : </Text>
                {console.log("this is student time :", s)}
                <Text>{moment(s.startDate).format("YYYY-MM-DD")}</Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              borderRadius: 5,
              backgroundColor: "red",
              padding: 10,
              width: 40,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => {
              alertFunc({ data: s._id });
            }}
          >
            <IonIcon
              style={{
                fontSize: 14,
                color: "white",
              }}
              name={"trash-outline"}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const ViewTeacherBatch = ({ navigation, route }) => {
  console.log("this is router ", route.params.data._id);
  console.log("this is router ", route.params.data);

  const [setErrorValue, setSetErrorValue] = useState({
    state: false,
    msg: "",
  });

  const [student, setStudent] = useState([]);

  useEffect(() => {
    setStudent(route.params.data.batchdetails);
  }, [route]);

  useEffect(() => {
    delete route.params.data.batchdetails;

    route.params.data = {
      ...route.params.data,
      batchdetails: student,
    };
  }, [student]);

  return (
    <View>
      <ViewTeacherBatchHeader
        navigation={navigation}
        data={route.params.data}
      ></ViewTeacherBatchHeader>

      <ScrollView>
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
                <Text style={{ fontSize: RFValue(15) }}>
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
                <Text style={{ fontSize: RFValue(13) }}>
                  {" "}
                  {route.params.data.bio}
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
                  Category :
                </Text>
                <Text style={{ fontSize: RFValue(14) }}>
                  {" "}
                  {route.params.data.category}
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
                  Class :
                </Text>
                <Text style={{ fontSize: 17 }}>
                  {" "}
                  {route.params.data.batchClass}
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
                  Subject :
                </Text>
                <Text style={{ fontSize: 17 }}>
                  {" "}
                  {route.params.data.subject}
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
                  Start Time :
                </Text>
                <Text style={{ fontSize: 17 }}>
                  {" "}
                  {moment(route.params.data.batchTime).format("YYYY-MM-DD")}
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
                <Text style={{ fontSize: 17 }}>
                  {" "}
                  {route.params.data.feeType}
                </Text>
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
                      Total Sit : {student.length}/{route.params.data.totalSet}
                    </Text>
                  </View>

                  <AnimatedCircularProgress
                    size={100}
                    width={10}
                    fill={(student.length / route.params.data.totalSet) * 100}
                    tintColor="#040E29"
                    backgroundColor="gray"
                    padding={10}
                    renderCap={({ center }) => (
                      <Circle
                        cx={center.x}
                        cy={center.y}
                        r="10"
                        fill="#040E29"
                      />
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
                          {student.length}
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
                          student.length !== route.params.data.totalSet
                            ? navigation.navigate("AddStudent", {
                                data: route.params.data,
                              })
                            : setSetErrorValue({
                                status: true,
                                msg: `Your sit is full!!! If you want to add  more sit, please update  the batch`,
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
                            data: route.params.data,
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
            {setErrorValue.status && (
              <View>
                <View
                  style={{
                    backgroundColor: "#ff9999", // Background color for the error container
                    padding: 10,
                    borderRadius: 5,
                    margin: 10,
                  }}
                >
                  <Text
                    style={{
                      color: "#ff0000", // Text color for the error message
                      fontSize: 16,
                      textAlign: "center",
                    }}
                  >
                    {setErrorValue.msg}
                  </Text>
                </View>
              </View>
            )}
            <View>
              <Text style={{ padding: 10, fontWeight: "bold", color: "gray" }}>
                Student Details
              </Text>
            </View>
            {student &&
              student.map((s) => (
                <StudentCard
                  cardId={route.params.data._id}
                  setStudent={setStudent}
                  student={student}
                  s={s}
                ></StudentCard>
              ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ViewTeacherBatch;
