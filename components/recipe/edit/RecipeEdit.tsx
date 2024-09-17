import CookingSteps from "@/components/recipe/CookingSteps";
import Ingredients from "@/components/recipe/Ingredients";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Pressable, StyleSheet } from "react-native";
import { ScrollView } from "react-native";
import Notes from "@/components/recipe/Notes";
import { RecipeProps } from "../Recipe";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import PrepCardEdit from "./PrepCardEdit";
import { ThemedList } from "@/components/ThemedList";
import Tag from "@/components/Tag";

// TODO : check to replace FlatList with a .map() to see if I can avoid having the scrollEnabled=false workaround
export default function RecipeEdit({recipeProps}: RecipeProps) {
  return (
    <ScrollView>
      <ThemedView style={styles.titleContainer}>
        <ThemedTextInput multiline type='title' defaultValue={recipeProps.title} style={{margin:4}}></ThemedTextInput>
      </ThemedView>
      <ThemedView style={{flexDirection: 'row'}}>
        <ThemedList 
          style={{columnGap: 8}}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={recipeProps.tags}
          renderItem={({item}) => 
            <Tag item={item} editable/>
          }
        />
        <Pressable style={{marginLeft: 16}}>
          <Tag style={{minWidth: 32}} item='+ New'/>
        </Pressable>
      </ThemedView>
      <ThemedView style={styles.prepCardsContainer}>
        <PrepCardEdit style={styles.prepCard} label="Prep Time" value={recipeProps.prepInfo.prepTime}/>
        <PrepCardEdit style={styles.prepCard} label="Cook Time" value={recipeProps.prepInfo.cookTime}/>
        <PrepCardEdit style={styles.prepCard} label="Total Time" value={recipeProps.prepInfo.totalTime}/>
        <PrepCardEdit style={styles.prepCard} label="Portions" value={recipeProps.prepInfo.yield}/>
      </ThemedView>
      <ThemedView style={styles.recipeContainer}>
        <ThemedText type="subtitle" style={styles.directionsTitle}>Ingredients :</ThemedText>
        <ThemedView style={styles.ingredients}>
          <Ingredients>{recipeProps.ingredients}</Ingredients>
        </ThemedView>
        <ThemedText type="subtitle" style={styles.directionsTitle}>Cooking Steps :</ThemedText>
        <CookingSteps style={styles.ingredients}>{recipeProps.directions}</CookingSteps>
      </ThemedView>
      <ThemedView style={styles.notesContainer}>
        <Notes>{recipeProps.notes}</Notes>
      </ThemedView>
    </ScrollView>
  )
}

const interiorPadding = 8

const styles = StyleSheet.create({
  titleContainer: {
    gap: 8,
    marginBottom: 8,
  },
  title: {
    textAlign: "left",
  },
  prepCardsContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
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