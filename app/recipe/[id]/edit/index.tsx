import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { getLocalStorage } from "@/libraries/localStorage";
import EditScreen from "@/components/recipe/edit/EditScreen";
import NotFoundScreen from "@/app/+not-found";
import { UpdateRecipe } from "@/libraries/mugcakeApi";

export default function RecipeEditScreen() {
  const navigation = useNavigation();
  const { id }: { id: string } = useLocalSearchParams();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const storage = getLocalStorage();

  // TODO : fix onSave not being invoked if New Recipe form isn't modified first
  if (storage.contains(id)) {
    return (
      <EditScreen
        id={id}
        onSave={(data) => {
          UpdateRecipe(Number(id), data);
          router.navigate(`/recipe/${id}`);
        }}
      />
    );
  } else {
    return <NotFoundScreen />;
  }
}
