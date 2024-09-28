import CookingSteps, { CookingStepProps } from "@/components/recipe/CookingSteps";
import Ingredients, { IngredientProps } from "@/components/recipe/Ingredients";
import PrepCard from "@/components/recipe/PrepCard";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Image, StyleSheet } from "react-native";
import { ScrollView } from "react-native";
import Notes, { NoteProps } from "./Notes";
import {ImageButton} from "../ImageButton";
import { Link } from "expo-router";
import { TagProps } from "./Tags";

export type RecipeProps = {
  title: string,
  url: string,
  tags: TagProps[],
  imageSource: string,
  prepInfo: {prepTime: string, cookTime: string, totalTime: string, yield: string},
  ingredients: IngredientProps[],
  directions: CookingStepProps[],
  notes: NoteProps[],
}

// TODO : check to replace FlatList with a .map() to see if I can avoid having the scrollEnabled=false workaround
export default function Recipe({recipeProps}: {recipeProps: RecipeProps}) {
  return (
    <>
      {/* Button Ribbon */}
      <ThemedView style={{height: 48, backgroundColor: 'white', flexDirection: 'row-reverse'}}>
        <Link href={`./edit`} asChild>
          <ImageButton onPress={() => {}}/>
        </Link>
      </ThemedView>
      <ScrollView>
        <ThemedView style={recipeStyles.titleContainer}>
          <ThemedText type="title" style={recipeStyles.title}>{recipeProps.title}</ThemedText>
        </ThemedView>
        <Image 
          style={recipeStyles.image}
          source={{uri: recipeProps.imageSource}}
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
          <ThemedText type="subtitle" style={recipeStyles.directionsTitle}>Ingredients :</ThemedText>
          <ThemedView style={recipeStyles.ingredients}>
            <Ingredients>{recipeProps.ingredients}</Ingredients>
          </ThemedView>

          {/* Cooking Steps */}
          <ThemedText type="subtitle" style={recipeStyles.directionsTitle}>Cooking Steps :</ThemedText>
          <CookingSteps 
            style={recipeStyles.ingredients} 
            data={recipeProps.directions}
          />
        </ThemedView>

        {/* Notes */}
        <ThemedView style={recipeStyles.notesContainer}>
          <Notes>
            {recipeProps.notes}
          </Notes>
        </ThemedView>
      </ScrollView>
    </>
  )
}

const interiorPadding = 8

export const recipeStyles = StyleSheet.create({
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
  editableListsContainers: {
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