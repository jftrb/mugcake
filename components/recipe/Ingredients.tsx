import { StyleSheet } from "react-native";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { ThemedList } from "../ThemedList";
import BouncyCheckbox from "react-native-bouncy-checkbox";

export interface IngredientProps {
  quantity: number,
  unit: string,
  ingredient: string,
}

function Ingredient({quantity, unit, ingredient} : IngredientProps) {
  return (
    <ThemedView style={styles.ingredientContainer}>
      <BouncyCheckbox 
        textComponent={
          <ThemedText style={{marginLeft: 4, paddingBottom: 4}}>{`(${quantity} ${unit}) ${ingredient}`}</ThemedText>
        } 
        textStyle={{textDecorationLine: "none", color: 'red'}}
      />
    </ThemedView>
)}

export default function Ingredients({children}: {children: IngredientProps[]}){
  return (
    <ThemedList 
      style={styles.ingredientList}
      scrollEnabled={false}
      data={children}
      renderItem={({item}) => 
        <Ingredient quantity={item.quantity} unit={item.unit} ingredient={item.ingredient}/>
      }
    />
  )
}

const styles = StyleSheet.create({
  ingredientContainer: {
    flexDirection: 'row',
    alignContent: "center"
  },
  ingredientList: {
    rowGap: 4
  },
  textContainer: {
    marginLeft: 4,
  }
})