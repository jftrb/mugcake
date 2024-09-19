import { ThemedFlatListProps, ThemedList } from "@/components/ThemedList";
import { ThemedText } from "@/components/ThemedText";
import { GestureResponderEvent, Pressable } from "react-native";

export interface Editable {
  editable?: boolean
  onDeletePress: ((id: string) => void);
}

type EditableListProps<ItemT> = ThemedFlatListProps<ItemT> & {
  onPress: null | ((event: GestureResponderEvent) => void) | undefined
}

export default function EditableList<ItemT>({onPress, data, ...otherProps} : EditableListProps<ItemT>){
  return (
    <>
      <ThemedList data={data} {...otherProps}
      />
      <Pressable onPress={onPress} style={{marginLeft: 6}}>
        <ThemedText>+ Add</ThemedText>
      </Pressable>
    </>
  )
}