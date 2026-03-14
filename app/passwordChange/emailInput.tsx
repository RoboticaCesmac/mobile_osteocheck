import AppText from "@/components/appText.component";
import ButtonComponent from "@/components/button.component";
import Container from "@/components/container.component";
import InputComponent from "@/components/input.component";
import colors from "@/constants/colors";
import { defaultFormStyle } from "@/constants/formStyle";
import textSize from "@/constants/textSize";
import { StyleSheet, View, Image } from "react-native";
import osteocheckLogo from "@/assets/images/osteocheck-logo.png";
import { useFocusEffect, useRouter } from "expo-router";
import { useState, useContext, useCallback } from "react";
import professionalApi from "@/services/professional";
import AntDesign from "@expo/vector-icons/AntDesign";
import { AppContext } from "@/context/appContext";
import { NotificationType } from "@/components/notification.component";

export default function PasswordChangeEmailInputScreen() {
  const router = useRouter();
  const appContext = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      appContext.handleShowHeaderComponent(false);
    }, []),
  );

  const onHandleSendCode = async () => {
    if (!email) {
      appContext.handleSetNotification(NotificationType.Error, "Por favor, insira seu e-mail.");
      return;
    }

    try {
      setIsLoading(true);
      const a = await professionalApi.sendForgotPasswordToken(email);
      console.log(a)
      router.push({ pathname: "/passwordChange/codeInput", params: { email } });
    } catch (error: any) {
      appContext.handleSetNotification(NotificationType.Error, error?.response?.data?.error || "Erro ao enviar código.");
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
              fontWeight: "bold",
            },
          }}
          content="Alterar senha"
        />

        <AppText
          textProps={{
            style: {
              fontSize: textSize.big,
              color: colors.mainWhite,
              marginTop: 20,
            },
          }}
          content="Confirme seu e-mail"
        />

        <AppText
          textProps={{
            style: {
              fontSize: textSize.regular,
              color: colors.mainWhite,
              marginTop: 40,
            },
          }}
          content="Digite o seu e-mail e enviaremos o código para você alterar sua senha."
        />

        <View style={styles.form}>
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
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <ButtonComponent
            style={{
              borderColor: colors.mainWhite,
            }}
            onPress={onHandleSendCode}
            disabled={isLoading}
          >
            <AppText
              textProps={{ style: { margin: "auto", color: colors.mainWhite } }}
              content={isLoading ? "Enviando..." : "Enviar"}
            />
          </ButtonComponent>
        </View>
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
  form: {
    ...defaultFormStyle,
    marginTop: 40,
  },
});
