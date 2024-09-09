import CookingSteps from "@/components/recipe/CookingSteps";
import Ingredients, { IngredientProps } from "@/components/recipe/Ingredients";
import PrepCard from "@/components/recipe/PrepCard";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

type RecipeProps = {
    title: string,
    prepInfo: {prepTime: string, cookTime: string, totalTime: string, yield: string},
    ingredients: IngredientProps[],
    directions: string[],
    notes: string[],
}

export default function Recipe({title, prepInfo, ingredients, directions, notes}: RecipeProps) {
  return (
    <ScrollView>
    <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={styles.title}>{title}</ThemedText>
    </ThemedView>
    <ThemedView style={styles.prepCardsContainer}>
        <PrepCard style={styles.prepCard} label="Prep Time" value={prepInfo.prepTime}/>
        <PrepCard style={styles.prepCard} label="Cook Time" value={prepInfo.cookTime}/>
        <PrepCard style={styles.prepCard} label="Total Time" value={prepInfo.totalTime}/>
        <PrepCard style={styles.prepCard} label="Portions" value={prepInfo.yield}/>
    </ThemedView>
    <ThemedView style={styles.recipeContainer}>
        <ThemedText type="subtitle" style={styles.directionsTitle}>Ingredients :</ThemedText>
        <Ingredients>{ingredients}</Ingredients>
        <ThemedText type="subtitle" style={styles.directionsTitle}>Cooking Steps :</ThemedText>
        <CookingSteps>{directions}</CookingSteps>
    </ThemedView>
    <ThemedView style={styles.recipeContainer}>
        <ThemedText style={styles.note}>* you should avoid putting nuts</ThemedText>
    </ThemedView>
    </ScrollView>
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
  title: {
    textAlign: "center",
  },
  recipeContainer: {
    gap: 8,
    marginBottom: 8,
  },
  directionsTitle: {
    paddingTop: 4,
  },
  notesContainer: {
    gap: 8,
  },
  note: {
    fontWeight: "200",
    fontStyle: "italic",
  },
  prepCardsContainer: {
    flexDirection: "row",
  },
  prepCard: {
    margin: 8,
  },
});