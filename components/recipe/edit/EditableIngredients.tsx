import { randomUUID } from "expo-crypto";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { ThemedView } from "@/components/ThemedView";
import { Editable } from "./EditableList";
import RemoveButton from "./RemoveButton";
import { IngredientProps, ingredientStyles } from "../Ingredients";
import { RecipeProps } from "../Recipe";
import { Control, Controller, useFieldArray, UseFieldArrayRemove } from "react-hook-form";
import { ThemedText } from "@/components/ThemedText";
import { Pressable, StyleProp, TextStyle } from "react-native";
import { editStyles } from "./EditStyles";

const EditableIngredient = ({ 
  control, 
  index, 
  field, 
  remove 
} : {
  remove: UseFieldArrayRemove
  control?: Control<RecipeProps>
  index: number
  field: IngredientProps
}) => {
  function controlField(name: "quantity" | "unit" | "ingredient", style: StyleProp<TextStyle>){
    return (
      <Controller
        control={control}
        name={`ingredients.${index}.${name}`}
        render={({ field: { onChange, onBlur, value } }) =>
          <ThemedTextInput style={style} 
            value={`${value}`}
            onChangeText={onChange}
            onBlur={onBlur}
          />
        }
      />
    )
  }

  return (
    <ThemedView style={ingredientStyles.ingredientContainer}>
        <RemoveButton 
          style={{marginRight: 12}} 
          onPress={() => {
            console.log(`Deleting ingredient ${index} [id: ${field.id}]`)
            remove(index)
          }}
        />
        {controlField("quantity", {width: 40, marginRight: 6, borderWidth: .5})}
        {controlField("unit", {width: 100, marginRight: 6, borderWidth: .5})}
        {controlField("ingredient", {borderWidth: .5, flex: 1})}
    </ThemedView>
)}

export default function EditableIngredients({ control }: Editable<RecipeProps>){
  const { fields, append, remove } = useFieldArray({
    name: 'ingredients',
    control
  })  
  return (
    <ThemedView style={editStyles.contentList}>
      {fields.map((field, index) => 
        <EditableIngredient key={field.id} {...{ index, field, remove, control }}/>
      )}
      <Pressable 
        onPress={() => {
          console.log('Adding ingredient')
          append({quantity: 1, unit: "", ingredient: "", id: randomUUID()})
        }}
        style={editStyles.deleteButtonPressArea}>
        <ThemedText>+ Add</ThemedText>
      </Pressable>
    </ThemedView>
  )
}

export function addEmptyItem<ItemT>(data: ArrayLike<ItemT> | null | undefined, createNewItem: () => ItemT) {
  const list = data === null || data === undefined ? Array<ItemT>() : data;
  const newList = Array<ItemT>(list.length + 1);

  for (let i = 0; i < list.length; i++) {
    newList[i] = list[i];
  }
  newList[newList.length - 1] = createNewItem();

  return newList;
}
