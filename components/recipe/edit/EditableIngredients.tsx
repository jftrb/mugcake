import { ThemedTextInput } from "@/components/ThemedTextInput";
import { ThemedView } from "@/components/ThemedView";
import { Editable } from "./EditableList";
import RemoveButton from "./RemoveButton";
import { ingredientStyles } from "../Ingredients";
import { IngredientModel } from "@/models/mugcakeApiModels";
import { RecipeModel } from "@/models/mugcakeApiModels";
import {
  Control,
  Controller,
  useFieldArray,
  UseFieldArrayRemove,
} from "react-hook-form";
import { ThemedText } from "@/components/ThemedText";
import { Pressable, StyleProp, TextStyle } from "react-native";
import { editStyles } from "./EditStyles";

// TODO : convert number strings into proper numbers (e.g. user inputs a fraction -> convert to number)
const EditableIngredient = ({
  control,
  sectionIndex,
  index,
  field,
  remove,
}: {
  remove: UseFieldArrayRemove;
  control?: Control<RecipeModel>;
  index: number;
  sectionIndex: number;
  field: IngredientModel;
}) => {
  function controlField(
    name: "quantity" | "unit" | "ingredient" | "other",
    style: StyleProp<TextStyle>
  ) {
    return (
      <Controller
        control={control}
        name={`ingredientSections.${sectionIndex}.ingredients.${index}.${name}`}
        render={({ field: { onChange, onBlur, value } }) => (
          <ThemedTextInput
            style={style}
            value={`${value}`}
            onChangeText={onChange}
            onBlur={onBlur}
          />
        )}
      />
    );
  }

  return (
    <ThemedView style={ingredientStyles.ingredientContainer}>
      <RemoveButton
        style={{ marginRight: 12 }}
        onPress={() => {
          console.log(`Deleting ingredient ${index}`);
          remove(index);
        }}
      />
      {controlField("quantity", {
        width: 40,
        marginRight: 6,
        borderWidth: 0.5,
      })}
      {controlField("unit", { width: 100, marginRight: 6, borderWidth: 0.5 })}
      {controlField("ingredient", { borderWidth: 0.5, flex: 1 })}
    </ThemedView>
  );
};

export default function EditableIngredients({
  control,
  sectionIndex,
}: Editable<RecipeModel> & { sectionIndex: number }) {
  const { fields, append, remove } = useFieldArray({
    name: `ingredientSections.${sectionIndex}.ingredients`,
    control,
  });
  return (
    <ThemedView style={editStyles.contentList}>
      {fields.map((field, index) => (
        <EditableIngredient
          key={field.id}
          {...{ sectionIndex, index, field, remove, control }}
        />
      ))}
      <Pressable
        onPress={() => {
          console.log("Adding ingredient");
          append({ quantity: 1, unit: "", ingredient: "", other: "" });
        }}
        style={editStyles.deleteButtonPressArea}
      >
        <ThemedText>+ Add Ingredient</ThemedText>
      </Pressable>
    </ThemedView>
  );
}

export function addEmptyItem<ItemT>(
  data: ArrayLike<ItemT> | null | undefined,
  createNewItem: () => ItemT
) {
  const list = data === null || data === undefined ? Array<ItemT>() : data;
  const newList = Array<ItemT>(list.length + 1);

  for (let i = 0; i < list.length; i++) {
    newList[i] = list[i];
  }
  newList[newList.length - 1] = createNewItem();

  return newList;
}
