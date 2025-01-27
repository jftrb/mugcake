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
import { ComponentProps, memo, useCallback, useEffect, useState } from "react";
import {
  RecipeSummaryModel,
  RecipeSummarySearchParams,
} from "@/models/mugcakeApiModels";

async function searchRecipes({
  query,
  limit,
  cursor,
  tags,
}: RecipeSummarySearchParams) {
  const searchResponse = await GetRecipeSummaries({
    query,
    limit,
    cursor,
    tags,
  });
  console.log(JSON.stringify(searchResponse));
  return searchResponse;
}

const defaultSearchLimit = 10;

export default function SearchTabScreen() {
  const { query = "" }: { query: string } = useLocalSearchParams();
  const [searchResults, setSearchResults] = useState<RecipeSummaryModel[]>([]);
  const [incomingResults, setIncomingResults] = useState<RecipeSummaryModel[]>(
    []
  );
  const [isSearching, setIsSearching] = useState(false);
  const [nextCursor, setNextCursor] = useState("");

  const search = useCallback(
    async (limit: number, cursor: string) => {
      setIsSearching(true);
      console.log("Querying API");
      const result = await searchRecipes({
        query: query,
        limit: limit,
        cursor: cursor,
        tags: [],
      }).finally(() => setIsSearching(false));

      setIncomingResults(result.Summaries);
      setNextCursor(result.NextCursor);
    },
    [query]
  );

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setSearchResults([]);
    await search(searchResults.length, "")
      .catch(console.error)
      .finally(() => setRefreshing(false));
  }, [search, searchResults]);

  useEffect(() => {
    setSearchResults([]);
    console.log("Searching");
    search(defaultSearchLimit, "").catch(console.error);
  }, [search]);

  useEffect(() => {
    setSearchResults((s) => s.concat(incomingResults));
  }, [incomingResults]);

  const onDeleteCard = useCallback((recipeId: number) => {
    setSearchResults(prevResults => prevResults.filter((r) => r.recipeId !== recipeId));
  }, [])

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
      data={searchResults}
      // .sort((r1, r2) => r1.recipeId - r2.recipeId)
      // .sort((r1, r2) => Number(r2.favorite) - Number(r1.favorite))}
      scrollEnabled={true}
      refreshing={refreshing}
      onRefresh={onRefresh}
      onEndReached={() => {
        console.debug("End reached");
        if (nextCursor !== "") {
          search(defaultSearchLimit, nextCursor);
        }
      }} // TODO : implement paginated results
      onEndReachedThreshold={0.75}
      renderItem={({ item }) => (
        <MemoizedCard 
          key={item.recipeId}
          summary={item}
          onDelete={onDeleteCard}
        />
      )}
    />
  );
}

const MemoizedCard = memo(function LocalCard(props : ComponentProps<typeof RecipeCard>) {
  console.log(`rendering ${props.summary.recipeId}`)
  return (
    <ThemedView style={{ marginHorizontal: -16 }}>
      <RecipeCard {...props}/>
    </ThemedView>
  )
})

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
    paddingHorizontal: 32 - contentPadding,
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
