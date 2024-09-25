import { StyleSheet } from "react-native";
import { ThemedList } from "../ThemedList";
import { ThemedText } from "../ThemedText";
import { ThemedView, ThemedViewProps } from "../ThemedView";
import EditableList, { Editable } from "./edit/EditableList";
import RemoveButton from "./edit/RemoveButton";
import { ThemedTextInput } from "../ThemedTextInput";
import { useState } from "react";
import { randomUUID } from "expo-crypto";

export type StepProps = {
  id: string,
  value: string
}

function CookingStep({value, id, onDeletePress, editable, ...otherProps} : StepProps & Editable){
  if (!editable) {
    return <ThemedText {...otherProps}>{`\u2023 ${value}`}</ThemedText>
  } else {
    return (
      <ThemedView style={{flexDirection: 'row', flex: 1}}>
        <ThemedView>
          <RemoveButton style={{marginRight: 12, alignSelf: 'flex-start'}} onPress={() => onDeletePress(id)}/>
        </ThemedView>
        <ThemedTextInput style={{borderWidth: 0.5, flex: 1}} defaultValue={value} multiline></ThemedTextInput>
      </ThemedView>
    )
  }
}

export default function CookingSteps({style, data, editable}: ThemedViewProps & {data: StepProps[], editable?: boolean}){
  const [steps, setSteps] = useState(data)

  function createChildComponent(item: StepProps) {
    return (
      <CookingStep 
        {...item}
        editable={editable}
        onDeletePress={(id) => {
          console.log(`deleting cooking step ${id}`)
          const newSteps = steps.filter(i => i.id !== id)
          setSteps(newSteps)
        }}
      />)
  }

  if (!editable) {
    return (
      <ThemedView style={style}>
        <ThemedList 
          style={styles.stepsList}
          scrollEnabled={false}
          data={data}
          renderItem={({item}) => createChildComponent(item)}
        />
      </ThemedView>
    )
  } else {
    return (
      <EditableList
        style={{rowGap: 6, marginBottom: 6, marginRight: 30}}
        scrollEnabled={false}
        data={steps}
        renderItem={({item}) => createChildComponent(item)}
        onPress={() => {
          console.log('adding cooking step')
          steps.push({value: '', id: randomUUID()});
          setSteps(Array(...steps));
        }}
      />
    )
  }
}

const styles = StyleSheet.create({
  stepsList: {
    rowGap: 4
  },
})