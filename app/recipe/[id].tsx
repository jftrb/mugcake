import { recipesTable } from "@/assets/placeholders/recipe";
import Recipe from "@/components/recipe/Recipe";
import { ThemedView } from "@/components/ThemedView";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet } from "react-native";
import NotFoundScreen from "../+not-found";

export default function RecipeTabScreen() {
  const { id } = useLocalSearchParams();
  const recipe = recipesTable.find((recipe) => recipe.id == id)
  if (recipe == undefined) {
    return <NotFoundScreen/>
  }
  else {

    return (
      <ThemedView style={styles.container}>
        <Recipe 
            title={recipe.title}
            imageSource={recipe.imageSource}
            prepInfo={recipe.prepInfo}
            ingredients={recipe.ingredients}
            directions={recipe.directions}
            notes={recipe.notes}/>
      </ThemedView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12
  },
});