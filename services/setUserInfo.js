import AsyncStorage from "@react-native-async-storage/async-storage";

const setUserInfo = async (props) => {
  try {
    const jsonString = JSON.stringify(props);

    await AsyncStorage.setItem("eLifeStore", jsonString);
  } catch (error) {
    // Error saving data
    console.log("this is setUserInfo error", error);
  }
};

export default setUserInfo;
