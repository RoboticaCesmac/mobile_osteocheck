import Colors from "@/constants/colors";
import ZIndex from "@/constants/zIndex";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

export default function FullScreenLoading() {
  return (
    <View style={fullScreenLoadingStyles.container}>
      <ActivityIndicator color={Colors.mainWhite}/>
    </View>
  )
}

const fullScreenLoadingStyles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: ZIndex.aboveAll,
    justifyContent: "center",
    alignItems: "center",
  }
})