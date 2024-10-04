import { ThemedView } from "@/components/ThemedView";
import { router, useNavigation } from "expo-router";
import { Platform, Pressable, SafeAreaView } from "react-native";
import { useEffect } from "react";
import EditableRecipe from "@/components/recipe/edit/EditableRecipe";
import { getLocalStorage } from "@/libraries/localStorage";
import { RecipeProps } from "@/components/recipe/Recipe";
import { MobileBackHandler, WebBackHandler } from "@/libraries/backHandler";
import { useForm } from "react-hook-form";
import { randomUUID } from "expo-crypto";
import { AntDesign, Feather } from "@expo/vector-icons";
import { recipeScreenStyles, ribbonIconSize } from "../RecipeScreen";

export default function EditScreen({ id }: { id: string }) {
  const navigation = useNavigation();
  const storage = getLocalStorage();
  const recipe: RecipeProps = getRecipe(id);

  const {
    control,
    handleSubmit,
    formState: { isDirty },
    setFocus,
  } = useForm<RecipeProps>({
    defaultValues: recipe,
  });

  let changesSaved = false;
  const backHandler =
    Platform.OS === "web"
      ? new WebBackHandler(
          navigation,
          () => isDirty,
          () => changesSaved
        )
      : new MobileBackHandler(() => isDirty, router.back);

  useEffect(() => {
    const backHandlerUnsub = backHandler.setupBackHandler();
    return backHandlerUnsub;
  });

  return (
    <SafeAreaView style={recipeScreenStyles.safeArea}>
      {/* Button Ribbon */}
      <ThemedView style={recipeScreenStyles.ribbon}>
        {/* Save */}
        <Pressable
          style={recipeScreenStyles.editButton}
          onPress={handleSubmit((data) => {
            if (isDirty) {
              console.log(`Updating storage value for recipe id : ${id}`);
              storage.set(data.id, JSON.stringify(data));
              changesSaved = true;
            }
            router.navigate(`/recipe/${id}`);
          })}
        >
          <Feather size={ribbonIconSize} name={"save"} />
        </Pressable>
        {/* Preview */}
        {/* TODO : remove backpress listeners while previewing */}
        <Pressable
          style={recipeScreenStyles.editButton}
          onPress={handleSubmit((data) => {
            console.log("Setting Preview in storage.");
            storage.set("preview", JSON.stringify(data));
            router.navigate("./preview");
          })}
        >
          <AntDesign size={ribbonIconSize} name={"eyeo"} />
        </Pressable>
      </ThemedView>

      {/* Content */}
      <ThemedView style={recipeScreenStyles.container}>
        <EditableRecipe
          recipeProps={recipe}
          control={control}
          setFocus={setFocus}
        />
      </ThemedView>
    </SafeAreaView>
  );
}

function getRecipe(id: string) {
  const storage = getLocalStorage();
  const recipeJSON = storage.getString(id as string) as string;
  const recipe: RecipeProps = JSON.parse(recipeJSON);
  console.log(`Recipe as parsed from storage:`);
  console.log(recipe);

  const recipeWithIds = {
    id: recipe.id,
    url: recipe.url,
    imageSource: recipe.imageSource,
    prepInfo: recipe.prepInfo,
    title: recipe.title,

    tags: addIdProp(recipe.tags),
    ingredients: addIdProp(recipe.ingredients),
    directions: addIdProp(recipe.directions),
    notes: addIdProp(recipe.notes),
  };
  return recipeWithIds;
}

function addIdProp<T>(array: T[]) {
  const output: (T & { id: string })[] = [];
  array.forEach((element) => {
    const newElement = { ...element, id: randomUUID() };
    output.push(newElement);
  });

  return output;
}
