import Container from "@/components/container.component";
import { Image, StyleSheet, View } from "react-native";
import { useState, useContext } from "react";
import osteocheckLogo from "@/assets/images/osteocheck-logo.png";
import colors from "@/constants/colors";
import { defaultFormStyle } from "@/constants/formStyle";
import AppText from "@/components/appText.component";
import textSize from "@/constants/textSize";
import InputComponent from "@/components/input.component";
import ButtonComponent from "@/components/button.component";
import { useRouter, useLocalSearchParams } from "expo-router";
import BadgeComponent from "@/components/badge.component";
import { AppContext } from "@/context/appContext";
import { NotificationType } from "@/components/notification.component";
import professional from "@/services/professional";

export default function CreateNewPasswordScreen() {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email: string }>();
  const appContext = useContext(AppContext);

  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const onHandleCancelNewPasswordRegistration = () => {
    router.dismissTo("/(auth)/home");
  };

  const registerFieldsInfos = [
    { text: "Mínimo de 8 caracteres", met: password.length >= 8 },
    { text: "Uma letra maiúscula", met: /[A-Z]/.test(password) },
    { text: "Uma letra minúscula", met: /[a-z]/.test(password) },
    { text: "Um número", met: /[0-9]/.test(password) },
    { text: "Um caracter especial (@, #, %, &, $)", met: /[^A-Za-z0-9]/.test(password) },
  ];

  const onHandleSaveNewPassword = async () => {
    const allRequirementsMet = registerFieldsInfos.every((info) => info.met);

    if (!allRequirementsMet) {
      appContext.handleSetNotification(NotificationType.Warning, "A senha não atende a todos os requisitos.");
      return;
    }

    if (password !== confirmPassword) {
      appContext.handleSetNotification(NotificationType.Warning, "As senhas não coincidem.");
      return;
    }

    try {
      setLoading(true);
      await professional.changePassword({ email, password });
      appContext.handleSetNotification(NotificationType.Success, "Senha redefinida com sucesso.");
      router.replace("/(auth)/login");
    } catch (error: any) {
      appContext.handleSetNotification(NotificationType.Error, error?.response?.data?.message ?? "Erro ao redefinir a senha.");
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
              isPassword
              value={password}
              onChangeText={setPassword}
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
              isPassword
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>

          <View>
            {registerFieldsInfos.map((info, index) => (
              <View
                key={index}
                style={createNewPasswordStyles.infoBadgeContainer}
              >
                <BadgeComponent
                  style={[
                    createNewPasswordStyles.infoBadgeComponent,
                    { backgroundColor: info.met ? colors.successBlue : colors.mainGray }
                  ]}
                  size={10}
                />
                <AppText
                  textProps={{
                    style: [
                      createNewPasswordStyles.whiteText,
                      { opacity: info.met ? 1 : 0.5 }
                    ]
                  }}
                  content={info.text}
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
              loading={loading}
              onPress={onHandleSaveNewPassword}
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
