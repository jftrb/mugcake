import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Platform, ScrollView } from "react-native";
import { RecipeProps, recipeStyles } from "../Recipe";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import EditableTags from "./EditableTags";
import { Controller, useForm } from "react-hook-form";
import { ImageButton } from "@/components/ImageButton";
import PrepCard from "../PrepCard";
import EditableNotes from "./EditableNotes";
import EditableCookingSteps from "./EditableCookingSteps";
import EditableIngredients from "./EditableIngredients";
import { getLocalStorage } from "@/libraries/localStorage";
import { router, useNavigation } from "expo-router";
import { useEffect } from "react";
import { MobileBackHandler, WebBackHandler } from "@/libraries/backHandler";

// TODO : check to replace FlatList with a .map() to see if I can avoid having the scrollEnabled=false workaround
export default function EditableRecipe({
  recipeProps,
}: {
  recipeProps: RecipeProps;
}) {
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    setFocus,
  } = useForm<RecipeProps>({
    defaultValues: recipeProps,
  });
  const navigation = useNavigation();
  
  let changesSaved = false;
  const backHandler =
    Platform.OS === "web"
      ? new WebBackHandler(navigation, () => isDirty, () => changesSaved)
      : new MobileBackHandler(() => isDirty, router.back);

  useEffect(() => {
    const backHandlerUnsub = backHandler.setupBackHandler();
    return backHandlerUnsub;
  });
  const storage = getLocalStorage();

  return (
    <>
      {/* Button Ribbon */}
      <ThemedView style={recipeStyles.ribbon}>
        <ImageButton
          imageStyle={{ width: 48, height: 12, backgroundColor: "transparent" }}
          style={[recipeStyles.editButton, { height: 48 }]}
          source={require("@/assets/images/save-icon.png")}
          onPress={handleSubmit((data) => {
            if (isDirty) {
              console.log(
                `Updating storage value for recipe id : ${recipeProps.id}`
              );
              storage.set(data.id, JSON.stringify(data));
              changesSaved = true;
            }
            router.navigate(`/recipe/${recipeProps.id}`);
          })}
        />
      </ThemedView>

      <ScrollView>
        <ThemedView style={recipeStyles.titleContainer}>
          <Controller
            name="title"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <ThemedTextInput
                multiline
                type="title"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                style={{ margin: 4, textAlign: "center" }}
              />
            )}
          />
        </ThemedView>
        <ThemedView style={{ flexDirection: "row" }}>
          <EditableTags control={control} setFocus={setFocus} />
        </ThemedView>

        {/* Recipe Prep Cards */}
        <ThemedView style={recipeStyles.prepCardsContainer}>
          <EditablePrepCard name="prepTime" label="Prep Time" />
          <EditablePrepCard name="cookTime" label="Cook Time" />
          <EditablePrepCard name="totalTime" label="Total Time" />
          <EditablePrepCard name="yield" label="Portions" />
        </ThemedView>

        <ThemedView style={recipeStyles.recipeContainer}>
          {/* Ingredients */}
          <ThemedText type="subtitle" style={recipeStyles.directionsTitle}>
            Ingredients :
          </ThemedText>
          <ThemedView style={recipeStyles.editableListsContainers}>
            <EditableIngredients control={control} />
          </ThemedView>

          {/* Cooking Steps */}
          <ThemedText type="subtitle" style={recipeStyles.directionsTitle}>
            Cooking Steps :
          </ThemedText>
          <ThemedView style={recipeStyles.editableListsContainers}>
            <EditableCookingSteps control={control} />
          </ThemedView>
        </ThemedView>

        {/* Notes */}
        <ThemedText type="subtitle" style={recipeStyles.directionsTitle}>
          Notes :
        </ThemedText>
        <ThemedView style={recipeStyles.editableListsContainers}>
          <EditableNotes control={control} />
        </ThemedView>
      </ScrollView>
    </>
  );

  function EditablePrepCard({
    name,
    label,
  }: {
    name: "prepTime" | "cookTime" | "totalTime" | "yield";
    label: string;
  }) {
    return (
      <Controller
        name={`prepInfo.${name}`}
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <PrepCard
            editable
            value={value}
            style={recipeStyles.prepCard}
            label={label}
            inputProps={{
              onBlur: onBlur,
              onChangeText: onChange,
            }}
          />
        )}
        rules={{ required: true }}
      />
    );
  }
}
