import Container from "@/components/container.component";
import colors from "@/constants/colors";
import textSize from "@/constants/textSize";
import { Image, StyleSheet, View } from "react-native";
import osteocheckLogo from "@/assets/images/osteocheck-logo.png";
import AppText from "@/components/appText.component";
import ButtonComponent from "@/components/button.component";
import OTPTextInputComponent from "@/components/otpTextInput.component";
import { useLocalSearchParams, useRouter } from "expo-router";
import AuthAPI from "@/services/auth";
import { useContext, useState } from "react";
import { AppContext } from "@/context/appContext";
import { NotificationType } from "@/components/notification.component";

export default function RegisterConfirmationCodeScreen() {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email: string }>();
  const appContext = useContext(AppContext);

  const [code, setCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const onHandleConfirmCode = async () => {
    if (!code || code.length !== 5) {
      appContext.handleSetNotification(NotificationType.Error, "Por favor, insira um código válido de 5 dígitos.");
      return;
    }

    try {
      setLoading(true);
      await AuthAPI.confirmSignupToken({
        professionalEmail: email,
        signupToken: code,
      });


      appContext.handleSetNotification(NotificationType.Success, "Conta ativada com sucesso");
      router.replace('/(auth)/login');
    } catch (error: any) {
      if (!error?.response?.data?.errors) {
        appContext.handleSetNotification(NotificationType.Error, error?.response?.data?.message ?? "Erro ao confirmar código");
      }
    } finally {
      setLoading(false);
    }
  };

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
      <View style={registerConfirmationCodeScreen.infoContainer}>
        <AppText
          textProps={{
            style: {
              color: colors.mainWhite,
              textAlign: "right",
              fontSize: textSize.big,
              fontWeight: 'bold'
            },
          }}
          content="Autenticação"
        />

        <AppText
          textProps={{
            style: { fontSize: textSize.big, color: colors.mainWhite, marginTop: 20 }
          }}
          content="Você recebeu um email!"
        />

        <AppText
          textProps={{
            style: { fontSize: textSize.regular, marginTop: 40, marginBottom: 20, color: colors.mainWhite }
          }}
          content="Enviamos um e-mail com um código de 5 caracteres. Para ativar sua conta, digite o código abaixo."
        />

        <OTPTextInputComponent onChangeText={setCode} />

        <ButtonComponent
          loading={loading}
          onPress={onHandleConfirmCode}
          style={{
            borderColor: colors.mainWhite,
            marginTop: 15,
          }}
        >
          <AppText
            textProps={{
              style: { margin: "auto", color: colors.mainWhite },
            }}
            content="Confirmar Código"
          />
        </ButtonComponent>
      </View>
    </Container>
  );
}

const registerConfirmationCodeScreen = StyleSheet.create({
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
});
