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
import VerifyIcon from "react-native-vector-icons/MaterialIcons";
import ProfileIcon from "react-native-vector-icons/SimpleLineIcons";

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
        message: `Name     : ${name},
Gender   : ${gender},
Phone    : ${phone},
bloodGrp : ${bloodGrp},
Address  : village: ${village}, union: ${union},thana: ${thana}, district: ${district}
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
          }}
        >
          <View>
            <View>
              {image && image !== null ? (
                <View
                  style={{
                    borderRadius: 100,
                  }}
                >
                  <Image
                    style={styles.image}
                    source={{
                      uri: image,
                    }}
                  />
                </View>
              ) : (
                <View
                  style={{
                    borderRadius: 50,
                    borderWidth: 2,
                    borderColor: "#040E29",
                    backgroundColor: "#040E29",
                    width: 40,
                    height: 40,
                    borderRadius: 25,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ProfileIcon
                    name="user"
                    size={20} //{Dimensions.get("window").width * 0.07}
                    color="white"
                  />
                </View>
              )}
            </View>

            <View
              style={{
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#040E29",
                  fontWeight: "bold",
                  display: "none",
                }}
              >
                {gender === "male" ? "Male" : "Female"}
              </Text>
            </View>
          </View>

          <View style={{ marginLeft: 10 }}>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: RFValue(15),
                }}
              >
                {name}
              </Text>

              {verified === true && (
                <View style={{ marginLeft: 10 }}>
                  <VerifyIcon name="verified-user" size={16} color="#040E29" />
                </View>
              )}
            </View>

            <View>
              <Text style={{ color: "#040E29", fontSize: RFValue(13) }}>
                {phone}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            alignItems: "flex-end",
            justifyContent: "flex-end",
            flex: 1,
            marginTop: 10,
          }}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: 35,
              height: 35,
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
                fontSize: RFValue(14),
                backgroundColor: "#ED1F4C",
                borderRadius: 50,
              }}
            >
              {bloodGrp}
            </Text>
          </View>
        </View>
      </View>

      <View>
        {donateCount > 0 && (
          <Text style={styles.lastDonateDate}>
            Last Donate: {lastDonateDate}
          </Text>
        )}

        <Text style={styles.donateCount}>Total Donations: {donateCount}</Text>
        <Text style={styles.donateCount}>Blood Group: {bloodGrp}</Text>
      </View>

      <View style={{ marginTop: 1 }}>
        {(village || union || thana || district) && (
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Text>
              {village && `${village},`} {union && `${union},`}{" "}
              {thana && `${thana},`} {district && `${district}`}
            </Text>
          </View>
        )}
      </View>

      <View
        style={{ marginTop: 3, borderTopWidth: 0.3, borderTopColor: "gray" }}
      >
        <TouchableOpacity
          onPress={onShare}
          style={{
            flexDirection: "row",
            textAlign: "center",
            justifyContent: "center",
            paddingTop: 5,
            alignContent: "center",
            alignItems: "center",
            alignSelf: "flex-end",
          }}
        >
          <Text
            style={{
              fontSize: RFValue(15),
              color: "gray",
            }}
          >
            Share
          </Text>
          <IonIcon
            style={{
              fontSize: 20,
              color: "#040E29",
              marginLeft: 10,
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
    borderRadius: 5,
    marginVertical: 5,
  },

  card: {
    flexDirection: "row",
    marginBottom: 5,
  },

  image: {
    width: 40, //Dimensions.get("window").width * 0.13,
    height: 40, //Dimensions.get("window").width * 0.13,
    borderRadius: 100,
  },
  textContainer: {
    marginLeft: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  bloodGrp: {
    fontSize: RFValue(13),
  },
  lastDonateDate: {
    fontSize: RFValue(13),
  },
  donateCount: {
    fontSize: RFValue(13),
  },

  waterDrop: {
    width: Dimensions.get("window").width * 0.13,
    height: Dimensions.get("window").width * 0.13,
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
