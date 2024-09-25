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


// TODO : check to replace FlatList with a .map() to see if I can avoid having the scrollEnabled=false workaround
export default function EditableRecipe({recipeProps}: RecipeProps) {
  const { control, handleSubmit, formState: { errors } } = useForm();

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
          <EditablePrepCard name='recipe.prepInfo.prepTime' label="Prep Time" defaultValue={recipeProps.prepInfo.prepTime}/>
          <EditablePrepCard name='recipe.prepInfo.cookTime' label="Cook Time" defaultValue={recipeProps.prepInfo.cookTime}/>
          <EditablePrepCard name='recipe.prepInfo.totalTime' label="Total Time" defaultValue={recipeProps.prepInfo.totalTime}/>
          <EditablePrepCard name='recipe.prepInfo.portions' label="Portions" defaultValue={recipeProps.prepInfo.yield}/>
        </ThemedView>

        <ThemedView style={recipeStyles.recipeContainer}>

          {/* Ingredients */}
          <ThemedText type="subtitle" style={recipeStyles.directionsTitle}>Ingredients :</ThemedText>
          <ThemedView style={recipeStyles.ingredients}>
            <Ingredients editable>{recipeProps.ingredients}</Ingredients>
          </ThemedView>

          {/* Cooking Steps */}
          <ThemedText type="subtitle" style={recipeStyles.directionsTitle}>Cooking Steps :</ThemedText>
          <CookingSteps 
            editable 
            style={recipeStyles.ingredients} 
            data={recipeProps.directions}
          />
        </ThemedView>

        {/* Notes */}
        <ThemedView style={recipeStyles.notesContainer}>
          <Notes editable>
            {recipeProps.notes}
          </Notes>
        </ThemedView>
      </ScrollView>
    </>
  )

  function EditablePrepCard({name, label, defaultValue}: {name: string, label: string, defaultValue?: string}) {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, onBlur, value }  }) => (
          <PrepCard editable
            value={value}
            style={recipeStyles.prepCard}
            label={label}
            inputProps={{
              defaultValue: defaultValue,           
              onBlur:onBlur,
              onChangeText:onChange
            }} />
        )} 
      />);
  }
}