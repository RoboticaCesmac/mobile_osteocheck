import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  Animated,
} from "react-native";
import InputComponent, { InputComponentProps } from "./input.component";
import { AntDesign } from "@expo/vector-icons";
import { useState, useRef, useEffect } from "react";
import AppText from "./appText.component";
import textSize from "@/constants/textSize";
import CheckBoxComponent from "./checkbox.component";
import ButtonComponent from "./button.component";
import colors from "@/constants/colors";

interface DropdownComponentProps extends InputComponentProps {
  listItems: ListItem[];
  selectedItems: number[];
  setSelectedItems: React.Dispatch<React.SetStateAction<number[]>>;
  hasSubmitButton?: boolean;
  onSubmit?: () => void;
}

type ListItem = {
  label: string;
  value: number;
};

export default function DropdownComponent(props: DropdownComponentProps) {
  const [isActive, setIsActive] = useState<boolean>(false);

  const heightAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const handleSubmit = () => {
    if (!props.onSubmit) {
      return;
    }
    props.onSubmit();
    setIsActive(false);
  }

  useEffect(() => {
    if (isActive) {
      Animated.parallel([
        Animated.timing(heightAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(heightAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();
    }
  }, [isActive]);

  const handleSelectItem = (value: number) => {
    if (props.selectedItems.find((i) => i === value)) {
      props.setSelectedItems((prev) => prev.filter((i) => i !== value));
    } else {
      props.setSelectedItems((prev) => [...prev, value]);
    }
  };

  const maxHeight = 150;
  const animatedHeight = heightAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, maxHeight],
  });

  return (
    <View style={dropdownComponentStyles.container}>
      <TouchableOpacity onPress={() => setIsActive((prev) => !prev)}>
        <View>
          <InputComponent {...props} editable={false} />
          <AntDesign
            style={dropdownComponentStyles.arrowDown}
            name={`${isActive ? "caret-up" : "caret-down"}`}
          />
        </View>
      </TouchableOpacity>

      <Animated.View
        style={{
          maxHeight: animatedHeight,
          opacity: opacityAnim,
          overflow: "hidden",
        }}
      >
        <FlatList
          scrollEnabled={true}
          indicatorStyle="black"
          data={props.listItems}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleSelectItem(item.value)}
              style={dropdownComponentStyles.listItem}
            >
              <CheckBoxComponent
                isChecked={props.selectedItems?.includes(item.value)}
                status="unchecked"
              />
              <AppText
                content={item.label}
                textProps={{
                  style: dropdownComponentStyles.itemListText,
                }}
              />
            </TouchableOpacity>
          )}
        />

        {props.hasSubmitButton ? (
          <ButtonComponent 
            onPress={handleSubmit}
            style={dropdownComponentStyles.submitButton}
          >
            <AppText
              content="Submit"
              textProps={{
                style: dropdownComponentStyles.submitButtonText,
              }}
            />
          </ButtonComponent>
        ) : null}
      </Animated.View>
    </View>
  );
}

const dropdownComponentStyles = StyleSheet.create({
  container: {
    position: "relative",
  },
  arrowDown: {
    position: "absolute",
    top: "40%",
    right: 20,
  },
  itemListText: {
    fontSize: textSize.small,
    left: 10,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  submitButton: {
    width: "50%",
    margin: "auto",
    backgroundColor: colors.mainGray,
  },
  submitButtonText: {
    fontSize: textSize.verySmall,
    color: colors.mainBlack,
  },
});
