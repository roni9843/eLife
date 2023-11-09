import React, { useEffect } from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";

import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuProvider,
  MenuTrigger,
} from "react-native-popup-menu";
import IonIcon from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";
import ViewPageHeader from "../../components/HeaderBar/ViewPageHeader";

const TargetStudentBox = ({ item }) => {
  return (
    <View style={{ width: "33%" }}>
      <Text
        style={{
          backgroundColor: "white",
          padding: 5,
          margin: 5,
          borderRadius: 5,
          color: "#040E29",
          textAlign: "center",
        }}
      >
        {item.class}
      </Text>
    </View>
  );
};

const StatusBox = ({ item }) => {
  return (
    <View
      style={{
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#E0E0E0",
        padding: 10,
        marginTop: 10,
        backgroundColor: "white",
      }}
    >
      <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View>
            <IonIcon
              style={{
                fontSize: 40,
                color: "black",
              }}
              name={"person-circle-outline"}
            />
          </View>
          <View style={{ marginLeft: 5 }}>
            <View>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                {item.name}
              </Text>
              <Text style={{ fontSize: 10, color: "gray" }}>{item.date}</Text>
            </View>
          </View>
        </View>
        <View>
          <MenuProvider backHandler={true} style={{ padding: 5 }}>
            <Menu>
              <MenuTrigger
                customStyles={{
                  triggerWrapper: {
                    marginLeft: 40,
                    paddingVertical: 15,
                  },
                }}
              >
                <IonIcon
                  style={{
                    fontSize: 20,
                    color: "black",
                  }}
                  name={"ellipsis-vertical-sharp"}
                />
              </MenuTrigger>
              <MenuOptions
                style={{
                  backgroundColor: "#EEEEEE",
                  borderWidth: 1,
                  borderColor: "#999EA2",
                  width: 60,
                }}
              >
                <MenuOption onSelect={() => alert(`Edit`)} text="Edit" />
                <MenuOption>
                  <Text style={{ color: "red" }}>Delete</Text>
                </MenuOption>
              </MenuOptions>
            </Menu>
          </MenuProvider>
        </View>
      </View>
      <View>
        <Text>{item.status}</Text>
      </View>
    </View>
  );
};

const ViewProfile = ({ navigation }) => {
  // * redux store user
  const userInfo = useSelector((state) => state.userInfo);

  useEffect(() => {
    console.log("this is View screen data ", userInfo.viewScreenData);
  }, []);

  const targetStudents = [
    { id: 1, class: "1" },
    { id: 2, class: "2" },
    { id: 3, class: "3" },
    { id: 4, class: "4" },
    { id: 5, class: "5" },
    { id: 6, class: "6" },
    { id: 7, class: "7" },
    { id: 8, class: "8" },
    { id: 9, class: "9 Science" },
    { id: 10, class: "9 Commerce" },
    { id: 11, class: "9 Arts" },
    { id: 12, class: "10 Science" },
    { id: 13, class: "10 Commerce" },
    { id: 14, class: "10 Arts" },
    { id: 15, class: "11 Science" },
    { id: 16, class: "11 Commerce" },
    { id: 17, class: "11 Arts" },
    { id: 18, class: "12 Science" },
    { id: 19, class: "12 Commerce" },
    { id: 20, class: "12 Arts" },
  ];

  const targetSubject = [
    { id: 1, class: "English" },
    { id: 2, class: "Bangla" },
    { id: 3, class: "Math" },
    { id: 4, class: "Science" },
    { id: 5, class: "History" },
    { id: 6, class: "Physic" },
    { id: 7, class: "Biology" },
    { id: 8, class: "Accounting" },
    { id: 9, class: "Finance and Banking" },
  ];

  const statusData = [
    {
      id: 1,
      name: "Jubayth Hossen Roni",
      date: "05-07-2023",
      status:
        "distinctio ex commodi facere, corporis nesciunt. Dolorum nihil distinctio unde velit omnis. Laborum iusto dolortempore eum beatae possimus, officia omnis illo a doloremque nisi dolore, suscipit delectus perspiciatis",
    },
    {
      id: 2,
      name: "Jubayth Hossen Roni",
      date: "05-07-2023",
      status:
        "distinctio ex commodi facere, corporis nesciunt. Dolorum nihil distinctio unde velit omnis. Laborum iusto dolortempore eum beatae possimus, officia omnis illo a doloremque nisi dolore, suscipit delectus perspiciatis",
    },
    {
      id: 3,
      name: "Jubayth Hossen Roni",
      date: "05-07-2023",
      status:
        "distinctio ex commodi facere, corporis nesciunt. Dolorum nihil distinctio unde velit omnis. Laborum iusto dolortempore eum beatae possimus, officia omnis illo a doloremque nisi dolore, suscipit delectus perspiciatis",
    },
    {
      id: 4,
      name: "Jubayth Hossen Roni",
      date: "05-07-2023",
      status:
        "distinctio ex commodi facere, corporis nesciunt. Dolorum nihil distinctio unde velit omnis. Laborum iusto dolortempore eum beatae possimus, officia omnis illo a doloremque nisi dolore, suscipit delectus perspiciatis",
    },
    {
      id: 5,
      name: "Jubayth Hossen Roni",
      date: "05-07-2023",
      status:
        "distinctio ex commodi facere, corporis nesciunt. Dolorum nihil distinctio unde velit omnis. Laborum iusto dolortempore eum beatae possimus, officia omnis illo a doloremque nisi dolore, suscipit delectus perspiciatis",
    },
    {
      id: 6,
      name: "Jubayth Hossen Roni",
      date: "05-07-2023",
      status:
        "distinctio ex commodi facere, corporis nesciunt. Dolorum nihil distinctio unde velit omnis. Laborum iusto dolortempore eum beatae possimus, officia omnis illo a doloremque nisi dolore, suscipit delectus perspiciatis",
    },
  ];

  //   state = {
  //     selectedItems : []
  //   };

  return (
    <View style={Styles.container}>
      <ViewPageHeader navigation={navigation}></ViewPageHeader>
      <ScrollView>
        <View style={Styles.containerTop}></View>

        <View style={Styles.ImageContainer}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                fontWeight: "bold",
                color: "white",
                marginTop: -50,
                backgroundColor: "#040E29",
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
                  marginBottom: -9,
                  marginHorizontal: -5,
                  fontSize: 100,
                  color: "white",
                }}
                name={"person-circle-outline"}
              />
            </View>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignContent: "center",
              textAlign: "center",
            }}
          >
            <View>
              <Text
                style={{
                  marginTop: 2,
                  fontSize: 20,
                  fontWeight: "bold",
                  justifyContent: "center",
                  alignContent: "center",
                  textAlign: "center",
                }}
              >
                Jubayth Hossen Roni
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 15,
                  color: "#81818A",
                  justifyContent: "center",
                  alignContent: "center",
                  textAlign: "center",
                }}
              >
                Computer Science & Engineering (CSE)
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{ marginTop: 8, height: 2, backgroundColor: "#E0E0E0" }}
        ></View>
        <View style={{ padding: 10 }}>
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <IonIcon
                style={{
                  fontSize: 18,
                  color: "#040E29",
                  marginRight: 10,
                }}
                name={"receipt-outline"}
              />
              <Text
                style={{ color: "#040E29", fontSize: 18, fontWeight: "bold" }}
              >
                Bio
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#81818A", marginTop: 5 }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Suscipit sint expedita necessitatibus, dolore nihil error quasi
                id perferendis laudantium eos labore aspernatur libero saepe
                velit commodi cum ex in hic assumenda accusamus. Quos, sit
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{ marginTop: 8, height: 2, backgroundColor: "#E0E0E0" }}
        ></View>
        <View style={{ padding: 10 }}>
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <IonIcon
                style={{
                  fontSize: 23,
                  color: "#040E29",
                  marginRight: 10,
                }}
                name={"location-outline"}
              />
              <Text style={{ color: "#040E29" }}>
                New Sonakanda, Ruhitpur, Keranigonj, Dhaka
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <IonIcon
                style={{
                  fontSize: 20,
                  color: "#040E29",
                  marginRight: 10,
                }}
                name={"call-outline"}
              />
              <Text style={{ color: "#040E29" }}>(0088) 0186372864 </Text>
            </View>
          </View>
        </View>
        <View
          style={{ marginTop: 8, height: 2, backgroundColor: "#E0E0E0" }}
        ></View>
        <View style={{ padding: 10 }}>
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <IonIcon
                style={{
                  fontSize: 19,
                  color: "#040E29",
                  marginRight: 10,
                  marginLeft: 4,
                }}
                name={"book-outline"}
              />
              <Text
                style={{ color: "#040E29", fontSize: 18, fontWeight: "bold" }}
              >
                Target Student
              </Text>
            </View>
            <View style={{ flex: 1, flexDirection: "row" }}>
              {
                <FlatList
                  columnWrapperStyle={{ justifyContent: "space-between" }}
                  numColumns={3}
                  data={targetStudents}
                  renderItem={({ item }) => <TargetStudentBox item={item} />}
                  keyExtractor={(item) => item.id}
                />
              }
            </View>
          </View>
        </View>
        <View
          style={{ marginTop: 8, height: 2, backgroundColor: "#E0E0E0" }}
        ></View>
        <View style={{ padding: 10 }}>
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <IonIcon
                style={{
                  fontSize: 19,
                  color: "#040E29",
                  marginRight: 10,
                }}
                name={"bookmark-outline"}
              />
              <Text
                style={{ color: "#040E29", fontSize: 18, fontWeight: "bold" }}
              >
                Target Subject
              </Text>
            </View>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <FlatList
                columnWrapperStyle={{ justifyContent: "space-between" }}
                numColumns={3}
                data={targetSubject}
                renderItem={({ item }) => <TargetStudentBox item={item} />}
                keyExtractor={(item) => item.id}
              />
            </View>
          </View>
        </View>
        <View
          style={{ marginTop: 8, height: 2, backgroundColor: "#E0E0E0" }}
        ></View>
        <View style={{ padding: 10 }}>
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <IonIcon
                style={{
                  fontSize: 20,
                  color: "#040E29",
                  marginRight: 10,
                }}
                name={"mail-open-outline"}
              />
              <Text
                style={{ color: "#040E29", fontSize: 18, fontWeight: "bold" }}
              >
                Posts
              </Text>
            </View>
          </View>
          <View>
            <View>
              <FlatList
                data={statusData}
                renderItem={({ item }) => <StatusBox item={item} />}
                keyExtractor={(item) => item.id}
              />
            </View>
          </View>
        </View>
        <View></View>
      </ScrollView>
    </View>
  );
};

export default ViewProfile;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F8FB",
  },
  containerTop: {
    backgroundColor: "#040E29",
    height: 200,
  },
  ImageContainer: {
    backgroundColor: "#F4F8FB",
    height: 100,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: -40,
  },
});
