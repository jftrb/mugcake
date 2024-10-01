import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, TextInput } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import RecipeCard from "@/components/search/RecipeCard";
import { ThemedList } from "@/components/ThemedList";
import { ImageButton } from "@/components/ImageButton";
import { recipesTable } from "@/assets/placeholders/recipe";
import { useState } from "react";

const recipes = recipesTable.map((recipe) => {
  return {
    id: recipe.id,
    title: recipe.title,
    totalTime: recipe.prepInfo.totalTime,
    tags: recipe.tags,
    imageSource: recipe.imageSource,
  };
});

function searchRecipes(text: string) {
  const matches = recipesTable.filter(
    (recipe) =>
      recipe.title.toLowerCase().includes(text.toLowerCase()) ||
      recipe.tags.map((t) => t.value).includes(text)
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
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState(recipes);

  function updateSearchResults(searchText: string) {
    const results = searchRecipes(searchText);
    setSearchResults(results);
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Ionicons size={310} name="code-slash" style={styles.headerImage} />
      }
      contentStyle={styles.contentContainer}
    >
      <ThemedView style={styles.searchHeaderContainer}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Search</ThemedText>
          <TextInput
            style={styles.searchBox}
            onChangeText={setSearchText}
            onSubmitEditing={() => updateSearchResults(searchText)}
            value={searchText}
          ></TextInput>
          <ImageButton
            onPress={() => updateSearchResults(searchText)}
            source={require("@/assets/images/search-icon.png")}
            imageStyle={{
              borderRadius: 16,
            }}
          ></ImageButton>
        </ThemedView>
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
      ></ThemedList>
    </ParallaxScrollView>
  );
}

const contentPadding = 12;

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  searchBox: {
    flex: 1,
    borderWidth: 0.5,
    borderRadius: 16,
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: "white",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  searchHeaderContainer: {
    paddingHorizontal: 24 - contentPadding,
  },
  contentContainer: {
    paddingHorizontal: contentPadding,
  },
  recipeCardsContainer: {
    rowGap: 12,
  },
});
