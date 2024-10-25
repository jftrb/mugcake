import { Pressable } from "react-native";
import { ThemedList } from "../ThemedList";
import { Tag } from "../Tag";
import { TagModel } from "@/models/mugcakeApiModels";

export default function Tags({ children }: { children: TagModel[] }) {
  return (
    <>
      <ThemedList
        style={{ columnGap: 8 }}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={children}
        renderItem={({ item }) => <Tag item={item.value} />}
      />
      <Pressable style={{ marginLeft: 16 }}>
        <Tag style={{ minWidth: 32 }} item="+ New" />
      </Pressable>
    </>
  );
}
