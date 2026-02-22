import AppText from "@/components/appText.component";
import AvatarComponent from "@/components/avatar.component";
import Container from "@/components/container.component";
import colors from "@/constants/colors";
import textSize from "@/constants/textSize";
import { AppContext, ScreenName } from "@/context/appContext";
import { UserContext } from "@/context/userContext";
import { AntDesign } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import { useCallback, useContext } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const appContext = useContext(AppContext);
  const userContext = useContext(UserContext);

  useFocusEffect(
    useCallback(() => {
      appContext.handleShowHeaderComponent(true, ScreenName.Home);
    }, []),
  );
  return (
    <Container>
      <View style={homeScreenStyles.headerComponent}>
        <View style={{ gap: 5 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <AvatarComponent>
              <AntDesign name="user-switch" size={25}/>
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
});
