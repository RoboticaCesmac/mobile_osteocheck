import { PropsWithChildren } from "react";
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import Colors from "@/constants/colors";

const sizes = {
  small: 30,
  medium: 40,
  big: 65,
}

interface ButtonComponentProps extends PropsWithChildren {
  style?: StyleProp<ViewStyle>
  onPress?: () => void
  size?: 'small' | 'medium' | 'big',
  disabled?: boolean,
  loading?: boolean,
}

export default function ButtonComponent({ children, style, onPress, size, disabled, loading }: ButtonComponentProps) {
  return (
    <TouchableOpacity
      disabled={disabled || loading}
      onPress={onPress}
    >
      <View style={[style, buttonStyles.styles, size ? { height: sizes[size], justifyContent: 'center' } : { justifyContent: 'center' }]}>
        {loading ? <ActivityIndicator color={Colors.mainWhite} /> : children}
      </View>
    </TouchableOpacity>
  );
}

const buttonStyles = StyleSheet.create({
  styles: {
    borderWidth: 1,
    alignItems: 'center',
    borderRadius: 40,
    height: 50,
  },
});
