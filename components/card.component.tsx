import colors from "@/constants/colors";
import textSize from "@/constants/textSize";
import { StyleSheet } from "react-native";
import { Card } from "react-native-paper";

interface CardComponentProps {
  children: React.ReactElement;
  title?: string;
}

export default function CardComponent({ children, title }: CardComponentProps) {
  return (
    <Card
      style={cardComponentStyles.container}
    >
      <Card.Title titleStyle={cardComponentStyles.cardTitle} title={title}/>
      { children }
    </Card>
  );
}

const cardComponentStyles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  cardTitle: {
    color: colors.darkerGray,
    fontSize: textSize.small
  }
})