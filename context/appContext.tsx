import { createContext, PropsWithChildren, useState } from "react";
import AnimatedNotification, {
  NotificationType,
} from "../components/notification.component";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import colors from "@/constants/colors";
import AppText from "@/components/appText.component";
import { AntDesign } from "@expo/vector-icons";
import textSize from "@/constants/textSize";
import osteocheckBlueBgLogo from "@/assets/images/osteocheck-blue-bg-logo.png";
import { useRouter } from "expo-router";
import UserContextProvider from "./userContext";
import { clearAllStoredData } from "@/utils/asyncStorage";

type AppNotification = {
  type: NotificationType;
  message: string;
};

export enum ScreenName {
  Home = "Home",
  History = "Histórico",
  Library = "Biblioteca",
  Patients = "Pacientes",
  Config = "Configurações",
}

interface IAppContext {
  handleSetNotification: (
    notificationType: NotificationType,
    message: string,
  ) => void;
  handleShowHeaderComponent: (show: boolean, screenName?: ScreenName) => void;
  handleLogout: () => void;
}

const defaultAppContext: IAppContext = {
  handleSetNotification: () => null,
  handleShowHeaderComponent: () => null,
  handleLogout: () => null,
};

export const AppContext = createContext(defaultAppContext);

export default function AppContextProvider({ children }: PropsWithChildren) {
  const [notification, setNofication] = useState<AppNotification>();
  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);
  const [showHeader, setShowHeader] = useState<boolean>(false);
  const [screenName, setScreenName] = useState<ScreenName>();

  const router = useRouter();

  const handleSetNotification = (
    notificationType: NotificationType,
    message: string,
  ) => {
    if (message) {
      setNofication({
        type: notificationType,
        message,
      });
      setIsNotificationOpen(true);
    }
  };

  const handleShowHeaderComponent = (
    show: boolean,
    screenName?: ScreenName,
  ) => {
    if (show) {
      setShowHeader(true);
      setScreenName(screenName);
    }
  };

  const handleLogout = () => {
    clearAllStoredData();
    setScreenName(undefined);
    setShowHeader(false);
    router.replace("/(auth)/home");
  }

  const context: IAppContext = {
    handleSetNotification,
    handleShowHeaderComponent,
    handleLogout,
  };

  return (
    <AppContext.Provider value={context}>
      <AnimatedNotification
        notification={notification}
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
        notificationType={notification?.type}
      />

      {showHeader && screenName !== ScreenName.Home ? (
        <View style={appContextStyle.headerComponent}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 20 }}
            >
              <TouchableOpacity onPress={() => router.back()}>
                <AntDesign name="left" color={colors.mainWhite} size={16} />
              </TouchableOpacity>
              <AppText
                content={screenName}
                textProps={{
                  style: { color: colors.mainWhite, fontSize: textSize.small },
                }}
              />
            </View>

            <Image
              source={osteocheckBlueBgLogo}
              style={{
                width: 90,
                height: 30,
              }}
            />
          </View>
        </View>
      ) : null}

      <UserContextProvider>
        {children}
      </UserContextProvider>
    </AppContext.Provider>
  );
}

const appContextStyle = StyleSheet.create({
  headerComponent: {
    backgroundColor: colors.darkBlue,
    paddingInline: 30,
    paddingTop: 60,
    paddingBottom: 40,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
});
