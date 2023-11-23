import React, { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";
import CreateBatchHeader from "../../components/HeaderBar/CreateBatchHeader";

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
        style={styles.cardInnerContainer}
        android_ripple={{ color: "#040E29" }}
      >
        <Image
          source={{ uri: teacherDetails.profilePic }}
          style={styles.image}
        />
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{batchTitle}</Text>

          <View>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Text>{teacherDetails.name}</Text>

              {teacherDetails.verified === true && (
                <View style={{ marginTop: 3, marginLeft: 5 }}>
                  <Image
                    source={require("../../assets/blueTick.png")}
                    style={{ height: 15, width: 20 }}
                  />
                </View>
              )}
            </View>
          </View>

          <Text>Class: {item.batchClass}</Text>
          <Text>Subject: {item.subject}</Text>
          <Text>Phone: {teacherDetails.phone}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text
            style={{
              textAlign: "center",
            }}
          >
            Course Fee
          </Text>
          <Text
            style={{
              textAlign: "center",
              borderWidth: 1,
              backgroundColor: "black",
              padding: 10,
              color: "white",
              borderRadius: 10,
              fontWeight: "bold",
            }}
          >
            {courseFee} টাকা
          </Text>
          <Text style={{ textAlign: "center" }}>Batch Date</Text>
          <Text
            style={{
              textAlign: "center",

              borderRadius: 10,
              fontWeight: "bold",
            }}
          >
            {formattedBatchTime}
          </Text>
        </View>
      </View>
      <View style={{ marginTop: 5 }}>
        {(village || union || thana || district) && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "gray" }}>Address : </Text>

            <Text style={{ color: "gray" }}>
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
              onChangeText={(e) => setSubject(e)}
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={{ padding: 5, fontWeight: "bold" }}>
              Category : {category}
            </Text>
            <View
              style={{
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
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={{ padding: 5, fontWeight: "bold" }}>
              Class : {batchClass}
            </Text>
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
              <Text style={{ padding: 5, fontWeight: "bold" }}>Location :</Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: "#EEEEEE",
                  padding: 10,
                  borderRadius: 8,
                  backgroundColor: "#F9F9F9",
                }}
                placeholder="Address...."
                onChangeText={(e) => setUAddress(e)}
                value={uAddress}
              />
            </View>
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
              onPress={() => {
                submitStatus();
              }}
            >
              {loading === true ? (
                <View style={{ alignItems: "center" }}>
                  <ActivityIndicator size="small" color="white" />
                </View>
              ) : (
                <Text style={{ color: "white", fontSize: 16 }}>Search</Text>
              )}

              <IonIcon
                style={{
                  fontSize: 16,
                  color: "white",
                  marginLeft: 14,
                }}
                name={"search-outline"}
              />
            </TouchableOpacity>
          </View>
          {/* Display your filtered data */}

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
    margin: 10,
    padding: 10,
    borderRadius: 8,
    elevation: 3,
  },
  cardInnerContainer: {
    flexDirection: "row",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 10,
  },
  contentContainer: {
    flex: 2,
  },
  detailsContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
});

export default ViewTuitionBatch;
