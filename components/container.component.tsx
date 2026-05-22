import React from "react";
import { StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Container({ children }: React.PropsWithChildren) {
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={containerStyle.container}
      bounces={false}
      keyboardShouldPersistTaps="handled"
      extraScrollHeight={100}
      enableOnAndroid={true}
    >
      {children}
    </KeyboardAwareScrollView>
  );
}

const containerStyle = StyleSheet.create({
  container: {
    paddingTop: 70,
    flexGrow: 1,
    backgroundColor: "#fff",
  },
});