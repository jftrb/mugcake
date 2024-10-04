import EditScreen from "@/components/recipe/edit/EditScreen";
import { useNavigation } from "expo-router";
import { useEffect } from "react";

export default function RecipeEditScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return <EditScreen id={"new"} />;
}
