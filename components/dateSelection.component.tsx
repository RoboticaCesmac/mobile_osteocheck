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

interface DateSelectionProps {
    date: Date;
    setDate: React.Dispatch<React.SetStateAction<Date>>;
    placeholder?: string;
    errorMessage?: string;
}

export default function DateSelectionComponent({
    date,
    setDate,
    placeholder = "Dia/ Mês / Ano",
    errorMessage,
}: DateSelectionProps) {
    const [showPicker, setShowPicker] = useState(false);

    const handleDateChange = (_: any, selectedDate: any) => {
        if (Platform.OS === "android") {
            setShowPicker(false);
        }
        if (selectedDate) {
            if (selectedDate <= new Date()) {
                setDate(selectedDate);
            } else {
                alert("A data de nascimento não pode estar no futuro.");
            }
        }
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    const handlePress = () => {
        setShowPicker(true);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handlePress} style={[styles.button, errorMessage ? styles.errorBorder : {}]}>
                <AppText
                    content={date.getTime() === new Date(0).getTime() || isNaN(date.getTime()) ? placeholder : formatDate(date)}
                    textProps={{
                        style: [styles.dateText, (date.getTime() === new Date(0).getTime() || isNaN(date.getTime())) ? styles.placeholderText : {}],
                    }}
                />
            </TouchableOpacity>

            {errorMessage ? (
                <AppText
                    content={errorMessage}
                    textProps={{
                        style: styles.errorText,
                    }}
                />
            ) : null}

            {showPicker && (
                <DateTimePicker
                    value={date.getTime() === new Date(0).getTime() || isNaN(date.getTime()) ? new Date() : date}
                    mode="date"
                    display={Platform.OS === "ios" ? "spinner" : "default"}
                    onChange={handleDateChange}
                    maximumDate={new Date()}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    button: {
        borderWidth: 1.5,
        borderColor: "#000",
        borderRadius: 12,
        minHeight: 50,
        paddingHorizontal: 20,
        justifyContent: "center",
    },
    dateText: {
        fontSize: textSize.small,
        color: "#000",
    },
    placeholderText: {
        color: "#a9a9a9", // Assuming a greyish color for the placeholder
    },
    errorBorder: {
        borderColor: "red",
    },
    errorText: {
        color: "red",
        fontSize: textSize.verySmall,
        marginTop: 5,
        marginLeft: 5,
    },
});
