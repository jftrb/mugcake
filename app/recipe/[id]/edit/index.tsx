import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { getLocalStorage } from "@/libraries/localStorage";
import EditScreen from "@/components/recipe/edit/EditScreen";
import NotFoundScreen from "@/app/+not-found";

export default function RecipeEditScreen() {
  const navigation = useNavigation();
  const { id }: { id: string } = useLocalSearchParams();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const storage = getLocalStorage();

  if (storage.contains(id)) {
    return <EditScreen id={id} />;
  } else {
    return <NotFoundScreen />;
  }
}
