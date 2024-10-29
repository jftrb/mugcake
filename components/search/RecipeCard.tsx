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
import { DeleteRecipe, GetRecipe } from "@/libraries/mugcakeApi";
import { AntDesign } from "@expo/vector-icons";
import ContextMenuProvider from "../ContextMenuProvider";
import alert from "@/libraries/alert";
import VibratingPressable from "../VibratingPressable";

export default function RecipeCard({
  summary,
  onDelete,
}: {
  summary: RecipeSummaryModel;
  onDelete: () => void;
}) {
  const borderColor = useThemeColor({}, "text");

  const { recipeId, favorite, title, totalTime, tags, imageSource } = summary;

  const dynamicStyle = StyleSheet.create({
    border: {
      borderColor: borderColor,
    },
  });

  function PressHandler({ children }: { children: React.ReactNode }) {
    return (
      <VibratingPressable
        longPressPattern={10}
        onLongPress={() => {}}
        pressPattern={10}
        onPress={async () => {
          await PreLoadRecipe(recipeId);
          router.navigate(`/recipe/${recipeId}`);
        }}
      >
        {children}
      </VibratingPressable>
    );
  }

  return (
    <ThemedView style={[styles.horizontal, dynamicStyle.border, styles.border]}>
      <ThemedView style={[styles.horizontal, , { flex: 1, padding: 4 }]}>
        {/* Image */}
        <ThemedView style={{ alignSelf: "center" }}>
          <RecipeCardContextMenu {...summary} onDelete={onDelete}>
            <PressHandler>
              <Image style={styles.image} source={{ uri: imageSource }} />
            </PressHandler>
          </RecipeCardContextMenu>
        </ThemedView>

        {/* Middle part */}
        <ThemedView style={styles.descriptionContainer}>
          <ThemedView style={{ marginVertical: 4 }}>
            <RecipeCardContextMenu {...summary} onDelete={onDelete}>
              <PressHandler>
                <ThemedText type="defaultSemiBold" style={{ height: 48 }}>
                  {title}
                </ThemedText>
              </PressHandler>
            </RecipeCardContextMenu>
          </ThemedView>
          {/* Tags */}
          <ThemedView style={{ marginBottom: -2, marginTop: 0 }}>
            <ThemedList
              style={styles.tagContainer}
              showsHorizontalScrollIndicator={false}
              horizontal
              data={tags}
              renderItem={({ item }) => (
                <Link href={`./search?query=${item}`} asChild>
                  <Pressable onLongPress={() => {}}>
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
        <RecipeCardContextMenu {...summary} onDelete={onDelete}>
          <PressHandler>
            <PrepCard label="Total Time" value={totalTime}></PrepCard>
          </PressHandler>
        </RecipeCardContextMenu>
      </ThemedView>
      <ThemedView style={styles.favoriteIcon}>
        {/* TODO : switch the state of Favorite */}
        <Pressable>
          <AntDesign
            name={favorite ? "star" : "staro"}
            size={20}
            color={"gold"}
          />
        </Pressable>
      </ThemedView>
    </ThemedView>
  );
}

function RecipeCardContextMenu({
  recipeId,
  title,
  onDelete,
  children,
}: RecipeSummaryModel & { onDelete: () => void; children: React.ReactNode }) {
  return (
    <ContextMenuProvider
      actions={[
        {
          title: "Edit",
          onPress: async () => {
            await PreLoadRecipe(recipeId);
            router.navigate(`/recipe/${recipeId}`);
            router.navigate(`/recipe/${recipeId}/edit`);
          },
        },
        {
          title: "Delete",
          destructive: true,
          onPress: () => {
            alert(
              "Delete",
              `Are you sure you wish to delete ${title}?`,
              [
                {
                  text: "Cancel",
                  style: "cancel",
                  onPress: () => {},
                },
                {
                  text: "Delete",
                  style: "destructive",
                  onPress: () => {
                    console.log("Delete Recipe Pressed");
                    // TODO : handle case where delete fails
                    DeleteRecipe(recipeId);
                    onDelete();
                  },
                },
              ],
              {
                cancelable: true,
              }
            );
          },
        },
      ]}
    >
      {children}
    </ContextMenuProvider>
  );
}

export async function PreLoadRecipe(recipeId: number) {
  const recipe = await GetRecipe(recipeId);
  if (recipe !== undefined) {
    console.log(`Recipe ID ${recipeId} found. Initializing storage.`);
    initStorage(recipeId, recipe);
  }
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
    alignContent: "center",
    borderLeftWidth: 1,
    padding: 8,
    margin: -4,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
  },
  favoriteIcon: {
    position: "absolute",
    right: 0,
    margin: 6,
    alignSelf: "flex-start",
    backgroundColor: "transparent",
  },
});
