import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import AppText from "./appText.component";
import colors from "@/constants/colors";
import textSize from "@/constants/textSize";

interface EmptyContentProps {
  size?: number;
  description?: string;
}

export default function EmptyContentComponent(props: EmptyContentProps) {
  return(
    <View style={emptyContentStyles.container}>
      <AntDesign color={colors.darkerGray} name="folder-open" size={props.size || 100}/>
      <AppText 
        textProps={{
          style: emptyContentStyles.emptyDescriptionText
        }}
        content={props.description || 'Empty Content'}
      />
    </View>
  )
}

const emptyContentStyles = StyleSheet.create({
  container: {
    margin: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyDescriptionText: {
    color: colors.darkerGray,
    marginTop: -20,
    fontSize: textSize.small
  }
})