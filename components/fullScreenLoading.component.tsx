import Colors from "@/constants/colors";
import ZIndex from "@/constants/zIndex";
import textSize from "@/constants/textSize";
import AppText from "@/components/appText.component";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { BlurView } from "expo-blur";

export default function FullScreenLoading() {
  return (
    <View style={fullScreenLoadingStyles.container}>
      <BlurView intensity={20} tint="dark" style={StyleSheet.absoluteFillObject} />
      <View style={fullScreenLoadingStyles.card}>
        <ActivityIndicator size="large" color={Colors.successBlue} />
        <AppText
          content="Carregando..."
          textProps={{ style: fullScreenLoadingStyles.text }}
        />
      </View>
    </View>
  )
}

const fullScreenLoadingStyles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: ZIndex.aboveAll,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: Colors.mainWhite,
    paddingVertical: 30,
    paddingHorizontal: 40,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: Colors.mainBlack,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    gap: 16,
  },
  text: {
    color: Colors.darkBlue,
    fontSize: textSize.small,
    fontWeight: "bold",
    marginTop: 4,
  }
})