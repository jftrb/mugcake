import { Pressable, StyleSheet } from "react-native";
import { ThemedList } from "../ThemedList";
import { Tag } from "../Tag";

export type TagProps = {
  id: string;
  value: string;
};

export default function Tags({children} : {children: TagProps[]}) {
  return (
    <>
      <ThemedList 
        style={{columnGap: 8}}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={children}
        renderItem={({item}) => 
          <Tag item={item.value}/>
        }
        />
        <Pressable style={{marginLeft: 16}}>
        <Tag style={{minWidth: 32}} item='+ New'/>
      </Pressable>
    </>
  )
}

export const tagStyles = StyleSheet.create({
  tagContainer: {
    height: 32,
    padding: 8,
    paddingBottom: 4,
    paddingTop: 2,
    borderRadius: 16,
    borderWidth: 1,
    userSelect: 'none',
    flexDirection: 'row',
    alignItems: 'center'
  },
  deleteButton: {
    padding: 4,
    margin: -2,
    marginLeft: 4,
  },
  xButton: {
    color: 'red',
    fontWeight: 'bold'
  }
});
