import AppText from "@/components/appText.component";
import AvatarComponent from "@/components/avatar.component";
import ConfirmModalComponent from "@/components/confirmModal.component";
import Container from "@/components/container.component";
import colors from "@/constants/colors";
import textSize from "@/constants/textSize";
import { AppContext, ScreenName } from "@/context/appContext";
import { UserContext } from "@/context/userContext";
import { AntDesign } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useContext, useState } from "react";
import { BackHandler, StyleSheet, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const appContext = useContext(AppContext);
  const userContext = useContext(UserContext);

  useFocusEffect(
    useCallback(() => {
      appContext.handleShowHeaderComponent(true, ScreenName.Home);

      const onBackPress = () => {
        setIsLogoutModalOpen(true);
        return true;
      };

      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => subscription.remove();
    }, []),
  );

  const onHandleLogOut = () => {
    appContext.handleLogout();
  }

  const onHandleGoToPatientsScreen = () => {
    router.push("/(main)/patients");
  }

  return (
    <Container>
      <View style={homeScreenStyles.headerComponent}>
        <View style={{ gap: 5 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <AvatarComponent>
              <AntDesign name="user-switch" size={25} />
            </AvatarComponent>

            <View>
              <AppText
                content="Bem-vindo!"
                textProps={{
                  style: { color: colors.opaqueBlue, fontSize: textSize.big },
                }}
              />
              <AppText
                content={userContext.user?.name}
                textProps={{
                  style: {
                    color: colors.mainWhite,
                    fontSize: textSize.regular,
                  },
                }}
              />
            </View>
          </View>
          <AppText
            content="Acompanhe as suas avaliações"
            textProps={{
              style: {
                color: colors.mainWhite,
                fontSize: textSize.small,
                opacity: 0.5,
              },
            }}
          />

          <View
            style={{
              width: "100%",
              height: 1,
              marginTop: 20,
              backgroundColor: colors.mainWhite,
              opacity: 0.5,
            }}
          />
        </View>
      </View>

      <View style={{ marginTop: 170, paddingInline: 30 }}>
        <AppText content="Ações Rápidas" />

        <View style={{ marginTop: 20 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              gap: 10,
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={homeScreenStyles.quickActionsTouchableOpacity}
            >
              <AntDesign
                name="user-add"
                size={20}
                style={homeScreenStyles.quickActionsIcon}
              />
              <AppText content="Novo Paciente" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onHandleGoToPatientsScreen}
              style={homeScreenStyles.quickActionsTouchableOpacity}
            >
              <AntDesign
                name="usergroup-add"
                size={20}
                style={homeScreenStyles.quickActionsIcon}
              />
              <AppText content="Ver Pacientes" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ marginTop: 20 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              gap: 10,
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={homeScreenStyles.quickActionsTouchableOpacity}
            >
              <AntDesign
                name="history"
                size={20}
                style={homeScreenStyles.quickActionsIcon}
              />
              <AppText content="Minhas Avaliações" />
            </TouchableOpacity>
          </View>
        </View>

        <AppText
          content="Pode te interessar"
          textProps={{ style: { marginBlock: 20 } }}
        />

        <View
          style={{
            backgroundColor: colors.opaqueBlue,
            borderRadius: 10,
            padding: 20,
          }}
        >
          <View style={{ flexDirection: 'row' }}>
            <AppText
              content="Osteonecrose dos maxilares relacionada a medicamentos (ONM-RM)"
              size={textSize.regular}
              textProps={{
                style: { fontWeight: "bold" },
              }}
            />
            <AntDesign name="star" size={20} color={colors.opaqueYellow} style={{ marginLeft: -10 }} />
          </View>

          <AppText
            content="A ONM-RM é caracterizada pela exposição óssea persistente por mais de 8 semanas em pessoas em uso de drogas antirreabsortivas e/ou drogas antiangiogênicas, sem história de radioterapia na região (Ruggiero et al., 2022; Yarom et al., 2019)."
            size={textSize.regular}
            textProps={{
              style: { marginTop: 20 },
            }}
          />
        </View>
      </View>

      <ConfirmModalComponent
        visible={isLogoutModalOpen}
        title="Sair da Conta"
        description="Tem certeza que deseja encerrar sua sessão?"
        cancelLabel="Cancelar"
        confirmLabel="Sair"
        onCancel={() => setIsLogoutModalOpen(false)}
        onConfirm={onHandleLogOut}
      />
    </Container>
  );
}

const homeScreenStyles = StyleSheet.create({
  headerComponent: {
    backgroundColor: colors.darkBlue,
    paddingInline: 30,
    paddingTop: 60,
    paddingBottom: 40,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    position: "absolute",
    width: "100%",
  },
  quickActionsTouchableOpacity: {
    backgroundColor: colors.transparentWhite,
    padding: 20,
    borderRadius: 10,
    gap: 20,
    width: 150,
    height: 150,
  },
  quickActionsIcon: {
    backgroundColor: colors.opaqueBlue,
    padding: 13,
    borderRadius: 10,
    alignSelf: "flex-start",
  },
});
