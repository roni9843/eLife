import React from "react";
import {
  Alert,
  Dimensions,
  Image,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";

import { RFValue } from "react-native-responsive-fontsize";

const StatusCard = ({
  name,
  image,
  bloodGrp,
  lastDonateDate,
  donateCount,
  verified,
  phone,
  gender,
  district,
  thana,
  union,
  village,
}) => {
  // ? share btn
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `
        Name     : ${name},
        Gender   : ${gender},
        Phone    : ${phone},
        bloodGrp : ${bloodGrp},
        Address  : village ${village}, union ${union},thana ${thana}, district ${district}
          `,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View style={styles.ImageContainer}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {image && image !== null ? (
                <View
                  style={{
                    fontWeight: "bold",
                    color: "white",

                    backgroundColor: "#040E29",
                    borderRadius: 100,
                    margin: 0,
                    padding: 0,
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Image
                    style={styles.image}
                    source={{
                      // uri: image,
                      uri: image,
                    }}
                  />
                </View>
              ) : (
                <View
                  style={{
                    fontWeight: "bold",
                    color: "white",

                    //backgroundColor: "#040E29",
                    borderRadius: 100,
                    margin: 0,
                    padding: 0,
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <IonIcon
                    style={{
                      fontSize: 60,
                      color: "black",
                    }}
                    name={"person-circle-outline"}
                  />
                </View>
              )}
            </View>
            <View
              style={{
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#040E29", fontWeight: "bold" }}>
                {gender === "male" ? "Male" : "Female"}
              </Text>
            </View>
          </View>
          <View style={{ marginLeft: 10 }}>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  marginTop: 2,
                  fontSize: 20,
                  fontWeight: "bold",
                  fontSize: RFValue(16),
                }}
              >
                {name}
              </Text>

              {verified === true && (
                <View style={{ marginTop: 3, marginLeft: 5 }}>
                  <Image
                    source={require("../../assets/blueTick.png")}
                    style={{
                      height: 20,
                      width: Dimensions.get("window").width * 0.05,
                    }}
                  />
                </View>
              )}
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#040E29" }}>{phone}</Text>
            </View>

            <Text style={styles.lastDonateDate}>
              Last Donate: {lastDonateDate}
            </Text>
            <Text style={styles.donateCount}>
              Total Donations: {donateCount}
            </Text>
            <Text style={styles.donateCount}>Blood Group: {bloodGrp}</Text>
          </View>
        </View>
        <View
          style={{
            alignItems: "flex-end",
            justifyContent: "flex-end",
            flex: 1,
          }}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "flex-end",

              padding: 10,
            }}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: 40,
                height: 40,
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                borderBottomLeftRadius: 30,
                backgroundColor: "#ED1F4C",
                transform: [{ rotateZ: "225deg" }],
              }}
            >
              <Text
                style={{
                  color: "white",
                  transform: [{ rotateZ: "135deg" }],
                  fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                {bloodGrp}
              </Text>
            </View>
            <View>
              <Text style={{ fontWeight: "bold", color: "#ED1F4C" }}>
                Donate
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{ marginTop: 5 }}>
        {(village || union || thana || district) && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "80%",
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
      <View
        style={{ marginTop: 10, borderTopWidth: 0.3, borderTopColor: "gray" }}
      >
        <TouchableOpacity
          onPress={onShare}
          style={{
            flexDirection: "row",
            textAlign: "center",
            justifyContent: "center",
            padding: 10,
            alignContent: "center",
            alignItems: "center",
            alignSelf: "flex-end",
          }}
        >
          <Text
            style={{
              fontSize: 16,
            }}
          >
            Share
          </Text>
          <IonIcon
            style={{
              fontSize: 18,
              marginLeft: 14,
            }}
            name={"arrow-redo-outline"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
  },

  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  textContainer: {
    marginLeft: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  bloodGrp: {
    fontSize: 16,
  },
  lastDonateDate: {
    fontSize: 14,
  },
  donateCount: {
    fontSize: 14,
  },

  waterDrop: {
    width: 100,
    height: 150,
    backgroundColor: "blue",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  topBulge: {
    width: 80,
    height: 60,
    backgroundColor: "blue",
    borderRadius: 80,
    position: "absolute",
    top: 0,
    left: 10,
    right: 10,
  },
  bottomBulge: {
    width: 80,
    height: 60,
    backgroundColor: "blue",
    borderRadius: 80,
    position: "absolute",
    bottom: 0,
    left: 10,
    right: 10,
  },
});

export default StatusCard;
