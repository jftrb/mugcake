import { ActivityIndicator, Button, StyleSheet } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { Controller, useForm } from "react-hook-form";
import { RecipeExtractor } from "@/libraries/recipeExtractor";
import { getLocalStorage } from "@/libraries/localStorage";
import { router } from "expo-router";
import { useState } from "react";
import ParallaxStaticView from "@/components/ParallaxStaticView";
import { GetExtractorKey } from "@/libraries/mugcakeApi";

export default function HomeScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<URL>({
    defaultValues: { href: "" },
  });
  const storage = getLocalStorage();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string>();

  return (
    <ParallaxStaticView
      contentStyle={{ flex: 1 }}
      headerBackgroundColor={{ light: "#D3BAD1", dark: "#4C2348" }}
      headerImage={
        <Ionicons size={310} name="add" style={styles.headerImage} />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Add a New Recipe</ThemedText>
      </ThemedView>

      <ThemedText type="default">
        Copy a URL down below and we'll import that recipe in no time!
      </ThemedText>

      {/* Import bar + button */}
      <ThemedView style={styles.stepContainer}>
        <ThemedView style={{ flexDirection: "row", gap: 4 }}>
          <Controller
            name="href"
            control={control}
            rules={{
              required: { value: true, message: "URL is required" },
              pattern: {
                value:
                  /^((ftp|http(s)?):\/\/)?((www|[A-z]+)\.)?([A-z]+)\.([A-z]{2,})/,
                message: "Enter a valid URL",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <ThemedTextInput
                onChangeText={onChange}
                onBlur={onBlur}
                autoCapitalize="none"
                autoComplete="url"
                autoCorrect={false}
                style={{
                  borderWidth: 0.5,
                  flex: 1,
                  paddingHorizontal: 4,
                  backgroundColor: "white",
                  color: "black",
                }}
                placeholder="https://www.mugcake.com"
                placeholderTextColor="#bbbbbb"
                value={value}
              />
            )}
          />
          <Button
            title="Import"
            onPress={handleSubmit(async (data) => {
              setError(undefined);
              const apiKey = await GetExtractorKey();

              console.log(`Fetching recipe from url ${data.href}`);
              setProcessing(true);
              try {
                const extractor = new RecipeExtractor(apiKey);
                const recipe = await extractor.boilDownRecipe(
                  data.href.toString()
                );

                console.log(recipe);
                storage.set("new", JSON.stringify(recipe));

                console.log("Redirecting to New Recipe Edit screen.");
                router.navigate("/recipe/new");
              } 
              catch (err: any) {
                console.error(err);
                let message = "Unknown Error";
                if (err instanceof Error) message = err.message;
                setError(message);
              } 
              finally {
                setProcessing(false);
              }
            })}
          />
        </ThemedView>
        {errors.href?.message && (
          <ThemedText style={{ color: "red" }}>
            {errors.href?.message}
          </ThemedText>
        )}
        {error && <ThemedText style={{ color: "red" }}>{error}</ThemedText>}
      </ThemedView>

      {processing && (
        <ActivityIndicator size={96} style={{ flex: 1, marginBottom: 8 }} />
      )}
    </ParallaxStaticView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#B263AD",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginTop: -8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
