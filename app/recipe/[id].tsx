import { recipesTable } from "@/assets/placeholders/recipe";
import Recipe from "@/components/recipe/Recipe";
import { ThemedView } from "@/components/ThemedView";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { StyleSheet } from "react-native";
import NotFoundScreen from "../+not-found";
import { useEffect } from "react";
import RecipeEdit from "@/components/recipe/edit/RecipeEdit";

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
    return (
      <ThemedView style={styles.container}>
        <RecipeEdit recipeProps={recipe}/>
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