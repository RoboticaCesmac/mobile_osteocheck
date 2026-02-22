import Container from "@/components/container.component";
import colors from "@/constants/colors";
import textSize from "@/constants/textSize";
import { Image, StyleSheet, View } from "react-native";
import osteocheckLogo from "@/assets/images/osteocheck-logo.png";
import AppText from "@/components/appText.component";
import ButtonComponent from "@/components/button.component";
import OTPTextInputComponent from "@/components/otpTextInput.component";

export default function RegisterConfirmationCodeScreen() {
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

        
        <OTPTextInputComponent/>

        <ButtonComponent
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
