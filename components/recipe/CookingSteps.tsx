import { StyleSheet } from "react-native";
import { ThemedList } from "../ThemedList";
import { ThemedText } from "../ThemedText";
import { ThemedViewProps } from "../ThemedView";

export type CookingStepProps = {
  id: string,
  value: string
}

function CookingStep({value, id, ...otherProps} : CookingStepProps){
  return <ThemedText {...otherProps}>{`\u2023 ${value}`}</ThemedText>
}

export default function CookingSteps({style, data}: ThemedViewProps & {data: CookingStepProps[]}){
  return (
    <ThemedList 
      style={[styles.stepsList, style]}
      scrollEnabled={false}
      data={data}
      renderItem={({item}) => <CookingStep {...item}/>}
    />
  )
}

const styles = StyleSheet.create({
  stepsList: {
    rowGap: 4
  },
})