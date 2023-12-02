import moment from "moment";
import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const ViewTuitionBatchDetails = ({ route }) => {
  console.log("this is route ", route);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{
            uri:
              route.params.courseData.teacherDetails.profilePic +
              `?${Math.random()}`,
          }}
          style={styles.teacherImage}
        />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{route.params.courseData.batchTitle}</Text>
          <Text style={styles.subtitle}>{route.params.courseData.bio}</Text>
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.details}>
          Category: {route.params.courseData.category}
        </Text>
        <Text style={styles.details}>
          Batch Time:{" "}
          {moment(route.params.courseData.batchTime).format("MMMM Do YYYY")}
        </Text>
        <Text style={styles.details}>
          Total Sets: {route.params.courseData.totalSet}
        </Text>
        <Text style={styles.details}>
          Course Fee: {route.params.courseData.courseFee} টাকা
        </Text>
        <Text style={styles.details}>
          Fee Type: {route.params.courseData.feeType}
        </Text>
        <Text style={styles.details}>
          Location: {route.params.courseData?.village},{" "}
          {route.params.courseData?.union} {route.params.courseData?.thana}{" "}
          {route.params.courseData?.district}{" "}
        </Text>
      </View>

      {/* Render teacher details */}
      <View style={styles.teacherContainer}>
        <Text style={styles.teacherTitle}>Teacher Details</Text>
        <Text style={styles.teacherDetails}>
          Name: {route.params.courseData.teacherDetails.name}
        </Text>
        <Text style={styles.teacherDetails}>
          Phone: {route.params.courseData.teacherDetails.phone}
        </Text>
        {/* Add other teacher details as needed */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  titleContainer: {
    marginLeft: 20,
  },
  title: {
    fontSize: Dimensions.get("window").width * 0.06, // Responsive font size
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: Dimensions.get("window").width * 0.04, // Responsive font size
    color: "#555",
  },
  teacherImage: {
    width: Dimensions.get("window").width * 0.25, // Responsive image width
    height: Dimensions.get("window").width * 0.25, // Responsive image height
    borderRadius: Dimensions.get("window").width * 0.125, // Responsive border radius
    borderWidth: 2,
    borderColor: "#ddd",
  },
  detailsContainer: {
    marginBottom: 20,
  },
  details: {
    fontSize: Dimensions.get("window").width * 0.04, // Responsive font size
    marginBottom: 10,
    color: "#333",
    backgroundColor: "#f8f8f8",
    padding: 15,
    borderRadius: 10,
  },
  teacherContainer: {
    borderTopWidth: 1,
    paddingTop: 15,
    paddingBottom: 15,
  },
  teacherTitle: {
    fontSize: Dimensions.get("window").width * 0.05, // Responsive font size
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  teacherDetails: {
    fontSize: Dimensions.get("window").width * 0.04, // Responsive font size
    marginBottom: 5,
    color: "#555",
  },
});

export default ViewTuitionBatchDetails;
