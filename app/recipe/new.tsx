import { ThemedView } from "@/components/ThemedView";
import { useNavigation } from "expo-router";
import { SafeAreaView } from "react-native";
import { useEffect } from "react";
import EditableRecipe from "@/components/recipe/edit/EditableRecipe";
import { RecipeProps } from "@/components/recipe/Recipe";
import { editStyles } from "./[id]/edit";
import { getLocalStorage } from "@/libraries/localStorage";
import { addIdProp } from "./[id]";

export default function RecipeEditScreen() {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const storage = getLocalStorage()
  const recipeJSON = storage.getString('new') as string
  const recipeParsed = JSON.parse(recipeJSON)
  console.log(`Recipe as parsed from storage:`)
  console.log(recipeParsed)

  const recipe = recipeParsed as RecipeProps
  const recipeWithIds = {
    id: 'new',
    url: recipe.url,
    imageSource: recipe.imageSource,
    prepInfo: recipe.prepInfo,
    title: recipe.title,

    tags: addIdProp(recipe.tags),
    ingredients: addIdProp(recipe.ingredients),
    directions: addIdProp(recipe.directions),
    notes: addIdProp(recipe.notes),
  };

  return (
    <SafeAreaView style={editStyles.safeArea}>
      <ThemedView style={editStyles.container}>
        <EditableRecipe recipeProps={recipeWithIds} />
      </ThemedView>
    </SafeAreaView>
  );
}