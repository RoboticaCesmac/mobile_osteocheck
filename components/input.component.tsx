import Colors from "@/constants/colors";
import TextSize from "@/constants/textSize";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, TextInput, TextInputProps, TouchableOpacity, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import AppText from "./appText.component";

export interface InputComponentProps extends TextInputProps {
  errorText?: string[];
  isLoading?: boolean;
  suffix?: string;
  isPassword?: boolean;
}

export default function InputComponent(props: InputComponentProps) {
  const { suffix, isPassword, secureTextEntry, ...restProps } = props;
  const [showPassword, setShowPassword] = useState(false);

  const getErrorText = () => {
    const formatedText = props.errorText?.join("\n");
    if (!formatedText) {
      return "";
    }
    return formatedText;
  };

  const isSecure = isPassword ? !showPassword : secureTextEntry;

  return (
    <View>
      <View style={textInputStyles.inputContainer}>
        <TextInput
          autoCapitalize="none"
          style={[
            textInputStyles.styles,
            props.isLoading ? { paddingVertical: 3 } : {},
            suffix || isPassword ? { paddingRight: 50, } : {},
          ]}
          secureTextEntry={isSecure}
          {...restProps}
          value={props.isLoading ? "" : props.value}
          placeholder={props.isLoading ? "" : props.placeholder}
        />
        {suffix && !isPassword && (
          <View style={textInputStyles.suffixWrapper}>
            <View style={textInputStyles.suffixContent}>
              <AppText
                content={suffix}
                textProps={{
                  style: {
                    fontSize: 12,
                    color: Colors.mainWhite
                  }
                }}
              />
            </View>
          </View>
        )}
        {isPassword && (
          <View style={textInputStyles.suffixWrapper}>
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{ padding: 5 }}>
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={20}
                color={Colors.mainBlack}
              />
            </TouchableOpacity>
          </View>
        )}
        {props.isLoading ? (
          <ActivityIndicator
            style={textInputStyles.inputLoading}
            color={Colors.darkerGray}
          />
        ) : null}
      </View>
      <AppText
        content={getErrorText()}
        textProps={{
          style:
            props.errorText?.length! > 0
              ? textInputStyles.errorText
              : { display: "none" },
        }}
      />
    </View>
  );
}

const textInputStyles = StyleSheet.create({
  inputContainer: {
    position: "relative",
  },
  styles: {
    fontSize: TextSize.small,
    padding: 20,
    borderWidth: 1.5,
    paddingVertical: 10,
    lineHeight: 30,
    borderRadius: 12,
    color: Colors.mainBlack,
    borderColor: Colors.mainBlack,

  },
  suffixWrapper: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 14,
  },
  suffixContent: {
    backgroundColor: Colors.mainBlack,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: Colors.mainBlack,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  errorText: {
    color: Colors.errorRed,
    fontSize: TextSize.small,
    marginLeft: 5,
  },
  inputLoading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 10,
  },
});