import { Alert } from "react-native";

const AlertFunction = ({
  navigation,
  optionOneText,
  optionOneNavigatefetchForAllUserAndAllStatusData,
  optionTwoText,
  optionTwoNavigatefetchForAllUserAndAllStatusData,
}) => {
  Alert.alert(
    "Discard changes?",
    "You have unsaved changes. Are you sure to discard them and leave the screen?",
    [
      {
        text: optionOneText,
        style: "cancel",
        onPress: () => {
          navigation.navigate(optionOneNavigatefetchForAllUserAndAllStatusData);
        },
      },
      {
        text: "Discard",
        style: "destructive",
        // If the user confirmed, then we dispatch the action we blocked earlier
        // This will continue the action that had triggered the removal of the screen
        onPress: () => navigation.dispatch(e.data.action),
      },
    ]
  );
};

export default AlertFunction;
