import { StyleSheet } from "react-native";
import { ThemedList } from "../ThemedList";
import { ThemedText } from "../ThemedText";
import { ThemedViewProps } from "../ThemedView";
import { CookingStepModel } from "@/models/mugcakeApiModels";

function CookingStep({ value, ...otherProps }: { value: string }) {
  return <ThemedText {...otherProps}>{`\u2023 ${value}`}</ThemedText>;
}

export default function CookingSteps({
  style,
  data,
}: ThemedViewProps & { data: CookingStepModel[] }) {
  return (
    <ThemedList
      style={[styles.stepsList, style]}
      scrollEnabled={false}
      data={data}
      renderItem={({ item }) => <CookingStep value={item.value} />}
    />
  );
}

const styles = StyleSheet.create({
  stepsList: {
    rowGap: 4,
  },
});
