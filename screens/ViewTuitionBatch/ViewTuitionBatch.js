import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import IonIcon from "react-native-vector-icons/Ionicons";
import ProfileIcon from "react-native-vector-icons/SimpleLineIcons";
import { useSelector } from "react-redux";
import CreateBatchHeader from "../../components/HeaderBar/CreateBatchHeader";

import VerifyIcon from "react-native-vector-icons/MaterialIcons";

import moment from "moment";
import { Image, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useSearchTuitionBatchMutation } from "../../redux/apiSlice";

const CourseCard = ({ item, navigation }) => {
  const {
    teacherDetails,
    batchTitle,
    courseFee,
    batchTime,
    village,
    union,
    thana,
    district,
    customDetailsAddress,
  } = item;

  const formattedBatchTime = moment(batchTime).format("MMMM Do YYYY");

  return (
    <Pressable
      style={styles.cardContainer}
      android_ripple={{ color: "gray" }}
      onPress={() =>
        navigation.navigate("ViewTuitionBatchDetails", {
          courseData: item,
        })
      }
    >
      <View
        style={{
          flexDirection: "row",
          marginBottom: 10,
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginRight: 10,
          }}
        >
          {teacherDetails.profilePic && teacherDetails.profilePic !== null ? (
            <View
              style={{
                fontWeight: "bold",
                color: "white",
                backgroundColor: "#040E29",
                borderRadius: 100,
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Image
                style={styles.image}
                source={{
                  uri: teacherDetails.profilePic,
                }}
              />
            </View>
          ) : (
            <View
              style={{
                // backgroundColor: "green",
                borderRadius: 50,
                borderWidth: 2,
                borderColor: "#040E29",
                padding: 4,
                backgroundColor: "#040E29",
                width: 40, // Dimensions.get("window").width * 0.13,
                height: 40, // Dimensions.get("window").width * 0.13,
                borderRadius: 25, // Make it round

                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ProfileIcon
                name="user"
                size={20} // {Dimensions.get("window").width * 0.07}
                color="white"
              />
            </View>
          )}
        </View>

        <View>
          <Text style={styles.title}>{batchTitle}</Text>
          <View>
            <View
              style={{
                flexDirection: "row",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={styles.userName}>{teacherDetails.name}</Text>

              {teacherDetails.verified === true && (
                <View style={{ marginLeft: 10 }}>
                  <VerifyIcon name="verified-user" size={16} color="#040E29" />
                </View>
              )}
            </View>
          </View>
        </View>
      </View>

      <View
        style={styles.cardInnerContainer}
        android_ripple={{ color: "#040E29" }}
      >
        <View style={styles.contentContainer}>
          <Text style={{ fontSize: RFValue(12) }}>
            Class: {item.batchClass}
          </Text>
          <Text style={{ fontSize: RFValue(12) }}>Subject: {item.subject}</Text>
          <Text style={{ fontSize: RFValue(12) }}>
            Phone: {teacherDetails.phone}
          </Text>
          {/* <Text style={{ fontSize: RFValue(12) }}>Batch Start Date</Text> */}
          <Text
            style={{
              borderRadius: 10,
              fontWeight: "bold",
              fontSize: RFValue(12),
            }}
          >
            Start: {formattedBatchTime}
          </Text>
        </View>

        <View style={styles.detailsContainer}>
          <Text
            style={{
              fontSize: RFValue(12),
              fontWeight: "bold",
            }}
          >
            Course Fee
          </Text>

          <View style={styles.courseFeeBox}>
            <Text style={styles.courseFeeText}>{courseFee} টাকা</Text>
          </View>
        </View>
      </View>

      <View style={{ marginTop: 5 }}>
        {(village || union || thana || district) && (
          <View>
            <Text style={{ fontSize: RFValue(12) }}>
              {village && `${village},`} {union && `${union},`}{" "}
              {thana && `${thana},`} {district && `${district}`}
            </Text>
          </View>
        )}
      </View>
    </Pressable>
  );
};

const ViewTuitionBatch = ({ navigation, route }) => {
  // * redux store user
  const userInfo = useSelector((state) => state.userInfo);

  const [searchTuitionBatch] = useSearchTuitionBatchMutation();

  const CategoryData = [
    "All",
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
    "All",
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

  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedClass, setSelectedClass] = useState("All");
  const [batchClass, setBatchClass] = useState("All");

  //   useEffect(() => {
  //     // Filter the data based on user input
  //     const filtered = data.filter(item => {
  //       return (
  //         (subject === '' || item.subject.toLowerCase().includes(subject.toLowerCase())) &&
  //         (category === 'All' || item.category.toLowerCase() === category.toLowerCase()) &&
  //         (selectedClass === 'All' || item.batchClass.toLowerCase() === `class ${selectedClass}`.toLowerCase())
  //       );
  //     });

  //     setFilteredData(filtered);
  //   }, [subject, category, selectedClass]);

  const [allBatch, setAllBatch] = useState([]);

  const handleCategorySelection = (item) => {
    setCategory(item === category ? null : item);
  };
  const handleClassSelection = (item) => {
    setSelectedClass(item === category ? null : item);
  };

  const handleSelection = (item) => {
    setBatchClass(item === batchClass ? null : item);
  };

  const [loading, setLoading] = useState(false);
  const [uAddress, setUAddress] = useState("");

  const submitStatus = async () => {
    setLoading(true);
    const payload = {
      address: uAddress,
      batchClass: batchClass,
      category: category,
      subject: subject,
    };

    console.log("this is filter payload ", payload);

    const filterData = await searchTuitionBatch(payload);

    console.log("this is filter data ", filterData.data.result);
    setAllBatch(
      !filterData.data.result.length === false ? filterData.data.result : null
    );

    setLoading(false);
  };

  useEffect(() => {
    getAllBatchApi();
  }, []);

  const getAllBatchApi = async () => {
    const payload = {
      address: "",
      batchClass: selectedClass,
      category: category,
      subject: subject,
    };

    const allBatch = await searchTuitionBatch(payload);

    console.log("this is batch api ", allBatch.data.result);

    setAllBatch(allBatch.data.result);
  };

  return (
    <View>
      <CreateBatchHeader navigation={navigation}></CreateBatchHeader>

      <ScrollView style={{ marginTop: StatusBar.currentHeight + 55 }}>
        <View style={{ padding: 10 }}>
          <View>
            <Text style={{ paddingBottom: 5, fontWeight: "bold" }}>
              Subject:
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#EEEEEE",
                padding: 10,
                borderRadius: 8,
                backgroundColor: "#F9F9F9",
              }}
              placeholder="Search by subject"
              onChangeText={(e) => setSubject(e)}
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={{ fontWeight: "bold" }}>Category: {category}</Text>
            <View>
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
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={{ fontWeight: "bold" }}>Class: {batchClass}</Text>
            <View
              style={{
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
            <View style={{ marginTop: 10 }}>
              <Text style={{ fontWeight: "bold" }}>Location:</Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: "#EEEEEE",
                  padding: 10,
                  borderRadius: 8,
                  backgroundColor: "#F9F9F9",
                }}
                placeholder="Search by location"
                onChangeText={(e) => setUAddress(e)}
                value={uAddress}
              />
            </View>
          </View>

          <View style={{ marginVertical: 10, alignItems: "flex-end" }}>
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
                submitStatus();
              }}
            >
              {loading === true ? (
                <View style={{ alignItems: "center" }}>
                  <ActivityIndicator size="small" color="white" />
                </View>
              ) : (
                <Text style={{ color: "white", fontSize: RFValue(14) }}>
                  Search
                </Text>
              )}

              <IonIcon
                style={{
                  fontSize: RFValue(14),
                  color: "white",
                  marginLeft: 14,
                }}
                name={"search-outline"}
              />
            </TouchableOpacity>
          </View>
          {/* Display your filtered data */}

          <View>
            <Text style={{ fontWeight: "bold" }}>Learning Opportunities</Text>
          </View>
          {allBatch !== null &&
            allBatch.map((item) => (
              <CourseCard item={item} navigation={navigation}></CourseCard>
            ))}

          {allBatch !== null && !allBatch.length && (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 30,
              }}
            >
              <ActivityIndicator size="large" color="#040E29" />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#fff",
    marginVertical: 5,
    padding: 10,
    borderRadius: 5,
    elevation: 3,
  },
  cardInnerContainer: {
    flexDirection: "row",
  },
  image: {
    width: 40, // Dimensions.get("window").width * 0.13,
    height: 40, // Dimensions.get("window").width * 0.13,
    borderRadius: 100,
  },
  contentContainer: {
    flex: 2,
  },
  detailsContainer: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: RFValue(16),
    fontWeight: "bold",
    marginBottom: 0,
  },
  textContainer: {
    flex: 1,
  },
  userName: {
    fontSize: RFValue(13),
    fontWeight: "bold",
  },
  courseFeeBox: {
    width: 90,
    height: 30,
    backgroundColor: "#040E29",
    borderRadius: 5,
    alignItems: "center", // Center horizontally
    justifyContent: "center", // Center vertically
  },
  courseFeeText: {
    color: "white",
    fontWeight: "bold",
    fontSize: RFValue(13),
    textAlign: "center", // Center text horizontally
  },
});

export default ViewTuitionBatch;
