import { StyleSheet } from "react-native";
import { ThemedList } from "../ThemedList";
import { ThemedText } from "../ThemedText";

export type NoteProps = {
  id: string,
  value: string
}

function Note({value, id, ...otherProps} : NoteProps){
  return <ThemedText style={styles.note} {...otherProps}>{`* ${value}`}</ThemedText>
}

export default function Notes({children}: {children: NoteProps[]}){
  return (
    <ThemedList 
      data={children}
      scrollEnabled={false}
      renderItem={({item}) => <Note {...item}/>}
    />
  )
}

const styles = StyleSheet.create({
  note: {
    fontWeight: "200",
    fontStyle: "italic",
  },
})