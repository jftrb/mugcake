import CookingSteps, { StepProps } from "@/components/recipe/CookingSteps";
import Ingredients, { IngredientProps } from "@/components/recipe/Ingredients";
import PrepCard from "@/components/recipe/PrepCard";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Image, StyleSheet } from "react-native";
import { ScrollView } from "react-native";
import Notes, { NoteProps } from "./Notes";
import { ThemedTextInput } from "../ThemedTextInput";
import EditableTags from "./edit/EditableTags";

export type RecipeProps = {
  recipeProps: {
    title: string,
    url: string,
    tags: string[],
    imageSource: string,
    prepInfo: {prepTime: string, cookTime: string, totalTime: string, yield: string},
    ingredients: IngredientProps[],
    directions: StepProps[],
    notes: NoteProps[],
  }
}

// TODO : check to replace FlatList with a .map() to see if I can avoid having the scrollEnabled=false workaround
export default function Recipe({recipeProps, editable}: RecipeProps & {editable?: boolean}) {
  return (
    <ScrollView>
      {!editable ?
        <>
          <ThemedView style={styles.titleContainer}>
            <ThemedText type="title" style={styles.title}>{recipeProps.title}</ThemedText>
          </ThemedView>
          <Image 
            style={styles.image}
            source={{uri: recipeProps.imageSource}}
          />
        </>
        :
        <>
          <ThemedView style={styles.titleContainer}>
            <ThemedTextInput multiline type='title' defaultValue={recipeProps.title} style={{margin:4}}></ThemedTextInput>
          </ThemedView>
          <ThemedView style={{flexDirection: 'row'}}>
            <EditableTags>{recipeProps.tags}</EditableTags>
          </ThemedView>
        </>
      }

      {/* Recipe Prep Cards */}
      <ThemedView style={styles.prepCardsContainer}>
        <PrepCard editable={editable}
          style={styles.prepCard} 
          label="Prep Time"
           value={recipeProps.prepInfo.prepTime}
        />
        <PrepCard editable={editable}
          style={styles.prepCard} 
          label="Cook Time"
           value={recipeProps.prepInfo.cookTime}
        />
        <PrepCard editable={editable}
          style={styles.prepCard} 
          label="Total Time"
           value={recipeProps.prepInfo.totalTime}
        />
        <PrepCard editable={editable}
          style={styles.prepCard} 
          label="Portions" 
          value={recipeProps.prepInfo.yield}
        />
      </ThemedView>
      <ThemedView style={styles.recipeContainer}>

        {/* Ingredients */}
        <ThemedText type="subtitle" style={styles.directionsTitle}>Ingredients :</ThemedText>
        <ThemedView style={styles.ingredients}>
          <Ingredients editable={editable}>{recipeProps.ingredients}</Ingredients>
        </ThemedView>

        {/* Cooking Steps */}
        <ThemedText type="subtitle" style={styles.directionsTitle}>Cooking Steps :</ThemedText>
        <CookingSteps 
          editable={editable} 
          style={styles.ingredients} 
          data={recipeProps.directions}
        />
      </ThemedView>

      {/* Notes */}
      <ThemedView style={styles.notesContainer}>
        <Notes editable={editable}>
          {recipeProps.notes}
        </Notes>
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