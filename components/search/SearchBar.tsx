import { StyleSheet } from "react-native";
import { ImageButton } from "../ImageButton";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { useState } from "react";
import { router } from "expo-router";
import ClearableTextInput from "../ClearableTextInput";

export default function SearchBar({ query }: { query: string }) {
  const [searchText, setSearchText] = useState(query);

  function submitSearch(query: string) {
    console.log(`Search for : ${query}`);
    const searchParams = query === "" ? query : `?query=${query}`;
    router.navigate(`./search${searchParams}`);
  }

  return (
    <ThemedView style={styles.titleContainer}>
      <ThemedText type="title">Search</ThemedText>
        <ClearableTextInput
          style={styles.searchContainer}
          defaultValue={query}
          onChangeText={setSearchText}
          onSubmitEditing={() => submitSearch(searchText)}
          onClear={() => submitSearch("")}
        />
      <ImageButton
        onPress={() => submitSearch(searchText)}
        source={require("@/assets/images/search-icon.png")}
        imageStyle={{
          borderRadius: 16,
        }}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flex: 1,
    borderWidth: 0.5,
    borderRadius: 16.5,
    backgroundColor: "white",
    paddingLeft: 8,
    paddingRight: 8,
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
