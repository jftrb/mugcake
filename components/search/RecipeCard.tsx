import { Image, Pressable, StyleSheet } from "react-native";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import PrepCard from "../recipe/PrepCard";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedList } from "../ThemedList";
import { Link, router } from "expo-router";
import { Tag } from "../Tag";
import { RecipeModel, RecipeSummaryModel } from "@/models/mugcakeApiModels";
import { getLocalStorage } from "@/libraries/localStorage";
import { GetRecipe } from "@/libraries/mugcakeApi";

export default function RecipeCard({
  recipeId,
  title,
  totalTime,
  tags,
  imageSource,
}: RecipeSummaryModel) {
  const borderColor = useThemeColor({}, "text");

  const dynamicStyle = StyleSheet.create({
    border: {
      borderColor: borderColor,
    },
  });

  return (
    <ThemedView style={[styles.horizontal, dynamicStyle.border, styles.border]}>
      <ThemedView style={[styles.horizontal, , { flex: 1, padding: 4 }]}>
        {/* Image */}
        <ThemedView
          style={{ alignSelf: "center" }}
        >
          <Pressable onPress={() => {loadRecipe(recipeId)}}>
            <Image style={styles.image} source={{ uri: imageSource }} />
          </Pressable>
        </ThemedView>

        {/* Middle part */}
        <ThemedView style={styles.descriptionContainer}>
          <ThemedView style={{ marginVertical: 4 }}>
            <Pressable onPress={() => {loadRecipe(recipeId)}}>
              <ThemedText type="defaultSemiBold" style={{ height: 48 }}>
                {title}
              </ThemedText>
            </Pressable>
          </ThemedView>
          <ThemedView style={{ marginBottom: -2, marginTop: 0 }}>
            <ThemedList
              style={styles.tagContainer}
              showsHorizontalScrollIndicator={false}
              horizontal
              data={tags}
              renderItem={({ item }) => (
                <Link href={`./search?query=${item}`} asChild>
                  <Pressable>
                    <Tag
                      item={item}
                      style={{
                        shadowColor: "black",
                        elevation: 2,
                        marginBottom: 2,
                        marginTop: -0,
                      }}
                    />
                  </Pressable>
                </Link>
              )}
            />
          </ThemedView>
        </ThemedView>
      </ThemedView>

      {/* Prep time info */}
      <ThemedView
        style={[
          { alignSelf: "stretch" },
          styles.timeContainer,
          dynamicStyle.border,
        ]}
      >
        <Pressable onPress={() => {loadRecipe(recipeId)}}>
          <ThemedView>
            <PrepCard label="Total Time" value={totalTime}></PrepCard>
          </ThemedView>
        </Pressable>
      </ThemedView>
    </ThemedView>
  );
}

async function loadRecipe(recipeId: number) {
    const recipe = await GetRecipe(recipeId)
    if (recipe !== undefined) {
      console.log(`Recipe ID ${recipeId} found. Initializing storage.`)
      initStorage(recipeId, recipe);
    }
    router.navigate(`/recipe/${recipeId}`)
}

function initStorage(recipeId: number, recipe: RecipeModel) {
  const storage = getLocalStorage();
  if (!storage.contains(recipeId.toString())) {
    console.log(`Initializing storage for recipe id : ${recipeId}`);
    storage.set(recipeId.toString(), JSON.stringify(recipe));
  }

  return storage;
}


const imgSize = 80;

const styles = StyleSheet.create({
  horizontal: {
    flexDirection: "row",
  },
  border: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 4,
    shadowColor: "black",
    elevation: 3,
  },
  tagContainer: {
    columnGap: 8,
  },
  descriptionContainer: {
    flex: 1,
    justifyContent: "space-between",
    marginHorizontal: 4,
    paddingLeft: 8,
    paddingRight: 8,
  },
  tag: {
    padding: 4,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderStyle: "solid",
    userSelect: "none",
  },
  image: {
    borderRadius: 10,
    alignSelf: "center",
    width: imgSize,
    height: imgSize,
  },
  timeContainer: {
    justifyContent: "center",
    borderLeftWidth: 1,
    padding: 8,
    margin: -4,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
  },
});
