import { recipesTable } from "@/assets/placeholders/recipe";
import Recipe, { RecipeProps } from "@/components/recipe/Recipe";
import { ThemedView } from "@/components/ThemedView";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Platform, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import NotFoundScreen from "../../+not-found";
import { useEffect, useSyncExternalStore } from "react";
import { randomUUID } from "expo-crypto";
import { subscribe, getLocalStorage } from "@/hooks/useLocalStorage";

function addIdProp<T>(array: T[]) {
  const output: (T & { id: string })[] = [];
  array.forEach((element) => {
    const newElement = { ...element, id: randomUUID() };
    output.push(newElement);
  });

  return output;
}

export default function RecipeTabScreen() {
  const navigation = useNavigation();
  const { id }: { id: string } = useLocalSearchParams();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
    
    // Effect cleanup
    return () => {
      console.log(`Cleaning up recipe ${id} from storage`);
      getLocalStorage().delete(id)
    };
  }, [navigation, id]);

  const recipe = recipesTable.find((recipe) => recipe.id === id);
  if (recipe !== undefined) {
    initStorage(recipe);
  }

  const storage = getLocalStorage();
  const storedRecipe = useSyncExternalStore(subscribe, () => {
    console.log(`Checking if storage key ${id} changed.`);
    return storage.getString(id);
  });

  if (storedRecipe === undefined) {
    return <NotFoundScreen />;
  } else {
    const parsedRecipe: RecipeProps = JSON.parse(storedRecipe);
    return (
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.container}>
          <Recipe recipeProps={parsedRecipe} />
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

function initStorage(recipe: any) {
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

  const storage = getLocalStorage();
  if (!storage.contains(recipeWithIds.id)) {
    console.log(`Initializing storage for recipe id : ${recipeWithIds.id}`);
    storage.set(recipeWithIds.id, JSON.stringify(recipeWithIds));
  }

  return storage;
}
