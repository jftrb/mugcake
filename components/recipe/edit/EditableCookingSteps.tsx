import { Pressable } from "react-native";
import { Control, Controller, useFieldArray, UseFieldArrayRemove } from "react-hook-form";
import { ThemedText } from "@/components/ThemedText";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { ThemedView } from "@/components/ThemedView";
import { randomUUID } from "expo-crypto";
import { RecipeProps } from "../Recipe";
import { Editable } from "./EditableList";
import RemoveButton from "./RemoveButton";
import { CookingStepProps } from "../CookingSteps";
import { editStyles } from "./EditStyles";

const EditableCookingStep = ({ 
  control, 
  index, 
  field, 
  remove 
} : {
  remove: UseFieldArrayRemove
  control?: Control<RecipeProps>
  index: number
  field: CookingStepProps
}) => {
  return (
    <Controller
      control={control}
      name={`directions.${index}.value`}
      render={({ field: { onChange, onBlur, value } }) =>
        <ThemedView style={editStyles.contentItemContainer}>
          <ThemedView>
            <RemoveButton style={editStyles.deleteButton} 
              onPress={() => {
                console.log(`Deleting cooking step ${index} [id: ${field.id}]`)
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

export default function EditableCookingSteps({ control }: Editable<RecipeProps>){
  const { fields, append, remove } = useFieldArray({
    name: 'directions',
    control
  })  
  return (
    <>
      <ThemedView style={editStyles.contentList}>
        {fields.map((field, index) => 
          <EditableCookingStep key={field.id} {...{ index, field, remove, control }}/>
        )}
        <Pressable 
          onPress={() => {
            console.log('adding cooking step')
            append({value: '', id: randomUUID()})
          }}
          style={editStyles.deleteButtonPressArea}>
          <ThemedText>+ Add</ThemedText>
        </Pressable>
      </ThemedView>
    </>
  )
}