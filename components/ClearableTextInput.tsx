import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, TextInputProps, StyleSheet } from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedTextInput } from "./ThemedTextInput";

interface ClearableTextInputProps extends TextInputProps {
  onClear?: () => void;
}

export default function ClearableTextInput({
  style,
  onClear,
  ...rest
}: ClearableTextInputProps) {
  return (
    <ThemedView style={[style, styles.inputContainer]}>
      <ThemedTextInput style={[styles.inputBox, style, styles.requiredInputBox]} {...rest} />
      <Pressable
        style={{
          alignSelf: "center",
          position: 'absolute',
          right: 0,
          marginRight: 4,
          padding: 4,
          backgroundColor: "transparent",
        }}
        onPress={onClear}
      >
        <MaterialIcons name="clear" size={16} />
      </Pressable>
      </ThemedView>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    minWidth: 48,
    padding: 0,
    paddingBottom: 0,
    paddingEnd: 0,
    paddingHorizontal: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingStart: 0,
    paddingTop: 0,
    paddingVertical: 0
  },
  inputBox: {
  },
  requiredInputBox: {
    flex: 1,
    backgroundColor: 'transparent',
    color: 'black',
    paddingRight: 28,
    borderWidth: 0,
    margin: 0,
    marginBottom: 0,
    marginEnd: 0,
    marginHorizontal: 0,
    marginLeft: 0,
    marginRight: 0,
    marginStart: 0,
    marginTop: 0,
    marginVertical: 0,
  }
});
