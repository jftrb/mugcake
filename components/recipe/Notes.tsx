import { StyleSheet } from "react-native";
import { ThemedList } from "../ThemedList";
import { ThemedText } from "../ThemedText";
import { ThemedViewProps } from "../ThemedView";
import { NoteModel } from "@/models/mugcakeApiModels";

function Note({ value, ...otherProps }: NoteModel) {
  return (
    <ThemedText style={styles.note} {...otherProps}>{`* ${value}`}</ThemedText>
  );
}

export default function Notes({
  style, 
  data,
}: ThemedViewProps & { data: NoteModel[] }) {
  return (
    <ThemedList
      style={[styles.notesList, style]}
      data={data}
      scrollEnabled={false}
      renderItem={({ item }) => <Note {...item} />}
    />
  );
}

const styles = StyleSheet.create({
  note: {
    fontWeight: "200",
    fontStyle: "italic",
  },
  notesList: {
    gap: 4,
    alignContent: "stretch",
  },
});
