import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import RecipeCard from "@/components/search/RecipeCard";
import { ThemedList } from "@/components/ThemedList";
import { useLocalSearchParams } from "expo-router";
import SearchBar from "@/components/search/SearchBar";
import { GetRecipeSummaries } from "@/libraries/mugcakeApi";
import { useEffect, useState } from "react";
import { RecipeSummaryModel } from "@/models/mugcakeApiModels";

async function searchRecipes(text: string) {
  const summaries = await GetRecipeSummaries();
  console.log(JSON.stringify(summaries));
  const matches = summaries.filter(
    (summary) =>
      summary.title.toLowerCase().includes(text.toLowerCase()) ||
      summary.tags.map((t) => t.toLowerCase()).includes(text.toLowerCase())
  );

  console.log(matches);
  return matches;
}

export default function SearchTabScreen() {
  const { query = "" }: { query: string } = useLocalSearchParams();
  const [searchResults, setSearchResults] = useState<RecipeSummaryModel[]>([]);
  useEffect(() => {
    async function search() {
      console.log("Querying API");
      const result = await searchRecipes(query);
      setSearchResults(result);
    }

    search().catch(console.error);
  }, [query, setSearchResults]);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Ionicons size={350} name="search" style={styles.headerImage} />
      }
      contentStyle={styles.contentContainer}
    >
      <ThemedView style={styles.searchHeaderContainer}>
        <SearchBar query={query} />
        <ThemedText>
          {searchResults.length} result{searchResults.length !== 1 ? "s" : ""}
        </ThemedText>
      </ThemedView>

      <ThemedList
        style={styles.recipeCardsContainer}
        data={searchResults}
        scrollEnabled={false}
        renderItem={({ item }) => <RecipeCard summary={item} onDelete={() => {setSearchResults(searchResults.filter(r => r !== item))}} />}
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
