import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import RecipeCard from "@/components/search/RecipeCard";
import { ThemedList } from "@/components/ThemedList";
import { recipesTable } from "@/assets/placeholders/recipe";
import { useLocalSearchParams } from "expo-router";
import SearchBar from "@/components/search/SearchBar";


function searchRecipes(text: string) {
  const matches = recipesTable.filter(
    (recipe) =>
      recipe.title.toLowerCase().includes(text.toLowerCase()) ||
      recipe.tags.map((t) => t.value.toLowerCase()).includes(text.toLowerCase())
  );
  const out = matches.map((recipe) => {
    return {
      id: recipe.id,
      title: recipe.title,
      totalTime: recipe.prepInfo.totalTime,
      tags: recipe.tags,
      imageSource: recipe.imageSource,
    };
  });

  console.log(out);
  return out;
}

export default function SearchTabScreen() {
  const { query = "" }: { query: string } = useLocalSearchParams();
  const searchResults = searchRecipes(query);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Ionicons size={350} name="search" style={styles.headerImage} />
      }
      contentStyle={styles.contentContainer}
    >
      <ThemedView style={styles.searchHeaderContainer}>
        <SearchBar query={query}/>
        <ThemedText>
          {searchResults.length} result{searchResults.length !== 1 ? "s" : ""}
        </ThemedText>
      </ThemedView>

      <ThemedList
        style={styles.recipeCardsContainer}
        data={searchResults}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <RecipeCard
            recipeId={item.id}
            title={item.title}
            totalTime={item.totalTime}
            tags={item.tags.map((t) => t.value)}
            imageSource={item.imageSource}
          />
        )}
      />
    </ParallaxScrollView>
  );
}

const contentPadding = 12;

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -25,
    position: "absolute",
  },
  searchHeaderContainer: {
    paddingHorizontal: 24 - contentPadding,
  },
  contentContainer: {
    paddingHorizontal: contentPadding,
  },
  recipeCardsContainer: {
    rowGap: 12,
    paddingBottom: 4,
  },
});
