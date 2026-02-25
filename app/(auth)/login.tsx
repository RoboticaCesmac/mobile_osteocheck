import Container from "@/components/container.component";
import colors from "@/constants/colors";
import { defaultFormStyle } from "@/constants/formStyle";
import textSize from "@/constants/textSize";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import osteocheckLogo from "@/assets/images/osteocheck-logo.png";
import InputComponent from "@/components/input.component";
import AppText from "@/components/appText.component";
import ButtonComponent from "@/components/button.component";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const router = useRouter();

  const onHandleGoToForgotPasswordScreen = () => {
    router.push('/(auth)/forgotPasswordEmailInput');
  }
  const onHandleGoToMainHomeScreen = () => {
    router.push('/(main)/home');
  }

  return (
    <Container>
      <Image
        source={osteocheckLogo}
        style={{
          width: 170,
          height: 60,
          margin: "auto",
        }}
      />
      <View style={loginScreenStyles.infoContainer}>
        <AppText
          textProps={{
            style: {
              color: colors.mainWhite,
              textAlign: "right",
              fontSize: textSize.big,
              fontWeight: "bold",
            },
          }}
          content="Login"
        />

        <View style={loginScreenStyles.loginForm}>
          <View>
            <AppText
              content="Email"
              textProps={{
                style: { color: colors.mainWhite, marginBottom: 4 },
              }}
            />
            <InputComponent
              style={{ backgroundColor: colors.mainWhite, borderRadius: 10 }}
              placeholder="exemplo@hotmail.com"
            />
          </View>
          <View>
            <AppText
              content="Senha"
              textProps={{
                style: { color: colors.mainWhite, marginBottom: 4 },
              }}
            />
            <InputComponent
              style={{ backgroundColor: colors.mainWhite, borderRadius: 10 }}
              placeholder="Senha"
            />
          </View>

          <TouchableOpacity onPress={onHandleGoToForgotPasswordScreen}  style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
            <AntDesign name="exclamation-circle" color={colors.opaqueYellow} />
            <AppText
              content="Esqueci minha senha"
              textProps={{
                style: { color: colors.mainWhite }
              }}
            />
          </TouchableOpacity>

          <ButtonComponent
            style={{
              borderColor: colors.mainWhite,
              marginTop: 15,
            }}
            onPress={onHandleGoToMainHomeScreen}
          >
            <AppText
              textProps={{
                style: { margin: "auto", color: colors.mainWhite },
              }}
              content="Logar"
            />
          </ButtonComponent>
        </View>
      </View>
    </Container>
  );
}

const loginScreenStyles = StyleSheet.create({
  loginForm: {
    ...defaultFormStyle,
    marginTop: 40,
  },
  whiteText: {
    color: colors.mainWhite,
  },
  infoContainer: {
    backgroundColor: colors.darkBlue,
    padding: 30,
    paddingBottom: 80,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  submitButtonText: {
    fontSize: textSize.regular,
    color: colors.mainWhite,
  },
  signupText: {
    fontSize: textSize.small,
  },
  signupTextDecoration: {
    textDecorationLine: "underline",
  },
});
