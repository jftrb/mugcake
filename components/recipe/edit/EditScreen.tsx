import { ThemedView } from "@/components/ThemedView";
import { router, useNavigation } from "expo-router";
import { Platform, Pressable, SafeAreaView } from "react-native";
import { useEffect } from "react";
import EditableRecipe from "@/components/recipe/edit/EditableRecipe";
import { getLocalStorage } from "@/libraries/localStorage";
import { RecipeModel } from "@/models/mugcakeApiModels";
import {
  MobileBackHandler,
  PlatformBackHandler,
  WebBackHandler,
} from "@/libraries/backHandler";
import { useForm } from "react-hook-form";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { recipeScreenStyles, ribbonIconSize } from "../RecipeScreen";

export default function EditScreen({
  id,
  onSave,
  alwaysDirty = false,
}: {
  id: string;
  onSave: (data: RecipeModel) => void;
  alwaysDirty?: boolean;
}) {
  const navigation = useNavigation();
  const storage = getLocalStorage();
  const recipe: RecipeModel = getRecipe(id);

  const {
    control,
    handleSubmit,
    formState: { isDirty },
    setFocus,
  } = useForm<RecipeModel>({
    defaultValues: recipe,
  });

  const dirtyCheck = () => alwaysDirty ? true : isDirty

  let changesSaved = false;
  const backHandler: PlatformBackHandler =
    Platform.OS === "web"
      ? new WebBackHandler(
          navigation,
          dirtyCheck,
          () => changesSaved
        )
      : new MobileBackHandler(dirtyCheck, router.back);

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
            if (dirtyCheck()) {
              console.log(`Updating storage value for recipe id : ${id}`);
              storage.set(id, JSON.stringify(data));
              changesSaved = true;
              onSave(data);
            }
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

        <ThemedView style={{ flex: 1 }} />
        <Pressable
          style={recipeScreenStyles.backButton}
          onPress={() => {
            backHandler.confirmBackGesture(() => router.navigate(`../`));
          }}
        >
          <Ionicons name="arrow-back" size={ribbonIconSize} />
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
  const recipe: RecipeModel = JSON.parse(recipeJSON);
  console.log(`Recipe as parsed from storage:`);
  console.log(recipe);
  return recipe;
}
