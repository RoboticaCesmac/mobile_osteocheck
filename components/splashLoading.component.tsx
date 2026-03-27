import Colors from "@/constants/colors";
import ZIndex from "@/constants/zIndex";
import { StyleSheet, View, Image } from "react-native";
import osteocheckBlueBgLogo from "@/assets/images/osteocheck-blue-bg-logo.png";
import { ActivityIndicator } from "react-native-paper";

export default function SplashLoading() {
  return (
    <View style={splashLoadingStyles.container}>
      <Image
        source={osteocheckBlueBgLogo}
        style={splashLoadingStyles.image}
        resizeMode="contain"
      />
      <View style={splashLoadingStyles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.mainWhite} />
      </View>
    </View>
  );
}

const splashLoadingStyles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: ZIndex.aboveAll,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.darkBlue,
  },
  image: {
    width: 250,
    height: 250,
  },
  loadingContainer: {
    position: "absolute",
    bottom: 100,
  }
});
