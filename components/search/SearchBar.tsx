import { Pressable, StyleSheet, TextInput } from "react-native";
import { ImageButton } from "../ImageButton";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { useState } from "react";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

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
      <ThemedView style={styles.searchContainer}>
        <TextInput
        style={[styles.searchBox, {}]}
          defaultValue={query}
          onChangeText={setSearchText}
          onSubmitEditing={() => submitSearch(searchText)}
        />
        <Pressable style={{alignSelf: 'center', position: 'absolute', marginRight: 4, padding: 4}}
        onPress={() => submitSearch("")}>
          <MaterialIcons name="clear" size={16}/>
        </Pressable>
      </ThemedView>
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
    flexDirection: 'row-reverse',
    flex: 1,
    borderWidth: 0.5,
    borderRadius: 16,
    backgroundColor: "white",
  },
  searchBox: {
    flex: 1,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 16,
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
