import { useThemeColor } from "@/hooks/useThemeColor";
import { GestureResponderEvent, StyleSheet } from "react-native";
import RemoveButton from "./recipe/edit/RemoveButton";
import { ThemedText } from "./ThemedText";
import { ThemedViewProps, ThemedView } from "./ThemedView";

type TagProps2 = ThemedViewProps & {
  item: string;
  editable?: boolean;
  onPress?: null | ((event: GestureResponderEvent) => void);
};

export function Tag({ style, item, editable, onPress, ...rest }: TagProps2) {
  const borderColor = useThemeColor({}, 'text');

  const dynamicStyle = StyleSheet.create({
    border: {
      borderColor: borderColor
    },
  });

  return (
    <ThemedView style={[tagStyles.tagContainer, dynamicStyle.border, style]} {...rest}>
      <ThemedText>{item}</ThemedText>
      {editable ?
        <RemoveButton style={{ marginLeft: 4 }} onPress={onPress} /> :
        null}
    </ThemedView>
  );
}

export const tagStyles = StyleSheet.create({
  tagContainer: {
    height: 32,
    padding: 8,
    paddingBottom: 4,
    paddingTop: 2,
    borderRadius: 16,
    borderWidth: 1,
    userSelect: 'none',
    flexDirection: 'row',
    alignItems: 'center'
  },
});
