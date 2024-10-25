import { RecipeModel } from "@/models/mugcakeApiModels";
import { useLocalSearchParams, useNavigation } from "expo-router";
import NotFoundScreen from "../../+not-found";
import { useEffect, useSyncExternalStore } from "react";
import { subscribe, getLocalStorage } from "@/libraries/localStorage";
import RecipeScreen from "@/components/recipe/RecipeScreen";

export default function RecipeTabScreen() {
  const navigation = useNavigation();
  const { id }: { id: string } = useLocalSearchParams();
  const recipeId = Number(id);

  useEffect(() => {
    navigation.setOptions({ headerShown: false });

    // Effect cleanup
    return () => {
      console.log(`Cleaning up recipe ${recipeId} from storage`);
      getLocalStorage().delete(recipeId.toString());
    };
  }, [navigation, recipeId]);

  const storage = getLocalStorage();
  const storedRecipe = useSyncExternalStore(subscribe, () => {
    console.log(`Checking if storage key ${id} changed.`);
    return storage.getString(id);
  });

  if (storedRecipe === undefined) {
    return <NotFoundScreen />;
  } else {
    const parsedRecipe: RecipeModel = JSON.parse(storedRecipe);
    return <RecipeScreen recipe={parsedRecipe} />;
  }
}
