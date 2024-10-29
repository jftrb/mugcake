import { Pressable, PressableProps, Vibration } from "react-native";

export default function VibratingPressable({
  onPress,
  pressPattern,
  onLongPress,
  longPressPattern,
  ...otherProps
}: PressableProps & {
  pressPattern?: number | number[];
  longPressPattern?: number | number[];
}) {
  return (
    <Pressable
      onPress={(e) => {
        Vibration.vibrate(pressPattern ? pressPattern : 0);
        if (onPress) {
          onPress(e);
        }
      }}
      onLongPress={(e) => {
        Vibration.vibrate(longPressPattern ? longPressPattern : 0);
        if (onLongPress) {
          onLongPress(e);
        }
      }}
      {...otherProps}
    />
  );
}
