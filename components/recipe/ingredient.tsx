import { Button, StyleSheet } from "react-native";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";

type IngredientProps = {
  ingredient: string,
  quantity: number,
  unit: string,
}

export default function Ingredient({ingredient, quantity, unit} : IngredientProps) {
  return (
  <ThemedView style={styles.ingredientContainer}>
    <input type="checkbox"/>
    <ThemedText style={styles.textContainer}>({quantity}</ThemedText>
    <ThemedText style={styles.textContainer}>{unit})</ThemedText>
    <ThemedText style={styles.textContainer}>{ingredient}</ThemedText>
  </ThemedView>
)}

const styles = StyleSheet.create({
  ingredientContainer: {
    flexDirection: 'row',
  },
  textContainer: {
    marginLeft: 4,
  }
})