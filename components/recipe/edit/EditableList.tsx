import { ThemedFlatListProps, ThemedList } from "@/components/ThemedList";
import { ThemedText } from "@/components/ThemedText";
import { Control, FieldValues, UseFormWatch } from "react-hook-form";
import { GestureResponderEvent, Pressable } from "react-native";

export interface Editable<TFields extends FieldValues> {
  editable?: boolean
  control?: Control<TFields>
}

export interface EditableArray<TFields extends FieldValues> extends Editable<TFields> {
  watch: UseFormWatch<TFields>
}

export interface Deletable {
  onDeletePress: ((id: string) => void);
}

type EditableListProps<ItemT> = ThemedFlatListProps<ItemT> & {
  onPressAdd: null | ((event: GestureResponderEvent) => void) | undefined
}

export default function EditableList<ItemT>({onPressAdd, data, ...otherProps} : EditableListProps<ItemT>){
  return (
    <>
      <ThemedList data={data} {...otherProps}
      />
      <Pressable onPress={onPressAdd} style={{marginLeft: 6}}>
        <ThemedText>+ Add</ThemedText>
      </Pressable>
    </>
  )
}