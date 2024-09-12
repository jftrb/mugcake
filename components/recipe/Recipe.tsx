import CookingSteps from "@/components/recipe/CookingSteps";
import Ingredients, { IngredientProps } from "@/components/recipe/Ingredients";
import PrepCard from "@/components/recipe/PrepCard";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Image, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Notes from "./Notes";

type RecipeProps = {
    title: string,
    imageSource: string,
    prepInfo: {prepTime: string, cookTime: string, totalTime: string, yield: string},
    ingredients: IngredientProps[],
    directions: string[],
    notes: string[],
}

export default function Recipe({title, imageSource, prepInfo, ingredients, directions, notes}: RecipeProps) {
  return (
    <ScrollView>
    <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={styles.title}>{title}</ThemedText>
    </ThemedView>
    <Image 
      style={styles.image}
      source={{uri: imageSource}}
    />
    <ThemedView style={styles.prepCardsContainer}>
        <PrepCard style={styles.prepCard} label="Prep Time" value={prepInfo.prepTime}/>
        <PrepCard style={styles.prepCard} label="Cook Time" value={prepInfo.cookTime}/>
        <PrepCard style={styles.prepCard} label="Total Time" value={prepInfo.totalTime}/>
        <PrepCard style={styles.prepCard} label="Portions" value={prepInfo.yield}/>
    </ThemedView>
    <ThemedView style={styles.recipeContainer}>
        <ThemedText type="subtitle" style={styles.directionsTitle}>Ingredients :</ThemedText>
        <ThemedView style={styles.ingredients}>
          <Ingredients>{ingredients}</Ingredients>
        </ThemedView>
        <ThemedText type="subtitle" style={styles.directionsTitle}>Cooking Steps :</ThemedText>
        <CookingSteps style={styles.ingredients}>{directions}</CookingSteps>
    </ThemedView>
    <ThemedView style={styles.notesContainer}>
      <Notes>{notes}</Notes>
    </ThemedView>
    </ScrollView>
  )
}

const interiorPadding = 8

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  image: {
    alignSelf: 'center',
    aspectRatio: 1,
    width: '50%',
  },
  titleContainer: {
    gap: 8,
    marginBottom: 8,
  },
  title: {
    textAlign: "center",
  },
  prepCardsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    columnGap: 16,
    margin: 8,
  },
  prepCard: {
  },
  recipeContainer: {
    gap: 8,
    marginBottom: 8,
  },
  ingredients: {
    marginLeft: interiorPadding,
    marginRight: interiorPadding,
  },
  directionsTitle: {
    paddingTop: 4,
  },
  notesContainer: {
    gap: 8,
    marginLeft: interiorPadding/2,
  },
});