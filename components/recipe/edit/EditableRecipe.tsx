import CookingSteps from "@/components/recipe/CookingSteps";
import Ingredients from "@/components/recipe/Ingredients";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ScrollView } from "react-native";
import { RecipeProps, recipeStyles } from "../Recipe";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import EditableTags from "./EditableTags";
import Notes from "../Notes";
import { Controller, useForm } from "react-hook-form";
import ImageButton from "@/components/ImageButton";
import PrepCard from "../PrepCard";
import EditableNotes from "./EditableNotes";
import EditableCookingSteps from "./EditableCookingSteps";


// TODO : check to replace FlatList with a .map() to see if I can avoid having the scrollEnabled=false workaround
export default function EditableRecipe({recipeProps}: {recipeProps: RecipeProps}) {
  const { control, watch, handleSubmit, formState: { errors } } = useForm<RecipeProps>({
    defaultValues: recipeProps
  });

  return (
    <>
      {/* Button Ribbon */}
      <ThemedView style={{height: 48, backgroundColor: 'white', flexDirection: 'row-reverse'}}>
        <ImageButton onPress={handleSubmit((data) => console.log(data))}/>
      </ThemedView>

      <ScrollView>
        <ThemedView style={recipeStyles.titleContainer}>
          <ThemedTextInput multiline type='title' defaultValue={recipeProps.title} style={{margin:4}}></ThemedTextInput>
        </ThemedView>
        <ThemedView style={{flexDirection: 'row'}}>
          <EditableTags>{recipeProps.tags}</EditableTags>
        </ThemedView>

        {/* Recipe Prep Cards */}
        <ThemedView style={recipeStyles.prepCardsContainer}>
          <EditablePrepCard name='prepTime' label="Prep Time"/>
          <EditablePrepCard name='cookTime' label="Cook Time"/>
          <EditablePrepCard name='totalTime' label="Total Time"/>
          <EditablePrepCard name='yield' label="Portions"/>
        </ThemedView>

        <ThemedView style={recipeStyles.recipeContainer}>

          {/* Ingredients */}
          <ThemedText type="subtitle" style={recipeStyles.directionsTitle}>Ingredients :</ThemedText>
          <ThemedView style={recipeStyles.editableListsContainers}>
            <Ingredients editable>{recipeProps.ingredients}</Ingredients>
          </ThemedView>

          {/* Cooking Steps */}
          <ThemedText type="subtitle" style={recipeStyles.directionsTitle}>Cooking Steps :</ThemedText>
          <ThemedView style={recipeStyles.editableListsContainers}>
            <EditableCookingSteps control={control}/>
          </ThemedView>
        </ThemedView>

        {/* Notes */}
        <ThemedText type="subtitle" style={recipeStyles.directionsTitle}>Notes :</ThemedText>
        <ThemedView style={recipeStyles.editableListsContainers}>
          <EditableNotes control={control}/>
        </ThemedView>
      </ScrollView>
    </>
  )

  function EditablePrepCard({
    name, 
    label, 
  }: {name: "prepTime" | "cookTime" | "totalTime" | "yield", label: string}) {
    return (
      <Controller
        name={`prepInfo.${name}`}
        control={control}
        render={({ field: { onChange, onBlur, value }  }) => (
          <PrepCard editable
            value={value}
            style={recipeStyles.prepCard}
            label={label}
            inputProps={{
              onBlur:onBlur,
              onChangeText:onChange
            }} />
        )} 
      />);
  }
}
