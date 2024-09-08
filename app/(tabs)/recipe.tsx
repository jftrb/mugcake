import ParallaxScrollView from "@/components/ParallaxScrollView";
import Ingredient from "@/components/recipe/Ingredient";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function RecipeScreen() {
  return (
    <ThemedView style={styles.container}>
      <ScrollView>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Welcome to the recipe screen!</ThemedText>
        </ThemedView>
        <ThemedView style={styles.recipeContainer}>
          <ThemedText>Ingredients :</ThemedText>
          <Ingredient quantity={0.25} unit={"c. à soupe"} ingredient="de farine"></Ingredient>
          <Ingredient quantity={0.25} unit={"c. à soupe"} ingredient="de farine"></Ingredient>
          <Ingredient quantity={0.25} unit={"c. à soupe"} ingredient="de farine"></Ingredient>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    gap: 8,
    marginBottom: 8,
  },
  recipeContainer: {
    gap: 8,
    marginBottom: 8,
  },
});