import CookingSteps, {
  CookingStepProps,
} from "@/components/recipe/CookingSteps";
import PrepCard from "@/components/recipe/PrepCard";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Image, StyleSheet } from "react-native";
import { ScrollView } from "react-native";
import Notes, { NoteProps } from "./Notes";
import { ImageButton } from "../ImageButton";
import { Link } from "expo-router";
import { TagProps } from "./Tags";
import IngredientSections, { IngredientSectionProps } from "./IngredientSection";

export type RecipeProps = {
  id: string;
  title: string;
  url: string;
  tags: TagProps[];
  imageSource: string;
  prepInfo: {
    prepTime: string;
    cookTime: string;
    totalTime: string;
    yield: string;
  };
  ingredients: IngredientSectionProps[];
  directions: CookingStepProps[];
  notes: NoteProps[];
};

// TODO : check to replace FlatList with a .map() to see if I can avoid having the scrollEnabled=false workaround
export default function Recipe({ recipeProps }: { recipeProps: RecipeProps }) {
    return (
    <>
      {/* Button Ribbon */}
      <ThemedView
        style={recipeStyles.ribbon}
      >
        <Link href={`./edit`} asChild>
          <ImageButton
            onPress={() => {}}
            source={require("@/assets/images/edit-icon.png")}
            imageStyle={{ width: 48, backgroundColor: "transparent" }}
            style={recipeStyles.editButton}
          />
        </Link>
      </ThemedView>
      <ScrollView>
        <ThemedView style={recipeStyles.titleContainer}>
          <ThemedText type="title" style={recipeStyles.title}>
            {recipeProps.title}
          </ThemedText>
        </ThemedView>
        <Image
          style={recipeStyles.image}
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
        <ThemedView style={recipeStyles.recipeContainer}>
          {/* Ingredients */}
          <ThemedText type="subtitle" style={recipeStyles.directionsTitle}>
            Ingredients :
          </ThemedText>
          <ThemedView style={recipeStyles.ingredients}>
            <IngredientSections data={recipeProps.ingredients}></IngredientSections>
          </ThemedView>

          {/* Cooking Steps */}
          <ThemedText type="subtitle" style={recipeStyles.directionsTitle}>
            Cooking Steps :
          </ThemedText>
          <CookingSteps
            style={recipeStyles.ingredients}
            data={recipeProps.directions}
          />
        </ThemedView>

        {/* Notes */}
        <ThemedView style={recipeStyles.notesContainer}>
          <Notes>{recipeProps.notes}</Notes>
        </ThemedView>
      </ScrollView>
    </>
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
    marginBottom: 8,
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
    gap: 8,
    marginLeft: interiorPadding / 2,
  },
});
