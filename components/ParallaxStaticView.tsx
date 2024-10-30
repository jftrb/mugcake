import type { PropsWithChildren, ReactElement } from "react";
import { StyleProp, useColorScheme, View, ViewStyle } from "react-native";

import { ThemedView } from "@/components/ThemedView";
import { parallaxStyles } from "./ParallaxScrollView";

type Props = PropsWithChildren<{
  headerImage: ReactElement;
  headerBackgroundColor: { dark: string; light: string };
  contentStyle?: StyleProp<ViewStyle>;
}>;

export default function ParallaxStaticView({
  children,
  contentStyle,
  headerImage,
  headerBackgroundColor,
}: Props) {
  const colorScheme = useColorScheme() ?? "light";
  return (
    <ThemedView style={parallaxStyles.container}>
      <View
        style={[
          parallaxStyles.header,
          { backgroundColor: headerBackgroundColor[colorScheme] },
        ]}
      >
        {headerImage}
      </View>
      <ThemedView style={[parallaxStyles.content, contentStyle]}>
        {children}
      </ThemedView>
    </ThemedView>
  );
}
