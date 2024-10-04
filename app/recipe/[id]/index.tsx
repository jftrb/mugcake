import { recipesTable } from "@/assets/placeholders/recipe";
import { RecipeProps } from "@/components/recipe/Recipe";
import { useLocalSearchParams, useNavigation } from "expo-router";
import NotFoundScreen from "../../+not-found";
import { useEffect, useSyncExternalStore } from "react";
import { randomUUID } from "expo-crypto";
import { subscribe, getLocalStorage } from "@/libraries/localStorage";
import RecipeScreen from "@/components/recipe/RecipeScreen";

export function addIdProp<T>(array: T[]) {
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
      getLocalStorage().delete(id);
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
      <RecipeScreen recipe={parsedRecipe}/>
    );
  }
}

function initStorage(recipe: any) {
  const recipeWithIds = {
    id: recipe.id,
    url: recipe.url,
    imageSource: recipe.imageSource,
    prepInfo: recipe.prepInfo,
    title: recipe.title,

    ingredients: [
      {
        header: "Head",
        ingredients: addIdProp(recipe.ingredients),
      },
    ],
    tags: addIdProp(recipe.tags),
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
