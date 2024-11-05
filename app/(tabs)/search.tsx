import Ionicons from "@expo/vector-icons/Ionicons";
import { ActivityIndicator, RefreshControl, StyleSheet } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import RecipeCard from "@/components/search/RecipeCard";
import { ThemedList } from "@/components/ThemedList";
import { useLocalSearchParams } from "expo-router";
import SearchBar from "@/components/search/SearchBar";
import { GetRecipeSummaries } from "@/libraries/mugcakeApi";
import { useCallback, useEffect, useState } from "react";
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
  const [isSearching, setIsSearching] = useState(false);

  const search = useCallback(async () => {
    setIsSearching(true);
    setSearchResults([])
    console.log("Querying API");
    const result = await searchRecipes(query).finally(() =>
      setIsSearching(false)
    );
    setSearchResults(result);
  }, [query]);

  useEffect(() => {
    search().catch(console.error);
  }, [search]);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await search()
      .catch(console.error)
      .finally(() => setRefreshing(false));
  }, [search]);

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
        <ThemedView
          style={{ flexDirection: "row", backgroundColor: "transparent" }}
        >
          <ThemedText>
            {searchResults.length} result{searchResults.length !== 1 ? "s" : ""}
          </ThemedText>
          <ThemedView>
            {isSearching && (
              <ActivityIndicator
                size={30}
                style={{ position: "absolute", left: 8 }}
              />
            )}
          </ThemedView>
        </ThemedView>
      </ThemedView>

      <ThemedView>
        <ThemedList
          style={styles.recipeCardsContainer}
          data={searchResults
            .sort((r1, r2) => r1.recipeId - r2.recipeId)
            .sort((r1, r2) => Number(r2.favorite) - Number(r1.favorite))}
          scrollEnabled={false}
          refreshing={refreshing}
          onRefresh={onRefresh}
          onEndReached={() => console.log("End reached")} // TODO : implement paginated results
          onEndReachedThreshold={1}
          renderItem={({ item }) => (
            <RecipeCard
              summary={item}
              onDelete={() => {
                setSearchResults(searchResults.filter((r) => r !== item));
              }}
            />
          )}
        />
      </ThemedView>
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
