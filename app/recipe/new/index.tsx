import EditScreen from "@/components/recipe/edit/EditScreen";
import { PreLoadRecipe } from "@/components/search/RecipeCard";
import { PostRecipe } from "@/libraries/mugcakeApi";
import { RecipeModel } from "@/models/mugcakeApiModels";
import { router, useNavigation } from "expo-router";
import { useEffect } from "react";

export default function RecipeEditScreen() {
  const navigation = useNavigation();


  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  async function Send(data: RecipeModel) {
    const id = await PostRecipe(data);
    console.log(`Added new recipe with ID ${id}`);
    await PreLoadRecipe(id);
    router.replace(`/recipe/${id}`);
  }

  return (
    <EditScreen
      id={"new"}
      onSave={(data) => {
        console.log("Saving new recipe");
        Send(data);
      }}
      alwaysDirty
    />
  );
}
