import Ionicons from "@expo/vector-icons/Ionicons";
import { ActivityIndicator, StyleSheet } from "react-native";

import { ParallaxHeader } from "@/components/ParallaxScrollView";
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
    console.log("Querying API");
    const result = await searchRecipes(query).finally(() =>
      setIsSearching(false)
    );
    setSearchResults(result);
  }, [query]);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await search()
      .catch(console.error)
      .finally(() => setRefreshing(false));
  }, [search]);

  useEffect(() => {
    search().catch(console.error);
  }, [search]);

  return (
    <ThemedList
      ListHeaderComponent={
        <SearchHeaderComponent
          query={query}
          numberOfResults={searchResults.length}
          renderIndicator={isSearching}
        />
      }
      ListHeaderComponentStyle={{ margin: -32, marginBottom: 0 }}
      style={styles.recipeCardsContainer}
      scrollEventThrottle={16}
      data={searchResults
        .sort((r1, r2) => r1.recipeId - r2.recipeId)
        .sort((r1, r2) => Number(r2.favorite) - Number(r1.favorite))}
      scrollEnabled={true}
      refreshing={refreshing}
      onRefresh={onRefresh}
      onEndReached={() => console.log("End reached")} // TODO : implement paginated results
      onEndReachedThreshold={1}
      renderItem={({ item }) => (
        <ThemedView style={{ marginHorizontal: -16 }}>
          <RecipeCard
            key={item.recipeId}
            summary={item}
            onDelete={() => {
              setSearchResults(searchResults.filter((r) => r !== item));
            }}
          />
        </ThemedView>
      )}
    />
  );
}

function SearchHeaderComponent({
  query,
  numberOfResults,
  renderIndicator,
}: {
  query: string;
  numberOfResults: number;
  renderIndicator: boolean;
}) {
  return (
    <>
      <ParallaxHeader
        headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
        headerImage={
          <Ionicons size={350} name="search" style={styles.headerImage} />
        }
      />
      <ThemedView style={styles.searchHeaderContainer}>
        <SearchBar query={query} />
        <ThemedView
          style={{
            flexDirection: "row",
          }}
        >
          <ThemedText>
            {numberOfResults} result
            {numberOfResults !== 1 ? "s" : ""}
          </ThemedText>
          <ThemedView>
            {renderIndicator && (
              <ActivityIndicator
                size={30}
                style={{ position: "absolute", left: 8 }}
              />
            )}
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </>
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
    paddingTop: 32,
  },
  contentContainer: {
    paddingHorizontal: contentPadding,
  },
  recipeCardsContainer: {
    rowGap: 12,
    padding: 32,
    paddingBottom: 4,
  },
});
