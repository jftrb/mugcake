import { StyleSheet } from "react-native";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { ThemedList } from "../ThemedList";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import RemoveButton from "./edit/RemoveButton";
import { ThemedTextInput } from "../ThemedTextInput";
import EditableList, { Editable } from "./edit/EditableList";
import { useState } from "react";
import { randomUUID } from "expo-crypto";

export interface IngredientProps {
  id: string
  quantity: number,
  unit: string,
  ingredient: string,
}

function Ingredient({quantity, unit, ingredient, id, onDeletePress, editable} : IngredientProps & Editable) {
  return (
    <ThemedView style={styles.ingredientContainer}>
      {editable ? 
        <>
          <RemoveButton style={{marginRight: 12}} onPress={() => onDeletePress(id)}/>
          <ThemedTextInput style={{width: 40, marginRight: 6, borderWidth: .5}} defaultValue={`${quantity}`}/>
          <ThemedTextInput style={{width: 100, marginRight: 6, borderWidth: .5}} defaultValue={`${unit}`}/>
          <ThemedTextInput style={{borderWidth: .5, flex: 1}} defaultValue={`${ingredient}`}/>
        </> :
        <BouncyCheckbox 
          textComponent={
            <ThemedText style={styles.textContainer}>{`(${quantity} ${unit}) ${ingredient}`}</ThemedText>
          } 
          textStyle={{textDecorationLine: "none", color: 'red'}}
        />
      }
    </ThemedView>
)}

export default function Ingredients({children, editable}: {children: IngredientProps[], editable?: boolean}){
  const [ingredients, setIngredients] = useState(children)

  function createChildComponent(item: IngredientProps) {
    return (
      <Ingredient 
        {...item}
        editable={editable}
        onDeletePress={(id) => {
          console.log(`deleting ingredient ${id}`)
          const newIngredients = ingredients.filter(i => i.id !== id)
          setIngredients(newIngredients)
        }}
      />)
  }

  if (editable) {
    return (
      <EditableList
        style={[styles.ingredientList, {marginBottom: 6}]}
        scrollEnabled={false}
        data={ingredients}
        renderItem={({item}) => createChildComponent(item)}
        onPress={() => {
          console.log('adding ingredient')
          ingredients.push({quantity: 1, unit: '', ingredient: '', id: randomUUID()});
          setIngredients(ingredients.concat([]));
        }}
      />)
  } else {
    return (
      <ThemedList 
        style={styles.ingredientList}
        scrollEnabled={false}
        data={ingredients}
        renderItem={({item}) => createChildComponent(item)}
      />)
  }
}

const styles = StyleSheet.create({
  ingredientContainer: {
    flexDirection: 'row',
    alignContent: "center"
  },
  ingredientList: {
    rowGap: 6
  },
  textContainer: {
    marginLeft: 8, 
    paddingBottom: 4, 
    marginTop: -2
  }
})
export function addEmptyItem<ItemT>(data: ArrayLike<ItemT> | null | undefined, createNewItem: () => ItemT) {
  const list = data === null || data === undefined ? Array<ItemT>() : data;
  const newList = Array<ItemT>(list.length + 1);

  for (let i = 0; i < list.length; i++) {
    newList[i] = list[i];
  }
  newList[newList.length - 1] = createNewItem();

  return newList;
}
