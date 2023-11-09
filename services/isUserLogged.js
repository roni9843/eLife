import AsyncStorage from "@react-native-async-storage/async-storage";

const isUserLogged = async () => {
  try {
    const value = await AsyncStorage.getItem("eLifeStore");

    const myObject = JSON.parse(value);

    if (myObject !== null) {
      return myObject;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error retrieving data:", error);
    return null;
  }
};

export default isUserLogged;
