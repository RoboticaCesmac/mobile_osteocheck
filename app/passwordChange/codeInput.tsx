import Container from "@/components/container.component";
import colors from "@/constants/colors";
import textSize from "@/constants/textSize";
import { Image, StyleSheet, View } from "react-native";
import osteocheckLogo from "@/assets/images/osteocheck-logo.png";
import AppText from "@/components/appText.component";
import ButtonComponent from "@/components/button.component";
import OTPTextInputComponent from "@/components/otpTextInput.component";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState, useContext } from "react";
import professionalApi from "@/services/professional";
import AntDesign from "@expo/vector-icons/AntDesign";
import { AppContext } from "@/context/appContext";
import { NotificationType } from "@/components/notification.component";

export default function PasswordChangeCodeInputScreen() {
  const router = useRouter();
  const appContext = useContext(AppContext);
  const { email } = useLocalSearchParams<{ email: string }>();
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onHandleConfirmCode = async () => {
    if (!code || code.length < 5) {
      appContext.handleSetNotification(NotificationType.Error, "Por favor, insira o código completo.");
      return;
    }

    try {
      setIsLoading(true);
      await professionalApi.confirmForgotPasswordToken({ email, forgotPasswordToken: code });
      router.push({ pathname: "/passwordChange/newPassword", params: { email } });
    } catch (error: any) {
      appContext.handleSetNotification(NotificationType.Error, error?.response?.data?.message || "Código inválido ou expirado.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Container>
      <View style={{ position: "absolute", top: 50, left: 20, zIndex: 10 }}>
        <AntDesign name="left" size={30} color={colors.mainWhite} onPress={() => router.back()} />
      </View>
      <Image
        source={osteocheckLogo}
        style={{
          width: 170,
          height: 60,
          margin: "auto",
        }}
      />
      <View style={styles.infoContainer}>
        <AppText
          textProps={{
            style: {
              color: colors.mainWhite,
              textAlign: "right",
              fontSize: textSize.big,
              fontWeight: 'bold'
            },
          }}
          content="Alterar senha"
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
          content="Enviamos um e-mail com um código de 5 caracteres. Digite o código abaixo."
        />

        <OTPTextInputComponent onChangeText={setCode} />

        <ButtonComponent
          style={{
            borderColor: colors.mainWhite,
            marginTop: 15,
          }}
          onPress={onHandleConfirmCode}
          disabled={isLoading}
        >
          <AppText
            textProps={{
              style: { margin: "auto", color: colors.mainWhite },
            }}
            content={isLoading ? "Verificando..." : "Confirmar Código"}
          />
        </ButtonComponent>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  infoContainer: {
    backgroundColor: colors.darkBlue,
    padding: 30,
    paddingBottom: 80,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
});
