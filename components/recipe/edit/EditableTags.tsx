import { TagProps } from "../Tags";
import { tagStyles } from "../Tags";
import { Platform, Pressable, StyleSheet } from "react-native";
import { RecipeProps } from "../Recipe";
import { Editable } from "./EditableList";
import { Control, Controller, useFieldArray, UseFieldArrayRemove, UseFormSetFocus, useWatch } from "react-hook-form";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import RemoveButton from "./RemoveButton";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { ScrollView } from "react-native";
import { randomUUID } from "expo-crypto";
import { Tag } from "@/components/Tag";
import { ThemedWebInput } from "@/components/ThemedWebInput";
import { useEffect, useRef } from "react";

const EditableTag = ({ 
  control, 
  index, 
  field, 
  remove, 
} : {
  remove: UseFieldArrayRemove
  control?: Control<RecipeProps>
  index: number
  field: TagProps
}) => {
  const tags = useWatch({
    control,
    name: 'tags'
  })
  const borderColor = useThemeColor({}, 'text')
  const dynamicStyle = StyleSheet.create({
    border: {
      borderColor: borderColor
    },
  })

  return (
    <ThemedView style={[tagStyles.tagContainer, dynamicStyle.border]}>
      <ThemedView >
        <Controller
          control={control}
          name={`tags.${index}.value`}
          render={({ field: { onChange, onBlur, value } }) => (
            // Hack to avoid inputs in web version to be super long and fixed width
            Platform.OS === "web" ?
              <ThemedWebInput value={value}
                onChange={onChange}
                onBlur={onBlur}
                style={{ width: Math.min(Math.max(value.length, 2), 50) + 'ch', minWidth: 30, height: 20 }}/> 
              :
              <ThemedTextInput value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                style={{ minWidth: 30 }}
              />
        )
          }
        />
      </ThemedView>
      <RemoveButton 
        style={{marginLeft: 4}} 
        onPress={() =>{
          console.log(`Deleting tag ${tags[index].value} [id ${field.id}]`)
          remove(index)
        }}
      />
    </ThemedView>
  )
}

export default function EditableTags({control, setFocus} : Editable<RecipeProps> & {setFocus: UseFormSetFocus<RecipeProps>}) {
  const { fields, append, remove } = useFieldArray({
    name: 'tags',
    control
  })  
  const previousLength = useRef(fields.length)
  const scrollRef = useRef<ScrollView>(null)

  // Handle qty changes
  useEffect(() => {
    setTimeout(() => {
    console.log('in effect')
    if (fields.length > previousLength.current) {
      scrollRef.current?.scrollToEnd()
      console.log('setting focus')
      setFocus(`tags.0.value`, {shouldSelect: true})
    } 
    previousLength.current = fields.length
  }, 0)
  }, [setFocus, fields])

  return (
    <>
      <ScrollView horizontal 
        ref={scrollRef}
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={{gap: 8}}
      >
        {fields.map((field, index) => 
          <EditableTag key={field.id} {...{ index, field, remove, control }}/>
        )}
      </ScrollView>
      <Pressable style={{marginLeft: 16}} 
        onPress={() => {
          console.log('Adding tag')
          append({value: "", id: randomUUID()})
        }}>
        <Tag style={{minWidth: 32}} item='+ New'/>
      </Pressable>
    </>
  )
}
