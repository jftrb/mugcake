import { Pressable } from "react-native";
import { Control, Controller, useFieldArray, UseFieldArrayRemove } from "react-hook-form";
import { ThemedText } from "@/components/ThemedText";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { ThemedView } from "@/components/ThemedView";
import { randomUUID } from "expo-crypto";
import { RecipeProps } from "../Recipe";
import { Editable } from "./EditableList";
import RemoveButton from "./RemoveButton";
import { editStyles } from "./EditStyles";
import { NoteProps } from "../Notes";

const EditableNote = ({ 
  control, 
  index, 
  field, 
  remove 
} : {
  remove: UseFieldArrayRemove
  control?: Control<RecipeProps>
  index: number
  field: NoteProps
}) => {
  return (
    <Controller
      control={control}
      name={`notes.${index}.value`}
      render={({ field: { onChange, onBlur, value } }) =>
        <ThemedView style={editStyles.contentItemContainer}>
          <ThemedView>
            <RemoveButton style={editStyles.deleteButton} 
              onPress={() => {
                console.log(`Deleting note ${index} [id: ${field.id}]`)
                remove(index)
              }}
            />
          </ThemedView>
          <ThemedTextInput style={editStyles.contentMultiLineEdit} 
            multiline 
            value={value} 
            onChangeText={onChange}
            onBlur={onBlur}/>
        </ThemedView>
      }
    />
  );
};

export default function EditableNotes({ control }: Editable<RecipeProps>){
  const { fields, append, remove } = useFieldArray({
    name: 'notes',
    control
  })  
  return (
    <>
      <ThemedView style={editStyles.contentList}>
        {fields.map((field, index) => 
          <EditableNote key={field.id} {...{ index, field, remove, control }}/>
        )}
        <Pressable 
          onPress={() => {
            console.log('adding note')
            append({value: '', id: randomUUID()})
          }}
          style={editStyles.deleteButtonPressArea}>
          <ThemedText>+ Add</ThemedText>
        </Pressable>
      </ThemedView>
    </>
  )
}