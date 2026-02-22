import colors from "@/constants/colors";
import OTPTextInput from 'react-native-otp-textinput';

interface OTPTextInputComponentProps {
  inputCount?: number;
  tintColor?: string;
  offTintColor?: string;
  textColor?: string;
}

export default function OTPTextInputComponent({ textColor, inputCount, offTintColor, tintColor }: OTPTextInputComponentProps) {
  return (
    <OTPTextInput
      inputCount={inputCount ?? 5}
      tintColor={ tintColor ?? colors.mainWhite}
      offTintColor={offTintColor ?? colors.mainWhite}
      textInputStyle={{
        borderWidth: 1,
        borderRadius: 10,
        borderBottomWidth: 1,
        color: textColor ?? 'white'
      } as any }
      handleTextChange={(code) => console.log(code)}
    />
  );
}
