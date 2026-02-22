import Container from "@/components/container.component";
import { Image, StyleSheet, View } from "react-native";
import osteocheckLogo from "@/assets/images/osteocheck-logo.png";
import colors from "@/constants/colors";
import { defaultFormStyle } from "@/constants/formStyle";
import AppText from "@/components/appText.component";
import textSize from "@/constants/textSize";
import InputComponent from "@/components/input.component";
import ButtonComponent from "@/components/button.component";
import { useRouter } from "expo-router";
import BadgeComponent from "@/components/badge.component";

export default function CreateNewPasswordScreen() {
  const router = useRouter();

  const onHandleCancelNewPasswordRegistration = () => {
    router.dismissTo("/(auth)/home");
  };

  const registerFieldsInfos = [
    "Mínimo de 8 caracteres",
    "Uma letra maiúscula",
    "Uma letra miúscula",
    "Um número",
    "Um caracter especial (@, #, %, &, $)",
  ];

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

      <View style={createNewPasswordStyles.infoContainer}>
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
          content="Criar nova senha"
        />

        <AppText
          textProps={{
            style: {
              fontSize: textSize.regular,
              marginTop: 20,
              color: colors.mainWhite,
            },
          }}
          content="Crie uma senha forte para manter sua conta protegida. Depois é só confirmar e voltar ao treino."
        />

        <View style={createNewPasswordStyles.loginForm}>
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
              content="Confirmar senha"
              textProps={{
                style: { color: colors.mainWhite, marginBottom: 4 },
              }}
            />
            <InputComponent
              style={{ backgroundColor: colors.mainWhite, borderRadius: 10 }}
              placeholder="Confirmar senha"
            />
          </View>

          <View>
            {registerFieldsInfos.map((info, index) => (
              <View
                key={index}
                style={createNewPasswordStyles.infoBadgeContainer}
              >
                <BadgeComponent
                  style={createNewPasswordStyles.infoBadgeComponent}
                  size={10}
                />
                <AppText
                  textProps={{ style: createNewPasswordStyles.whiteText }}
                  content={info}
                />
              </View>
            ))}
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <ButtonComponent
              style={{
                borderColor: colors.mainWhite,
                marginTop: 15,
                width: 130,
                borderBlockColor: colors.opaqueYellow,
                borderLeftColor: colors.opaqueYellow,
                borderRightColor: colors.opaqueYellow,
              }}
              onPress={onHandleCancelNewPasswordRegistration}
            >
              <AppText
                textProps={{
                  style: { margin: "auto", color: colors.opaqueYellow },
                }}
                content="Cancelar"
              />
            </ButtonComponent>
            <ButtonComponent
              style={{
                borderColor: colors.mainWhite,
                marginTop: 15,
                width: 130,
              }}
            >
              <AppText
                textProps={{
                  style: { margin: "auto", color: colors.mainWhite },
                }}
                content="Salvar"
              />
            </ButtonComponent>
          </View>
        </View>
      </View>
    </Container>
  );
}

const createNewPasswordStyles = StyleSheet.create({
  infoContainer: {
    backgroundColor: colors.darkBlue,
    padding: 30,
    paddingBottom: 80,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
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
  loginForm: {
    ...defaultFormStyle,
    marginTop: 40,
  },
});
