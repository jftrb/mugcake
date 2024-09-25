import { StyleSheet, TextInputProps } from "react-native";
import { ThemedText } from "../ThemedText";
import { ThemedView, ThemedViewProps } from "../ThemedView";
import { ThemedTextInput } from "../ThemedTextInput";

export type PrepCardProps = ThemedViewProps & {
  label: string, 
  value: string,
}

export default function PrepCard({label, value, editable, inputProps, ...otherProps} : PrepCardProps & {editable?: boolean, inputProps?: TextInputProps}){
  return (
    <ThemedView {...otherProps}>
      <ThemedText style={styles.cardLabel}>{label}</ThemedText>
      {!editable ?
        <ThemedText style={styles.cardValue}>{value}</ThemedText>
        :
        <ThemedTextInput style={[styles.cardValue, styles.input]} {...inputProps} value={value}/> 
      }
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  cardValue : {
    textAlign: "center",
    fontWeight: "bold",
  },
  input: {
    maxWidth: 75,
  },
  cardLabel : {
    textAlign: "center",
  },
})