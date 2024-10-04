import Recipe, { RecipeProps } from "@/components/recipe/Recipe";
import { ThemedView } from "@/components/ThemedView";
import { Link } from "expo-router";
import { Pressable, SafeAreaView, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { recipeScreenStyles, ribbonIconSize } from "./RecipeScreen";
import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { getLocalStorage } from "@/libraries/localStorage";
import { ThemedText } from "../ThemedText";

export default function RecipeScreen() {
  const navigation = useNavigation();
  const storage = getLocalStorage();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
    return () => {
      console.log("Removing Preview from storage.");
      storage.delete("preview");
    };
  }, [navigation, storage]);

  const recipeJSON = storage.getString("preview") as string;
  const recipe: RecipeProps = JSON.parse(recipeJSON);

  return (
    <SafeAreaView style={recipeScreenStyles.safeArea}>
      {/* Button Ribbon */}
      <ThemedView style={[recipeScreenStyles.ribbon, { flexDirection: "row" }]}>
        <ThemedText
          type="subtitle"
          style={{
            color: "black",
            flex: 1,
            textAlign: "center",
            position: "absolute",
            width: "100%",
          }}
        >
          Preview
        </ThemedText>
        <Link href={`../`} asChild>
          <Pressable style={recipeScreenStyles.editButton}>
            <Ionicons name="arrow-back" size={ribbonIconSize} />
          </Pressable>
        </Link>
      </ThemedView>

      <ThemedView style={recipeScreenStyles.container}>
        <Recipe recipeProps={recipe} />
      </ThemedView>
    </SafeAreaView>
  );
}

export const previewScreenStyles = StyleSheet.create({});
