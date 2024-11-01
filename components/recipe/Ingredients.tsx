import { StyleSheet } from "react-native";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { ThemedList } from "../ThemedList";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { IngredientModel } from "@/models/mugcakeApiModels";
import { parseQuantity } from "@/libraries/geminiParsers";

function Ingredient({ quantity, unit, ingredient, other }: IngredientModel) {
  const formattedIngredient = formatIngredient(quantity, unit, ingredient)

  return (
    <ThemedView style={ingredientStyles.ingredientContainer}>
      <BouncyCheckbox
        textComponent={
          <ThemedText style={ingredientStyles.textContainer}>
            {formattedIngredient}
          </ThemedText>
        }
        textStyle={{ textDecorationLine: "none", color: "red" }}
      />
    </ThemedView>
  );
}

function formatIngredient(quantity: string, unit: string, ingredient: string): string {
  const quant = parseQuantity(quantity)
  if (quant === 0) return ingredient;

  if (unit === "") return `${quantity} ${ingredient}`;
  return `(${quantity} ${unit}) ${ingredient}`;
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
