import { StyleSheet } from "react-native";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { ThemedList } from "../ThemedList";
import BouncyCheckbox from "react-native-bouncy-checkbox";

export interface IngredientProps {
  id: string
  quantity: number,
  unit: string,
  ingredient: string,
}

function Ingredient({quantity, unit, ingredient} : IngredientProps) {
  return (
    <ThemedView style={ingredientStyles.ingredientContainer}>
      <BouncyCheckbox 
        textComponent={
          <ThemedText style={ingredientStyles.textContainer}>{`(${quantity} ${unit}) ${ingredient}`}</ThemedText>
        } 
        textStyle={{textDecorationLine: "none", color: 'red'}}
      />
    </ThemedView>
)}

export default function Ingredients({children}: {children: IngredientProps[]}){
  return (
    <ThemedList 
      style={ingredientStyles.ingredientList}
      scrollEnabled={false}
      data={children}
      renderItem={({item}) => <Ingredient {...item}/>}
    />)
}

export const ingredientStyles = StyleSheet.create({
  ingredientContainer: {
    flexDirection: 'row',
    alignContent: "center"
  },
  ingredientList: {
    rowGap: 6
  },
  textContainer: {
    marginLeft: 8, 
    paddingBottom: 4, 
    marginTop: -2
  }
})
