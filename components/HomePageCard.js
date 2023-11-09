import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";

const HomePageCard = (props) => {
  console.log("this is props", props);

  // const image = props.img; // ../assets/DemoImage.png
  const [take, _setTake] = useState(props.tData.subject);

  return (
    <TouchableOpacity
      onPress={() =>
        props.navigation.navigate("VisitProfile", {
          data: props.tData._id,
        })
      }
      style={Styles.container}
    >
      <View style={Styles.boxContainer}>
        <View style={Styles.ImageContainer}>
          {props.tData.image !== null && "image" in props.tData ? (
            <Image
              style={{
                borderRadius: 100,
                height: 55,
                width: 55,
                borderWidth: 1,
                borderColor: "#040E29",
              }}
              source={{
                // uri: image,
                uri: props.tData.image,
              }}
            />
          ) : (
            <View style={{}}>
              <IonIcon
                style={{
                  position: "absolute",
                  fontSize: 65,
                  color: "black",

                  // alignSelf: "center",
                  top: -35,
                  left: -35,
                }}
                name={"person-circle-outline"}
              />
            </View>
          )}
        </View>
        <View
          style={{
            top: props?.tData?.image ? -8 : 18,
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            {props.tData.name}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            top: props?.tData?.image ? -8 : 16,
          }}
        >
          <View>
            <Text
              style={{
                textAlign: "center",
                justifyContent: "center",
                alignItems: "center",
                color: "gray",
              }}
            >
              {props?.tData?.teacherSubject}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Styles = StyleSheet.create({
  // container: {
  //   margin: 5,
  //   borderWidth: 1,
  //   borderColor: "#707070",
  //   padding: 5,
  //   borderRadius: 10,
  //   backgroundColor: "white",
  // },
  // boxContainer: {
  //   flexDirection: "row",
  // },
  // ImageContainer: {
  //   flex: 2,
  // },
  // InfoContainer: {
  //   flex: 3,
  // },

  container: {
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    backgroundColor: "white",
    marginVertical: 10,
    marginHorizontal: 5,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    width: 300,
  },
  boxContainer: {
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
  },

  ImageContainer: {
    top: -10,
    position: "relative",
  },

  textSubjectContainer: {
    flexDirection: "row",
    top: -8,
  },
});

export default HomePageCard;
