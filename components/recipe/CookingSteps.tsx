import { Pressable, StyleSheet } from "react-native";
import { ThemedList } from "../ThemedList";
import { ThemedText } from "../ThemedText";
import { ThemedViewProps } from "../ThemedView";
import { CookingStepModel } from "@/models/mugcakeApiModels";
import { useState } from "react";

function CookingStep({
  value,
  index,
  ...otherProps
}: {
  value: string;
  index: number;
}) {
  const [crossed, setCrossed] = useState(false);

  return (
    <Pressable onPress={() => setCrossed(!crossed)}>
      <ThemedText {...otherProps} style={crossed ? styles.crossedText : null}>
        <ThemedText
          style={[{ fontWeight: "bold" }, crossed ? styles.faded : null]}
          children={`${index}- `}
        />
        {`${value}`}
      </ThemedText>
    </Pressable>
  );
}

export default function CookingSteps({
  style,
  data,
}: ThemedViewProps & { data: CookingStepModel[] }) {
  return (
    <ThemedList
      style={[styles.stepsList, style]}
      scrollEnabled={false}
      data={data.map((step, index) => ({
        index: index + 1,
        value: step.value,
      }))}
      renderItem={({ item }) => <CookingStep {...item} />}
    />
  );
}

const crossedColor = "#bbbbbb";
const styles = StyleSheet.create({
  stepsList: {
    rowGap: 4,
  },
  crossedText: {
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
    color: crossedColor,
  },
  faded: {
    color: crossedColor,
  },
});
