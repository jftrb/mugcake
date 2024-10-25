import { Pressable, StyleSheet } from "react-native";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import {
  UseFieldArrayRemove,
  Control,
  Controller,
  useFieldArray,
} from "react-hook-form";
import { IngredientSectionModel } from "@/models/mugcakeApiModels";
import { RecipeModel } from "@/models/mugcakeApiModels";
import RemoveButton from "./RemoveButton";
import { editStyles } from "./EditStyles";
import { Editable } from "./EditableList";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import EditableIngredients from "./EditableIngredients";

const EditableIngredientSection = ({
  control,
  index,
  field,
  remove: removeSection,
}: {
  remove: UseFieldArrayRemove;
  control?: Control<RecipeModel>;
  index: number;
  field: IngredientSectionModel;
}) => {
  return (
    <>
      <ThemedView style={ingredientStyles.sectionHeaderContainer}>
        <RemoveButton
          style={{ marginRight: 12 }}
          onPress={() => {
            console.log(
              `Deleting ingredient section ${index} [id: ${field.header}]`
            );
            removeSection(index);
          }}
        />
        <Controller
          control={control}
          name={`ingredientSections.${index}.header`}
          render={({ field: { onChange, onBlur, value } }) => (
            <ThemedTextInput
              type="defaultSemiBold"
              style={{ flex: 1, borderWidth: 0.5, textAlignVertical: "center" }}
              value={`${value}`}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />
      </ThemedView>
      <ThemedView style={ingredientStyles.ingredientList}>
        <EditableIngredients control={control} sectionIndex={index} />
      </ThemedView>
    </>
  );
};

export default function EditableIngredientSections({
  control,
}: Editable<RecipeModel>) {
  const { fields, append, remove } = useFieldArray({
    name: "ingredientSections",
    control,
  });
  return (
    <ThemedView style={editStyles.contentList}>
      {fields.map((field, index) => (
        <EditableIngredientSection
          key={index}
          {...{ index, field, remove, control }}
        />
      ))}
      <Pressable
        onPress={() => {
          console.log("Adding ingredient section");
          append({ header: "", ingredients: [] });
        }}
        style={editStyles.deleteButtonPressArea}
      >
        <ThemedText type="defaultSemiBold">+ Add Section</ThemedText>
      </Pressable>
    </ThemedView>
  );
}

export const ingredientStyles = StyleSheet.create({
  sectionHeaderContainer: {
    flexDirection: "row",
  },
  ingredientContainer: {},
  ingredientList: {
    marginLeft: 16,
    rowGap: 6,
  },
});
