import { StyleSheet } from "react-native";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { ThemedList } from "../ThemedList";
import Ingredients from "./Ingredients";
import { IngredientSectionModel } from "@/models/mugcakeApiModels";

function IngredientSection({ header, ingredients }: IngredientSectionModel) {
  return (
    <ThemedView style={{}}>
      {header === undefined || header.length === 0 ? null : (
        <ThemedText type="subsubtitle" style={{ marginLeft: 0 }}>
          {header}
        </ThemedText>
      )}
      <Ingredients>{ingredients}</Ingredients>
    </ThemedView>
  );
}

export default function IngredientSections({
  data,
}: {
  data: IngredientSectionModel[];
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
