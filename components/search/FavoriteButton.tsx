import { AntDesign } from "@expo/vector-icons";
import { Pressable } from "react-native";

export default function FavoriteButton({
  favorite,
  onPress,
}: {
  favorite: boolean;
  onPress?: () => void;
}) {
  return (
    <Pressable
      style={{ backgroundColor: "transparent" }}
      onPress={onPress}
    >
      <AntDesign
        name={favorite ? "star" : "staro"}
        size={20}
        color={"gold"}
      />
    </Pressable>
  );
}
