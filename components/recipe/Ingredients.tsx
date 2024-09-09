import { StyleSheet } from "react-native";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { ThemedList } from "../ThemedList";

export interface IngredientProps {
  quantity: number,
  unit: string,
  ingredient: string,
}

function Ingredient({quantity, unit, ingredient} : IngredientProps) {
  return (
  <ThemedView style={styles.ingredientContainer}>
    <input type="checkbox"/>
    <ThemedText style={styles.textContainer}>({quantity}</ThemedText>
    <ThemedText style={styles.textContainer}>{unit})</ThemedText>
    <ThemedText style={styles.textContainer}>{ingredient}</ThemedText>
  </ThemedView>
)}

export default function Ingredients({children}: {children: IngredientProps[]}){
  return (
    <ThemedView>
      <ThemedList 
        data={children}
        renderItem={({item}) => 
          <Ingredient quantity={item.quantity} unit={item.unit} ingredient={item.ingredient}/>
        }
      />
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  ingredientContainer: {
    flexDirection: 'row',
  },
  textContainer: {
    marginLeft: 4,
  }
})