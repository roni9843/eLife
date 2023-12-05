import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useSelector } from "react-redux";
import BloodHeader from "../../components/HeaderBar/BloodHeader";
import {
  useGetAllBloodUserQuery,
  useGetBloodByAddressMutation,
} from "../../redux/apiSlice";
import StatusCard from "./StatusCard ";
const Blood = ({ navigation }) => {
  // * redux store user
  const userInfo = useSelector((state) => state.userInfo);

  const bloodGroups = ["All", "A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

  const { width } = Dimensions.get("window");

  const { data: allBloodUserApi, refetch: reFetchAllBlood } =
    useGetAllBloodUserQuery();

  const [initialData, setInitialData] = useState([]);

  const [allBloodData, setAllBloodData] = useState([]);

  const [loading, setLoading] = useState(true);

  const [getBloodByAddress] = useGetBloodByAddressMutation();

  useEffect(() => {
    console.log("call blood -> ");
    reCallForBlood();

    // if (allBloodUserApi) {
    //   console.log("allBloodUser -> ", allBloodUserApi.user);

    //   setAllBloodData(allBloodUserApi.user);
    //   setInitialData(allBloodUserApi.user);
    //   setLoading(false);
    // }

    searchAddress();
  }, []);

  const reCallForBlood = async () => {
    const reFetchFunc = await reFetchAllBlood();

    console.log("this is reFetch -> ", reFetchFunc);
  };

  const [selectedLocation, setSelectedLocation] = useState(""); // Added location state

  // ? search by address
  const searchAddress = async () => {
    setLoading(true);

    const payload = {
      searchText: selectedLocation,
    };

    const result = await getBloodByAddress(payload);

    console.log("this is result -> ", result);

    setAllBloodData(result.data.user);
    setInitialData(result.data.user);

    setLoading(false);
  };

  const [selectedGroup, setSelectedGroup] = useState("All");

  useEffect(() => {
    if (allBloodUserApi) {
      if (selectedGroup !== "All") {
        const filterBlood = initialData.filter(
          (dt) => dt.bloodGroup === selectedGroup
        );

        setAllBloodData(filterBlood);
      }

      if (selectedGroup === "All") {
        setAllBloodData(initialData);
      }
    }
  }, [selectedGroup]);

  return (
    <View style={{}}>
      <BloodHeader navigation={navigation}></BloodHeader>

      <ScrollView>
        <View style={{ marginTop: StatusBar.currentHeight + 50 }}>
          <View style={{}}>
            {userInfo.currentUser && (
              <View
                style={{
                  backgroundColor: "#ED1F4C",
                  padding: 20,
                  borderBottomRightRadius: 25,
                  borderBottomLeftRadius: 25,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: 10,
                    alignItems: "center",
                  }}
                >
                  <View>
                    <Text style={{ color: "white", fontSize: 20 }}>Hello,</Text>
                    <Text
                      style={{
                        color: "white",
                        fontSize: 20,
                        fontWeight: "bold",
                      }}
                    >
                      {userInfo.currentUser.name}
                    </Text>
                    <Text style={{ color: "white", fontSize: 14 }}>
                      Hope you're well today
                    </Text>
                  </View>

                  {userInfo.currentUser.bloodGroup && (
                    <View>
                      <View
                        style={{
                          backgroundColor: "white",
                          padding: 10,
                          backgroundColor: "white",
                          borderRadius: 10,
                        }}
                      >
                        <Text
                          style={{
                            color: "#ED1F4C",
                            fontSize: RFValue(16),
                            fontWeight: "bold",
                          }}
                        >
                          {userInfo.currentUser?.bloodGroup}
                        </Text>
                      </View>
                    </View>
                  )}
                </View>
              </View>
            )}

            {/* Added location search section */}

            <View style={{ marginHorizontal: 25 }}>
              <View style={{ marginTop: 10 }}>
                <View style={{}}>
                  <Text style={{ padding: 5, fontWeight: "bold" }}>
                    Location:
                  </Text>
                  <TextInput
                    style={{
                      borderWidth: 1,
                      borderColor: "#EEEEEE",
                      padding: 10,
                      borderRadius: 8,
                      backgroundColor: "#F9F9F9",
                    }}
                    placeholder="find by location..."
                    onChangeText={(text) => setSelectedLocation(text)}
                    value={selectedLocation}
                  />
                </View>
                <View style={{ marginTop: 10 }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#ED1F4C",
                      padding: 10,
                      borderRadius: 5,
                      alignItems: "center",
                    }}
                    onPress={() => searchAddress()}
                  >
                    <Text style={{ color: "white", fontSize: RFValue(14) }}>
                      Search
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={{ marginHorizontal: 25, marginTop: 10 }}>
              <View>
                <Text
                  style={{ fontSize: 15, marginBottom: 10, color: "#616C7D" }}
                >
                  Select blood group
                </Text>
              </View>
              <View
                style={{ flexDirection: "row" }}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16 }}
              >
                {bloodGroups.map((group, index) => (
                  <TouchableOpacity
                    key={index}
                    style={{
                      backgroundColor:
                        selectedGroup === group ? "#ED1F4C" : "white",
                      padding: width * 0.01,
                      marginRight: 5,
                      borderRadius: 5,
                      borderWidth: 1,
                      borderColor: "#ED1F4C",
                    }}
                    onPress={() => {
                      // Update the selected group
                      setSelectedGroup(group);
                    }}
                  >
                    <Text
                      style={{
                        color: selectedGroup === group ? "white" : "#ED1F4C",
                        fontSize: RFValue(14),
                      }}
                    >
                      {group}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View style={{ marginTop: 10 }}>
                <Text
                  style={{ fontSize: 15, marginBottom: 10, color: "black" }}
                >
                  Donation request
                </Text>
              </View>
              {loading && (
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
              <View>
                {allBloodData &&
                  allBloodData.map((dt) => (
                    <StatusCard
                      name={dt.name}
                      image={dt.profilePic}
                      bloodGrp={dt.bloodGroup}
                      //  lastDonateDate={dt.lastDonateDate}
                      lastDonateDate={"12/04/2023"}
                      donateCount={dt.numberOfDonate}
                      district={dt.district}
                      thana={dt.thana}
                      union={dt.union}
                      village={dt.village}
                      verified={dt.verified}
                      gender={dt.gender}
                      phone={dt.phone}
                    ></StatusCard>
                  ))}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Blood;
