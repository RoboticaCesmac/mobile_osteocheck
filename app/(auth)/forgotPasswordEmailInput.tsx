import osteocheckLogo from "@/assets/images/osteocheck-logo.png";
import AppText from "@/components/appText.component";
import ButtonComponent from "@/components/button.component";
import Container from "@/components/container.component";
import InputComponent from "@/components/input.component";
import { NotificationType } from "@/components/notification.component";
import colors from "@/constants/colors";
import { defaultFormStyle } from "@/constants/formStyle";
import textSize from "@/constants/textSize";
import { AppContext } from "@/context/appContext";
import professional from "@/services/professional";
import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import { Image, StyleSheet, View } from "react-native";

export default function ForgotPasswordEmailInputScreen() {
  const [email, setEmail] = useState<string>();
  const [emailInputError, setEmailInputError] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();
  const appContext = useContext(AppContext);



  const onHandleSendForgotPasswordToken = async () => {
    if (!email) {
      appContext.handleSetNotification(NotificationType.Warning, 'É preciso inserir o e-mail para enviar o código de confirmação para mudar a senha.');
      return;
    }
    try {
      setIsLoading(true);
      await professional.sendForgotPasswordToken(email);
      router.push({
        pathname: "/(auth)/forgotPasswordConfirmationCode",
        params: { email }
      });
    } catch (err: any) {
      setEmailInputError(err?.response?.data?.errors?.professionalEmail);
    } finally {
      setIsLoading(false);
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
      <View style={forgotPasswordEmailInputStyles.infoContainer}>
        <AppText
          textProps={{
            style: {
              color: colors.mainWhite,
              textAlign: "right",
              fontSize: textSize.big,
              fontWeight: "bold",
            },
          }}
          content="Esqueci a senha"
        />

        <AppText
          textProps={{
            style: {
              fontSize: textSize.big,
              color: colors.mainWhite,
              marginTop: 20,
            },
          }}
          content="Esqueceu a senha?"
        />

        <AppText
          textProps={{
            style: {
              fontSize: textSize.regular,
              color: colors.mainWhite,
              marginTop: 40,
            },
          }}
          content="Digite o e-mail cadastrado e enviaremos o link para você criar uma nova senha."
        />

        <View style={forgotPasswordEmailInputStyles.loginForm}>
          <View>
            <AppText
              content="Email"
              textProps={{
                style: { color: colors.mainWhite, marginBottom: 4 },
              }}
            />
            <InputComponent
              placeholderTextColor={"#bbb"}
              style={{color: "rgb(0, 0, 0)", backgroundColor: colors.mainWhite, borderRadius: 10 }}
              placeholder="exemplo@hotmail.com"
              errorText={emailInputError}
              onChangeText={setEmail}
            />
          </View>

          <ButtonComponent
            style={{
              borderColor: colors.mainWhite,
            }}
            loading={isLoading}
            onPress={onHandleSendForgotPasswordToken}
          >
            <AppText
              textProps={{ style: { margin: "auto", color: colors.mainWhite } }}
              content={"Enviar"}
            />
          </ButtonComponent>
        </View>
      </View>
    </Container>
  );
}

const forgotPasswordEmailInputStyles = StyleSheet.create({
  infoContainer: {
    backgroundColor: colors.darkBlue,
    padding: 30,
    paddingBottom: 80,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  loginForm: {
    ...defaultFormStyle,
    marginTop: 40,
  },
});
