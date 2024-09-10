import { StyleSheet } from "react-native";
import { ThemedText } from "../ThemedText";
import { ThemedView, ThemedViewProps } from "../ThemedView";
import { ThemedList } from "../ThemedList";

export interface IngredientProps {
  quantity: number,
  unit: string,
  ingredient: string,
}

function Ingredient({quantity, unit, ingredient} : IngredientProps) {
  return (
  <ThemedView style={styles.ingredientContainer}>
    <ThemedText>
      <input type="checkbox"/> ({quantity}
    </ThemedText>
    <ThemedText style={styles.textContainer}>{unit})</ThemedText>
    <ThemedText style={styles.textContainer}>{ingredient}</ThemedText>
  </ThemedView>
)}

export default function Ingredients({children}: {children: IngredientProps[]}){
  return (
    <ThemedList 
      style={styles.ingredientList}
      data={children}
      renderItem={({item}) => 
        <Ingredient quantity={item.quantity} unit={item.unit} ingredient={item.ingredient}/>
      }
    />
  )
}

const styles = StyleSheet.create({
  ingredientContainer: {
    flexDirection: 'row',
    alignContent: "center"
  },
  ingredientList: {
    rowGap: 4
  },
  textContainer: {
    marginLeft: 4,
  }
})