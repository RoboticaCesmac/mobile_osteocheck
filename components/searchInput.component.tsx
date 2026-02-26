import colors from "@/constants/colors";
import textSize from "@/constants/textSize";
import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

interface SearchInputProps {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
}

export default function SearchInputComponent({
    value,
    onChangeText,
    placeholder = "Buscar paciente...",
}: SearchInputProps) {
    return (
        <View style={styles.container}>
            <AntDesign name="search" size={18} color={colors.mainGray} />
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor={colors.mainGray}
                value={value}
                onChangeText={onChangeText}
                autoCapitalize="words"
            />
            {value.length > 0 && (
                <TouchableOpacity onPress={() => onChangeText("")}>
                    <AntDesign name="close-circle" size={16} color={colors.mainGray} />
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.mainWhite,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.opaqueBlue,
        paddingHorizontal: 14,
        paddingVertical: 10,
        gap: 10,
    },
    input: {
        flex: 1,
        fontSize: textSize.small,
        color: colors.mainBlack,
        paddingVertical: 0,
    },
});
