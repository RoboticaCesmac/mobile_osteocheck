import { View, Image, StyleSheet, TouchableOpacity, Text } from "react-native";
import Container from "@/components/container.component";
import AppText from "@/components/appText.component";
import ButtonComponent from "@/components/button.component";
import TextSize, { TextSizeEnum } from "@/constants/textSize";
import Colors from "@/constants/colors";
import { useRouter } from "expo-router";
import { useState } from "react";
import { defaultFormStyle } from "@/constants/formStyle";
import osteocheckLogo from "@/assets/images/osteocheck-logo.png";
import colors from "@/constants/colors";
import BadgeComponent from "@/components/badge.component";

export default function HomeScreen() {
  const [homeInfoPage, setHomeInfoPage] = useState<number>(0);

  const router = useRouter();

  const handleGoToLoginScreen = () => {
    router.navigate('/(auth)/login');
  }

  const handleGoToRegisterScreen = () => {
    router.navigate('/(auth)/register');
  }

  const topTextGroupA = (
    <AppText
      textProps={{
        style: { ...homeScreenStyles.whiteText, marginTop: 20 },
      }}
      content={[
        <AppText
          content={"O OsteoCheck apoia médicos e cirurgiões-dentistas na "}
        />,
        <AppText
          textProps={{ style: { color: colors.opaqueYellow } }}
          content={"tomada de decisão "}
        />,
        <AppText content={"suspeita ou diagnóstico de osteonecrose "} />,
        <AppText content={"dos maxilares relacionada a medicamentos."} />,
      ]}
      size={TextSizeEnum.Regular}
    />
  );

  const bottomTextGroupA = (
    <AppText
      textProps={{
        style: { ...homeScreenStyles.whiteText, marginTop: 60 },
      }}
      content={[
        <AppText
          content={"Por meio de um fluxo guiado, o aplicativo ajuda a "}
        />,
        <AppText
          textProps={{ style: { color: colors.opaqueYellow } }}
          content={
            "estimar o risco, definir o estadiamento e orientar a conduta "
          }
        />,
        <AppText content={"no atendimento."} />,
      ]}
      size={TextSizeEnum.Regular}
    />
  );

  const topTextGroupB = (
    <AppText
      textProps={{
        style: { ...homeScreenStyles.whiteText, marginTop: 20 },
      }}
      content={[
        <AppText content={"As recomendações seguem os critérios da "} />,
        <AppText
          textProps={{ style: { color: colors.opaqueYellow } }}
          content={"AAOMS (2022) "}
        />,
        <AppText content={"e do consenso "} />,
        <AppText
          textProps={{ style: { color: colors.opaqueYellow } }}
          content={"MASCC/ISOO/ASCO (2019), "}
        />,
        <AppText
          content={
            " indicando condutas preventivas, terapêuticas e encaminhamentos padronizados."
          }
        />,
      ]}
      size={TextSizeEnum.Regular}
    />
  );

  const bottomTextGroupB = (
    <AppText
      textProps={{
        style: { ...homeScreenStyles.whiteText, marginTop: 60 },
      }}
      content={[
        <AppText content={"O OsteoCheck é uma "} />,
        <AppText
          textProps={{ style: { color: colors.opaqueYellow } }}
          content={"ferramenta de apoio "}
        />,
        <AppText content={"à decisão e "} />,
        <AppText
          textProps={{ style: { color: colors.opaqueYellow } }}
          content={"não substitui o julgamento profissional."}
        />,
      ]}
      size={TextSizeEnum.Regular}
    />
  );

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

      <View style={homeScreenStyles.infoContainer}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            gap: 20,
            marginBottom: 10,
          }}
        >
          <TouchableOpacity
            style={{ padding: 10 }}
            onPress={() => setHomeInfoPage(0)}
          >
            <BadgeComponent
              style={{
                backgroundColor:
                  homeInfoPage === 0 ? colors.opaqueYellow : colors.mainWhite,
              }}
              size={7}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{ padding: 10 }}
            onPress={() => setHomeInfoPage(1)}
          >
            <BadgeComponent
              style={{
                backgroundColor:
                  homeInfoPage === 0 ? colors.mainWhite : colors.opaqueYellow,
              }}
              size={7}
            />
          </TouchableOpacity>
        </View>

        <AppText
          textProps={{
            style: { ...homeScreenStyles.whiteText, fontWeight: "bold" },
          }}
          content="Bem-Vindo!"
          size={TextSizeEnum.Big}
        />

        {homeInfoPage === 0 ? (
          <>
            {topTextGroupA}
            {bottomTextGroupA}
          </>
        ) : (
          <>
            {topTextGroupB}
            {bottomTextGroupB}
          </>
        )}

        <View style={homeScreenStyles.loginForm}>
          <ButtonComponent
            style={{
              backgroundColor: colors.mainWhite,
            }}
            onPress={handleGoToLoginScreen}
          >
            <AppText
              textProps={{ style: { margin: "auto", color: colors.darkBlue } }}
              content={"Entrar"}
            />
          </ButtonComponent>

          <ButtonComponent
            style={{
              borderColor: colors.mainWhite,
            }}
            onPress={handleGoToRegisterScreen}
          >
            <AppText
              textProps={{ style: { margin: "auto", color: colors.mainWhite } }}
              content={"Cadastrar-se"}
            />
          </ButtonComponent>
        </View>
      </View>
    </Container>
  );
}

const homeScreenStyles = StyleSheet.create({
  loginForm: {
    ...defaultFormStyle,
    marginTop: 40,
  },
  whiteText: {
    color: colors.mainWhite,
  },
  infoContainer: {
    backgroundColor: colors.darkBlue,
    padding: 30,
    paddingBottom: 60,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  submitButtonText: {
    fontSize: TextSize.regular,
    color: Colors.mainWhite,
  },
  signupText: {
    fontSize: TextSize.small,
  },
  signupTextDecoration: {
    textDecorationLine: "underline",
  },
});
