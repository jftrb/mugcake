import { StyleSheet } from "react-native";
import { ThemedList } from "../ThemedList";
import { ThemedText } from "../ThemedText";
import { ThemedView, ThemedViewProps } from "../ThemedView";

function CookingStep({...otherProps}){
  return (
    <ThemedText {...otherProps}/>
  )
}

export default function CookingSteps({style, children}: ThemedViewProps & {children: string[]}){
  return (
    <ThemedView style={style}>
      <ThemedList 
        style={styles.stepsList}
        scrollEnabled={false}
        data={children}
        renderItem={({item}) => <CookingStep>{`\u2023 ${item}`}</CookingStep>}
      />
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  stepsList: {
    rowGap: 4
  },
})