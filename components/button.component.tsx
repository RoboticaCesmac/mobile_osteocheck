import { PropsWithChildren } from "react";
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";

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
}

export default function ButtonComponent({ children, style, onPress, size, disabled }: ButtonComponentProps) {

  return (
    <TouchableOpacity
      disabled={disabled ?? false}
      onPress={onPress}
    >
      <View style={[style, buttonStyles.styles, size ? { height: sizes[size] } : null ]}>{children}</View>
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
