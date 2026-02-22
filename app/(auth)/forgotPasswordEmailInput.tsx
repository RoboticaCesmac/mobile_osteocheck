import AppText from "@/components/appText.component";
import ButtonComponent from "@/components/button.component";
import Container from "@/components/container.component";
import InputComponent from "@/components/input.component";
import colors from "@/constants/colors";
import { defaultFormStyle } from "@/constants/formStyle";
import textSize from "@/constants/textSize";
import { StyleSheet, View, Image } from "react-native";
import osteocheckLogo from "@/assets/images/osteocheck-logo.png";
import { useRouter } from "expo-router";

export default function ForgotPasswordEmailInputScreen() {
  const router = useRouter();

  const onHandleGoToCreateNewPassword = () => {
    router.push("/(auth)/createNewpassword");
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
              style={{ backgroundColor: colors.mainWhite, borderRadius: 10 }}
              placeholder="exemplo@hotmail.com"
            />
          </View>

          <ButtonComponent
            style={{
              borderColor: colors.mainWhite,
            }}
            onPress={onHandleGoToCreateNewPassword}
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
