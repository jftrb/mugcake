import { ThemedFlatListProps, ThemedList } from "@/components/ThemedList";
import { ThemedText } from "@/components/ThemedText";
import { useState } from "react";
import { Pressable } from "react-native";

type EditableListProps<ItemT> = ThemedFlatListProps<ItemT> & {
  createNewItem: (() => ItemT)
}

export default function EditableList<ItemT>({createNewItem, data, ...otherProps} : EditableListProps<ItemT>){
  const [items, setItems] = useState(data)
  

function addEmptyItem(){
  const list = data === null || data === undefined ? Array<ItemT>() : data
  const newList = Array<ItemT>(list.length + 1)

  for (let i = 0; i < list.length; i++) {
    newList[i] = list[i];
  }
  newList[newList.length] = createNewItem() 

  setItems(newList) 
}

  return (
    <>
      <ThemedList data={items} {...otherProps}
      />
      <Pressable>
        <ThemedText onPress={() => {addEmptyItem()}}>+ Add</ThemedText>
      </Pressable>
    </>
  )
}