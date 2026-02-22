import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

export const showTimePicker = (setSelectedTime: any) => {
  return DateTimePickerAndroid.open({
    mode: "time",
    value: new Date(), // Set initial time
    onChange: (event, selectedTime) => {
      setSelectedTime(selectedTime);
    },
  });
};
