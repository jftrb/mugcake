import Recipe, { RecipeProps } from "@/components/recipe/Recipe";
import { ThemedView } from "@/components/ThemedView";
import { Link } from "expo-router";
import {
  Platform,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";

export default function RecipeScreen({ recipe }: { recipe: RecipeProps }) {
  return (
    <SafeAreaView style={recipeScreenStyles.safeArea}>
      {/* Button Ribbon */}
      <ThemedView style={recipeScreenStyles.ribbon}>
        <Link href={`./edit`} asChild>
          <Pressable style={recipeScreenStyles.editButton}>
            <Feather name="edit" size={ribbonIconSize} />
          </Pressable>
        </Link>
        
        <ThemedView style={{flex: 1}}/>
        <Link href={`../`} asChild>
          <Pressable style={recipeScreenStyles.backButton}>
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

export const ribbonIconSize = 32;

export const recipeScreenStyles = StyleSheet.create({
  ribbon: {
    height: 48,
    backgroundColor: "#eeeeee",
    flexDirection: "row-reverse",
    borderBottomWidth: 0.5,
    gap: 6,
    paddingHorizontal: 6,
    alignItems: "center",
  },
  editButton: {
    padding: 2,
    borderWidth: 0.5,
    backgroundColor: "#dddddd",
    borderRadius: 4,
    width: 40,
    alignItems: 'center'
  },
  backButton: {
    padding: 2,
    borderWidth: 0,
    backgroundColor: "transparent",
    borderRadius: 4,
    width: 40,
    alignItems: 'center',
  },
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
