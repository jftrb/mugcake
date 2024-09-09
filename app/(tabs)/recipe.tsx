import { mugcakeRecipe } from "@/assets/placeholders/recipe";
import Recipe from "@/components/recipe/recipe";
import { ThemedView } from "@/components/ThemedView";
import { StyleSheet } from "react-native";

export default function RecipeScreen() {
  const ricardoExample = mugcakeRecipe

  return (
    <ThemedView style={styles.container}>
      <Recipe 
        title={ricardoExample.title}
        prepInfo={ricardoExample.prepInfo}
        ingredients={ricardoExample.ingredients}
        directions={ricardoExample.directions}
        notes={ricardoExample.notes}/>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});