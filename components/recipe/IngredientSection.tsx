import { StyleSheet } from "react-native";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { ThemedList } from "../ThemedList";
import Ingredients, { IngredientProps } from "./Ingredients";

export interface IngredientSectionProps {
  header: string;
  ingredients: IngredientProps[];
}

function IngredientSection({ header, ingredients }: IngredientSectionProps) {
  return (
    <ThemedView style={{}}>
      {header.length > 0 ? (
        <ThemedText type="subsubtitle" style={{marginLeft: 0}}>{header}</ThemedText>
      ) : null}
      <Ingredients>{ingredients}</Ingredients>
    </ThemedView>
  );
}

export default function IngredientSections({
  data,
}: {
  data: IngredientSectionProps[];
}) {
  let i = 0;
  return (
    <ThemedList
      style={ingredientStyles.ingredientList}
      scrollEnabled={false}
      data={data.map((section) => {
        return { id: i++, ...section };
      })}
      renderItem={({ item }) => <IngredientSection {...item} />}
    />
  );
}

export const ingredientStyles = StyleSheet.create({
  ingredientContainer: {
    flexDirection: "row",
    alignContent: "center",
  },
  ingredientList: {
    rowGap: 6,
  },
});
