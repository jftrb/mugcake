import { recipesTable } from "@/assets/placeholders/recipe";
import Recipe from "@/components/recipe/Recipe";
import { ThemedView } from "@/components/ThemedView";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { StyleSheet } from "react-native";
import NotFoundScreen from "../+not-found";
import { useEffect } from "react";
import { randomUUID } from "expo-crypto";

function addIdProp<T>(array: T[]) {
  const output: (T & {id: string})[] = []
  array.forEach(element => {
    const newElement = {...element, id: randomUUID()}
    output.push(newElement)
  });
  
  return output;
}

export default function RecipeTabScreen() {
  const navigation = useNavigation()
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);


  const { id } = useLocalSearchParams();
  const recipe = recipesTable.find((recipe) => recipe.id === id)

  if (recipe === undefined) {
    return <NotFoundScreen/>
  }
  else {
    const recipeWithIds = {
      id: recipe.id,
      url: recipe.url,
      imageSource: recipe.imageSource,
      prepInfo: recipe.prepInfo,
      tags: recipe.tags,
      title: recipe.title,
      
      ingredients: addIdProp(recipe.ingredients),
      directions: addIdProp(recipe.directions),
      notes: addIdProp(recipe.notes),
    }

    return (
      <ThemedView style={styles.container}>
        <Recipe editable={false} recipeProps={recipeWithIds}/>
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