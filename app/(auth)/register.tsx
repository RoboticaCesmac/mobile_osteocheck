import Container from "@/components/container.component";
import colors from "@/constants/colors";
import { defaultFormStyle } from "@/constants/formStyle";
import textSize from "@/constants/textSize";
import { Image, StyleSheet, View } from "react-native";
import osteocheckLogo from "@/assets/images/osteocheck-logo.png";
import InputComponent from "@/components/input.component";
import AppText from "@/components/appText.component";
import ButtonComponent from "@/components/button.component";
import BadgeComponent from "@/components/badge.component";
import { useRouter } from "expo-router";

const registerFieldsInfos = [
  "Mínimo de 8 caracteres",
  "Uma letra maiúscula",
  "Uma letra miúscula",
  "Um número",
  "Um caracter especial (@, #, %, &, $)",
];

export default function RegisterScreen() {
  const router = useRouter();

  const onHandleGoToConfirmationCode = () => {
    router.push('/(auth)/registerConfirmationCode');
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
      <View style={registerScreenStyles.infoContainer}>
        <AppText
          textProps={{
            style: {
              color: colors.mainWhite,
              textAlign: "right",
              fontSize: textSize.big,
              fontWeight: "bold",
            },
          }}
          content="Cadastro"
        />

        <View style={registerScreenStyles.loginForm}>
          <View>
            <AppText
              content="Nome Completo"
              textProps={{
                style: { color: colors.mainWhite, marginBottom: 4 },
              }}
            />
            <InputComponent
              style={{ backgroundColor: colors.mainWhite, borderRadius: 10 }}
              placeholder="Nome completo"
            />
          </View>
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
          <View>
            <AppText
              content="Confirmação de senha"
              textProps={{
                style: { color: colors.mainWhite, marginBottom: 4 },
              }}
            />
            <InputComponent
              style={{ backgroundColor: colors.mainWhite, borderRadius: 10 }}
              placeholder="Confirmação de senha"
            />
          </View>

          <View>
            {registerFieldsInfos.map((info, index) => (
              <View key={index} style={registerScreenStyles.infoBadgeContainer}>
                <BadgeComponent
                  style={registerScreenStyles.infoBadgeComponent}
                  size={10}
                />
                <AppText
                  textProps={{ style: registerScreenStyles.whiteText }}
                  content={info}
                />
              </View>
            ))}
          </View>

          <ButtonComponent
            style={{
              borderColor: colors.mainWhite,
              marginTop: 15,
            }}
            onPress={onHandleGoToConfirmationCode}
          >
            <AppText
              textProps={{
                style: { margin: "auto", color: colors.mainWhite },
              }}
              content="Criar Conta"
            />
          </ButtonComponent>
        </View>
      </View>
    </Container>
  );
}

const registerScreenStyles = StyleSheet.create({
  loginForm: {
    ...defaultFormStyle,
    marginTop: 40,
  },
  whiteText: {
    color: colors.mainWhite,
  },
  infoBadgeContainer: {
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  infoBadgeComponent: {
    backgroundColor: colors.successBlue,
    marginBlock: "auto",
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
