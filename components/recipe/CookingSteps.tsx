import { ThemedList } from "../ThemedList";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";

function CookingStep({...otherProps}){
  return (
    <ThemedText {...otherProps}/>
  )
}

export default function CookingSteps({children}: {children: string[]}){
  return (
    <ThemedView>
      <ThemedList 
        data={children}
        renderItem={({item}) => <CookingStep>{`\u2023 ${item}`}</CookingStep>}
      />
    </ThemedView>
  )
}