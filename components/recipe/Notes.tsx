import { StyleSheet } from "react-native";
import { ThemedList } from "../ThemedList";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";

function Note({...otherProps}){
  return (
    <ThemedText style={styles.note} {...otherProps}/>
  )
}

export default function Notes({children}: {children: string[]}){
  return (
    <ThemedView>
      <ThemedList 
        data={children}
        scrollEnabled={false}
        renderItem={({item}) => <Note>{`* ${item}`}</Note>}
      />
    </ThemedView>
  )
}

const styles = StyleSheet.create({
    note: {
      fontWeight: "200",
      fontStyle: "italic",
    },
})