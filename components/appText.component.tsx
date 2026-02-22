import TextSize, { TextSizeEnum } from "@/constants/textSize";
import { PropsWithChildren } from "react";
import { Text, TextProps } from "react-native";

interface AppTextProps extends PropsWithChildren {
  textProps?: TextProps,
  content: string | any,
  size?: TextSizeEnum
}

export default function AppText({ textProps, content, size }: AppTextProps) {
  return(
    <Text
      style={[{ fontSize: size ?? TextSize.regular }, textProps?.style]}
    >
      { content }
    </Text>
  )
}