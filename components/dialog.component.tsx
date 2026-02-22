import { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { Dialog, Portal } from "react-native-paper";
import AppText from "./appText.component";
import textSize from "@/constants/textSize";
import colors from "@/constants/colors";
import { PropsFilter } from "react-native-reanimated/lib/typescript/createAnimatedComponent/PropsFilter";

interface DialogComponentProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  title: string;
  description: string;
  onOk: () => void;
}

export default function DialogComponent({
  title,
  description,
  isOpen,
  setIsOpen,
  onOk,
}: DialogComponentProps) {
  const handleHideDialog = () => {
    setIsOpen(false);
  };

  return (
    <Portal>
      <Dialog
        style={{ backgroundColor: "white" }}
        visible={isOpen}
        onDismiss={handleHideDialog}
      >
        <Dialog.Title>
          <AppText
            content={title}
            textProps={{
              style: {
                color: colors.mainBlack,
              },
            }}
          />
        </Dialog.Title>
        <Dialog.Content>
          <AppText
            content={description}
            textProps={{
              style: {
                fontSize: textSize.small,
              },
            }}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <TouchableOpacity onPress={handleHideDialog}>
            <AppText
              textProps={{
                style: {
                  fontSize: textSize.small,
                },
              }}
              content="Close"
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={onOk}>
            <AppText
              textProps={{
                style: {
                  fontSize: textSize.small,
                },
              }}
              content="Confirm"
            />
          </TouchableOpacity>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
