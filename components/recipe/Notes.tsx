import { StyleSheet } from "react-native";
import { ThemedList } from "../ThemedList";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import EditableList, { Editable } from "./edit/EditableList";
import { useState } from "react";
import { ThemedTextInput } from "../ThemedTextInput";
import RemoveButton from "./edit/RemoveButton";
import { randomUUID } from "expo-crypto";

export type NoteProps = {
  id: string,
  value: string
}

function Note({value, id, onDeletePress, editable, ...otherProps} : NoteProps & Editable){
  if (!editable) {
    return <ThemedText style={styles.note} {...otherProps}>{`* ${value}`}</ThemedText>
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

export default function Notes({children, editable}: {children: NoteProps[], editable?: boolean}){
  const [notes, setNotes] = useState(children)

  function createChildComponent(item: NoteProps) {
    return (
      <Note 
        {...item}
        editable={editable}
        onDeletePress={(id) => {
          console.log(`deleting note ${id}`)
          const newNotes = notes.filter(i => i.id !== id)
          setNotes(newNotes)
        }}
      />)
  }

  if (!editable) {
    return (
      <ThemedView>
        <ThemedList 
          data={children}
          scrollEnabled={false}
          renderItem={({item}) => createChildComponent(item)}
        />
      </ThemedView>
    )
  } else {
    return (
      <>
        <ThemedText type="subtitle" style={{paddingTop: 4}}>Notes :</ThemedText>
        <EditableList
          style={{rowGap: 6, marginBottom: 6, marginRight: 30}}
          scrollEnabled={false}
          data={notes}
          renderItem={({item}) => createChildComponent(item)}
          onPress={() => {
            console.log('adding note')
            notes.push({value: '', id: randomUUID()});
            setNotes(Array(...notes));
          }}
        />
      </>
    )
  }
}

const styles = StyleSheet.create({
  note: {
    fontWeight: "200",
    fontStyle: "italic",
  },
})