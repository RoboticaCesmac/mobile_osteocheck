import Container from "@/components/container.component";
import { Image, StyleSheet, View } from "react-native";
import osteocheckLogo from "@/assets/images/osteocheck-logo.png";
import colors from "@/constants/colors";
import { defaultFormStyle } from "@/constants/formStyle";
import AppText from "@/components/appText.component";
import textSize from "@/constants/textSize";
import InputComponent from "@/components/input.component";
import ButtonComponent from "@/components/button.component";
import { useLocalSearchParams, useRouter } from "expo-router";
import BadgeComponent from "@/components/badge.component";
import { useState, useContext } from "react";
import professionalApi from "@/services/professional";
import AntDesign from "@expo/vector-icons/AntDesign";
import { AppContext } from "@/context/appContext";
import { NotificationType } from "@/components/notification.component";

export default function PasswordChangeNewPasswordScreen() {
  const router = useRouter();
  const appContext = useContext(AppContext);
  const { email } = useLocalSearchParams<{ email: string }>();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onHandleCancel = () => {
    router.dismissAll();
  };

  const onHandleSave = async () => {
    if (!password || !confirmPassword) {
      appContext.handleSetNotification(NotificationType.Error, "Por favor, preencha todos os campos.");
      return;
    }
    if (password !== confirmPassword) {
      appContext.handleSetNotification(NotificationType.Error, "As senhas não coincidem.");
      return;
    }

    try {
      setIsLoading(true);
      await professionalApi.changePassword({ email, password });
      appContext.handleSetNotification(NotificationType.Success, "Senha alterada com sucesso.");
      router.dismissAll();
    } catch (error: any) {
      appContext.handleSetNotification(NotificationType.Error, error?.response?.data?.message || "Erro ao alterar senha.");
    } finally {
      setIsLoading(false);
    }
  }

  const registerFieldsInfos = [
    "Mínimo de 8 caracteres",
    "Uma letra maiúscula",
    "Uma letra minúscula",
    "Um número",
    "Um caracter especial (@, #, %, &, $)",
  ];

  return (
    <Container>
      <View style={{ position: "absolute", top: 50, left: 20, zIndex: 10 }}>
        <AntDesign name="left" size={30} color={colors.mainWhite} onPress={onHandleCancel} />
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
          content="Crie uma nova senha e confirme abaixo."
        />

        <View style={styles.form}>
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
                style={styles.infoBadgeContainer}
              >
                <BadgeComponent
                  style={styles.infoBadgeComponent}
                  size={10}
                />
                <AppText
                  textProps={{ style: styles.whiteText }}
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
              onPress={onHandleCancel}
              disabled={isLoading}
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
              onPress={onHandleSave}
              disabled={isLoading}
            >
              <AppText
                textProps={{
                  style: { margin: "auto", color: colors.mainWhite },
                }}
                content={isLoading ? "Salvando..." : "Salvar"}
              />
            </ButtonComponent>
          </View>
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
  form: {
    ...defaultFormStyle,
    marginTop: 40,
  },
});
