import { Pressable, PressableProps, StyleProp, StyleSheet, Text, ViewStyle } from "react-native";

export default function RemoveButton({style, onPress, ...rest} : PressableProps){
    return (
        <Pressable style={[styles.deleteButton, style as StyleProp<ViewStyle>]} onPress={onPress} {...rest}>
            <Text style={[styles.xButton]}>x</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
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