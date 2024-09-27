import { GestureResponderEvent, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView, ThemedViewProps } from "./ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import RemoveButton from "./recipe/edit/RemoveButton";

type TagProps = ThemedViewProps & {
    item: string
    editable?: boolean
    onPress?: null | ((event: GestureResponderEvent) => void)
}

export default function Tag({style, item, editable, onPress, ...rest} : TagProps){
    const borderColor = useThemeColor({}, 'text')
  
    const dynamicStyle = StyleSheet.create({
      border: {
        borderColor: borderColor
      },
    })

    return (
        <ThemedView style={[styles.tagContainer, dynamicStyle.border, style]} {...rest}>
            <ThemedText>{item}</ThemedText>
            {editable ? 
              <RemoveButton style={{marginLeft: 4}} onPress={onPress}/> : 
              null
            }
        </ThemedView>
    )
}


const styles = StyleSheet.create({
  tagContainer: {
    minHeight: 32,
    padding: 8,
    paddingBottom: 4,
    paddingTop: 2,
    borderRadius: 16,
    borderWidth: 1,
    userSelect: 'none',
    flexDirection: 'row',
    alignItems: 'center'
  },
  deleteButton: {
    padding: 4,
    margin: -2,
    marginLeft: 4,
  },
  xButton: {
    color: 'red',
    fontWeight: 'bold'
  }
})