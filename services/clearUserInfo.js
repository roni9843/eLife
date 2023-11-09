import AsyncStorage from "@react-native-async-storage/async-storage";

const clearUserInfo = async () => {
  try {
    await AsyncStorage.clear();
    return true;
  } catch (error) {
    console.error("Error clearing AsyncStorage:", error);
  }
};

export default clearUserInfo;
