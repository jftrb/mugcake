import Tag from "@/components/Tag";
import { ThemedList } from "@/components/ThemedList";
import { Pressable } from "react-native";

export default function EditableTags({children} : {children: string[]}) {
  return (
    <>
      <ThemedList 
        style={{columnGap: 8}}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={children}
        renderItem={({item}) => 
          <Tag item={item} editable/>
        }
      />
      <Pressable style={{marginLeft: 16}}>
        <Tag style={{minWidth: 32}} item='+ New'/>
      </Pressable>
    </>
  )
}