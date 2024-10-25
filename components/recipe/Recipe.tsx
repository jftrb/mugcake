import CookingSteps from "@/components/recipe/CookingSteps";
import PrepCard from "@/components/recipe/PrepCard";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Image, StyleSheet } from "react-native";
import { ScrollView } from "react-native";
import Notes from "./Notes";
import IngredientSections from "./IngredientSection";
import { RecipeModel } from "@/models/mugcakeApiModels";

// TODO : check to replace FlatList with a .map() to see if I can avoid having the scrollEnabled=false workaround
export default function Recipe({ recipeProps }: { recipeProps: RecipeModel }) {
  return (
    <ScrollView
      contentContainerStyle={{
        maxWidth: 1200,
        alignSelf: "center",
        marginTop: 4,
      }}
    >
      <ThemedView style={recipeStyles.titleContainer}>
        <ThemedText type="title" style={recipeStyles.title}>
          {recipeProps.title}
        </ThemedText>
      </ThemedView>
      <Image
        style={[recipeStyles.image]}
        source={{ uri: recipeProps.imageSource }}
      />
      {/* Recipe Prep Cards */}
      <ThemedView style={recipeStyles.prepCardsContainer}>
        <PrepCard
          style={recipeStyles.prepCard}
          label="Prep Time"
          value={recipeProps.prepInfo.prepTime}
        />
        <PrepCard
          style={recipeStyles.prepCard}
          label="Cook Time"
          value={recipeProps.prepInfo.cookTime}
        />
        <PrepCard
          style={recipeStyles.prepCard}
          label="Total Time"
          value={recipeProps.prepInfo.totalTime}
        />
        <PrepCard
          style={recipeStyles.prepCard}
          label="Portions"
          value={recipeProps.prepInfo.yield}
        />
      </ThemedView>
      <ThemedView>
        <ThemedView style={recipeStyles.recipeContainer}>
          {/* Ingredients */}
          <ThemedText type="subtitle" style={recipeStyles.directionsTitle}>
            Ingredients :
          </ThemedText>
          <ThemedView style={recipeStyles.ingredients}>
            <IngredientSections data={recipeProps.ingredientSections} />
          </ThemedView>

          {/* Cooking Steps */}
          <ThemedText type="subtitle" style={recipeStyles.directionsTitle}>
            Cooking Steps :
          </ThemedText>
          <CookingSteps
            style={recipeStyles.ingredients}
            data={recipeProps.directions}
          />

          {/* Notes */}
          <Notes style={recipeStyles.notesContainer} data={recipeProps.notes} />
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

const interiorPadding = 8;

export const recipeStyles = StyleSheet.create({
  ribbon: {
    height: 48,
    backgroundColor: "#eeeeee",
    flexDirection: "row-reverse",
    borderBottomWidth: 0.5,
  },
  editButton: {
    padding: 2,
    borderWidth: 0,
    backgroundColor: "transparent",
  },
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  image: {
    alignSelf: "center",
    aspectRatio: 1,
    width: "50%",
    elevation: 40,
    shadowColor: "#999999",
    maxWidth: 400,
  },
  titleContainer: {
    gap: 8,
    marginBottom: 8,
    marginTop: 4,
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
  prepCard: {},
  recipeContainer: {
    gap: 8,
  },
  ingredients: {
    paddingLeft: interiorPadding,
    marginRight: interiorPadding,
  },
  editableListsContainers: {
    marginRight: interiorPadding,
  },
  directionsTitle: {
    paddingTop: 4,
  },
  notesContainer: {
    marginLeft: interiorPadding / 2,
  },
});
