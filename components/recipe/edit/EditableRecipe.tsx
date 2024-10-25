import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ScrollView } from "react-native";
import { recipeStyles } from "../Recipe";
import { RecipeModel } from "@/models/mugcakeApiModels";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import EditableTags from "./EditableTags";
import { Controller, UseFormSetFocus } from "react-hook-form";
import PrepCard from "../PrepCard";
import EditableNotes from "./EditableNotes";
import EditableCookingSteps from "./EditableCookingSteps";
import EditableIngredientSections from "./EditableIngredientSection";
import { Editable } from "./EditableList";

// TODO : check to replace FlatList with a .map() to see if I can avoid having the scrollEnabled=false workaround
export default function EditableRecipe({
  recipeProps,
  control,
  setFocus,
}: Editable<RecipeModel> & {
  recipeProps: RecipeModel;
  setFocus: UseFormSetFocus<RecipeModel>;
}) {
  return (
    <>
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
            <EditableIngredientSections control={control} />
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
