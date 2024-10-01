import { ThemedView } from "@/components/ThemedView";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Platform, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import NotFoundScreen from "../+not-found";
import { useEffect } from "react";
import { randomUUID } from "expo-crypto";
import EditableRecipe from "@/components/recipe/edit/EditableRecipe";
import { getLocalStorage } from "@/hooks/useLocalStorage";
import { RecipeProps } from "@/components/recipe/Recipe";

function addIdProp<T>(array: T[]) {
  const output: (T & { id: string })[] = [];
  array.forEach((element) => {
    const newElement = { ...element, id: randomUUID() };
    output.push(newElement);
  });

  return output;
}

export default function RecipeEditScreen() {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const { id } = useLocalSearchParams();
  const recipe: RecipeProps = getRecipe(id);

  if (recipe === undefined) {
    return <NotFoundScreen />;
  } else {
    const recipeWithIds = {
      id: recipe.id,
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
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.container}>
          <EditableRecipe recipeProps={recipeWithIds} />
        </ThemedView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    paddingTop: 0,
  },
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

function getRecipe(id: string | string[]) {
  const storage = getLocalStorage();
  const recipeJSON = storage.getString(id as string) as string;
  const recipe: RecipeProps = JSON.parse(recipeJSON);
  return recipe;
}
