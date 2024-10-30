import { StyleSheet } from "react-native";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { ThemedList } from "../ThemedList";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { IngredientModel } from "@/models/mugcakeApiModels";
import { toFraction } from "@/libraries/fractions";

function Ingredient({ quantity, unit, ingredient, other }: IngredientModel) {
  return (
    <ThemedView style={ingredientStyles.ingredientContainer}>
      <BouncyCheckbox
        textComponent={
          <ThemedText style={ingredientStyles.textContainer}>
            {parseIngredient(quantity, unit, ingredient)}
          </ThemedText>
        }
        textStyle={{ textDecorationLine: "none", color: "red" }}
      />
    </ThemedView>
  );
}

function parseIngredient(quantity: number, unit: string, ingredient: string) {
  if (quantity === 0) return ingredient;

  const fractionedQuantity =
    quantity < 1 && quantity > 0 ? toFraction(quantity, 0.1) : quantity;
  if (unit === "") return `${fractionedQuantity} ${ingredient}`;
  return `(${fractionedQuantity} ${unit}) ${ingredient}`;
}

export default function Ingredients({
  children,
}: {
  children: IngredientModel[];
}) {
  return (
    <ThemedList
      style={ingredientStyles.ingredientList}
      scrollEnabled={false}
      data={children}
      renderItem={({ item }) => <Ingredient {...item} />}
    />
  );
}

export const ingredientStyles = StyleSheet.create({
  ingredientContainer: {
    flexDirection: "row",
    alignContent: "center",
    marginTop: 6,
  },
  ingredientList: {
    rowGap: 6,
  },
  textContainer: {
    marginLeft: 8,
    paddingBottom: 4,
    marginTop: -2,
  },
});
