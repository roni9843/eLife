import moment from "moment";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons"; // Import Ionicons from the appropriate library

const ViewTuitionBatchDetails = ({ route }) => {
  console.log("this is route ", route);

  // Check if profilePic is available, otherwise use IonIcon as a placeholder
  const imageSource = route.params.courseData.teacherDetails.profilePic
    ? { uri: route.params.courseData.teacherDetails.profilePic }
    : null; // Set to null when the profilePic is not available

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {imageSource ? (
          <Image source={imageSource} style={styles.teacherImage} />
        ) : (
          <IonIcon
            style={{
              marginBottom: -9,
              marginHorizontal: -5,
              fontSize: 100,
              color: "white",
            }}
            name={"person-circle-outline"}
          />
        )}
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
          {moment(route.params.courseData.batchTime).format(
            "MMMM Do YYYY, h:mm a"
          )}
        </Text>
        <Text style={styles.details}>
          Total Sets: {route.params.courseData.totalSet}
        </Text>
        <Text style={styles.details}>
          Course Fee: ${route.params.courseData.courseFee}
        </Text>
        <Text style={styles.details}>
          Fee Type: {route.params.courseData.feeType}
        </Text>
        <Text style={styles.details}>
          Location: {route.params.courseData.village},{" "}
          {route.params.courseData.district}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
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
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
  },
  teacherImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#ddd",
  },
  detailsContainer: {
    marginBottom: 20,
  },
  details: {
    fontSize: 18,
    marginBottom: 10,
    color: "#333",
    backgroundColor: "#f8f8f8",
    padding: 15,
    borderRadius: 10,
  },
  teacherContainer: {
    borderTopWidth: 1,
    paddingTop: 15,
  },
  teacherTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  teacherDetails: {
    fontSize: 18,
    marginBottom: 5,
    color: "#555",
  },
});

export default ViewTuitionBatchDetails;
