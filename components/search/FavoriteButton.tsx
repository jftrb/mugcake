import { PatchRecipe } from "@/libraries/mugcakeApi";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable } from "react-native";

export default function FavoriteButton({
  recipeId,
  favorite,
}: {
  recipeId: number;
  favorite: boolean;
}) {
  const [isFavorite, setIsFavorite] = useState(favorite);
  return (
    <Pressable
      style={{ backgroundColor: "transparent" }}
      onPress={async () => {
        try {
          await PatchRecipe(recipeId, !isFavorite);
          setIsFavorite(!isFavorite);
        } catch (err) {
          console.error(err);
        }
      }}
    >
      <AntDesign
        name={isFavorite ? "star" : "staro"}
        size={20}
        color={"gold"}
      />
    </Pressable>
  );
}
