import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import AppText from "./appText.component";
import textSize from "@/constants/textSize";

interface DateRangePickerProps {
  initialDate: Date;
  setInitialDate: React.Dispatch<React.SetStateAction<Date>>;
  endDate: Date;
  setEndDate: React.Dispatch<React.SetStateAction<Date>>;
}

export default function DateRangePicker({
  endDate,
  initialDate,
  setEndDate,
  setInitialDate
}: DateRangePickerProps) {
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);

  const handleStartDateChange = (_: any, selectedDate: any) => {
    if (Platform.OS === "android") {
      setShowStartPicker(false);
      setActiveField(null);
    }
    if (selectedDate) {
      if (selectedDate <= endDate) {
        setInitialDate(selectedDate);
      } else {
        alert("Start date cannot be after end date");
      }
    }
  };

  const handleEndDateChange = (_: any, selectedDate: any) => {
    if (Platform.OS === "android") {
      setShowEndPicker(false);
      setActiveField(null);
    }
    if (selectedDate) {
      if (selectedDate >= initialDate) {
        setEndDate(selectedDate);
      } else {
        alert("End date cannot be before start date");
      }
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleStartPress = () => {
    setActiveField("start");
    setShowStartPicker(true);
  };

  const handleEndPress = () => {
    setActiveField("end");
    setShowEndPicker(true);
  };

  const handleCalendarPress = () => {
    setActiveField("start");
    setShowStartPicker(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity style={styles.dateRangeButton}>

          <TouchableOpacity onPress={handleStartPress}>
            <AppText
              content={formatDate(initialDate)}
              textProps={{
                style: styles.dateText,
              }}
            />
          </TouchableOpacity>

          <View style={styles.separator}>
            <Text style={styles.arrow}>→</Text>
          </View>

          <TouchableOpacity onPress={handleEndPress}>
            <AppText
              content={formatDate(endDate)}
              textProps={{
                style: styles.dateText,
              }}
            />
          </TouchableOpacity>
        </TouchableOpacity>

        {/* Start Date Picker */}
        {showStartPicker && (
          <DateTimePicker
            value={initialDate}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={handleStartDateChange}
            maximumDate={endDate}
          />
        )}

        {/* End Date Picker */}
        {showEndPicker && (
          <DateTimePicker
            value={endDate}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={handleEndDateChange}
            minimumDate={initialDate}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  content: {
    alignItems: "center",
  },
  dateRangeButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-around',
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 16,
    minHeight: 40,
    paddingHorizontal: 20,
  },
  dateText: {
    fontSize: textSize.small,
    color: "#000",
    textAlign: "center",
  },
  separator: {
    marginHorizontal: 12,
    paddingHorizontal: 8,
  },
  arrow: {
    fontSize: 16,
    color: "#000",
    fontWeight: "600",
  },
});
