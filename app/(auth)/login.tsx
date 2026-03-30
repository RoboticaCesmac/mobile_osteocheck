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
import { useFocusEffect, useRouter } from "expo-router";
import AuthAPI from "@/services/auth";
import { useCallback, useContext, useState } from "react";
import { storeData } from "@/utils/asyncStorage";
import { AppContext } from "@/context/appContext";
import { NotificationType } from "@/components/notification.component";
import { UserContext } from "@/context/userContext";

export default function LoginScreen() {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [emailError, setEmailError] = useState<string[]>();
  const [passwordError, setPasswordError] = useState<string[]>();
  const [loading, setLoading] = useState<boolean>(false);

  const appContext = useContext(AppContext);
  const userContext = useContext(UserContext);
  const router = useRouter();

  useFocusEffect(useCallback(() => {
    verifyProfile();
  }, []));

  const onHandleGoToForgotPasswordScreen = () => {
    router.push('/(auth)/forgotPasswordEmailInput');
  }

  const onHandleGoToMainHomeScreen = () => {
    router.replace('/(main)/home');
  }

  async function verifyProfile() {
    const user = await AuthAPI.profile();
    userContext.handleSetUser(user.data);
    onHandleGoToMainHomeScreen();
  }

  const onHandleLogin = async () => {
    try {
      setLoading(true);
      const auth = await AuthAPI.login({
        email: email!,
        password: password!,
      });
      storeData("userJWT", auth.data.jwt);
      appContext.handleSetNotification(NotificationType.Success, "Login realizado com sucesso");
      await verifyProfile();
    } catch (error: any) {
      if (!error?.response?.data?.errors) {
        appContext.handleSetNotification(NotificationType.Error, error?.response?.data?.message ?? 'Credenciais não encontradas');
      }
      setEmailError(error?.response?.data?.errors?.email);
      setPasswordError(error?.response?.data?.errors?.password);
    } finally {
      setLoading(false);
    }
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
              value={email}
              onChangeText={setEmail}
              errorText={emailError}
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
              isPassword
              value={password}
              onChangeText={setPassword}
              errorText={passwordError}
            />
          </View>

          <TouchableOpacity onPress={onHandleGoToForgotPasswordScreen} style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
            <AntDesign name="exclamation-circle" color={colors.opaqueYellow} />
            <AppText
              content="Esqueci minha senha"
              textProps={{
                style: { color: colors.mainWhite }
              }}
            />
          </TouchableOpacity>

          <ButtonComponent
            loading={loading}
            style={{
              borderColor: colors.mainWhite,
              marginTop: 15,
            }}
            onPress={onHandleLogin}
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
