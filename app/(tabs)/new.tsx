import { Button, StyleSheet } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { Controller, useForm } from "react-hook-form";
import { boilDownRecipe } from "@/libraries/recipeExtractor";
import { getLocalStorage } from "@/libraries/localStorage";
import { router } from "expo-router";

export default function HomeScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<URL>({
    defaultValues: { href: "" },
  });
  const storage = getLocalStorage();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Ionicons size={310} name="add" style={styles.headerImage} />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Add a New Recipe</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="default">
          Copy a URL down below and we'll import that recipe in no time!
        </ThemedText>
        <ThemedView style={{ flexDirection: "row", gap: 4 }}>
          <Controller
            name="href"
            control={control}
            rules={{
              required: { value: true, message: "URL is required" },
              pattern: {
                value:
                  /^((ftp|http(s)?):\/\/)?(www|[A-z]+)\.([A-z]+)\.([A-z]{2,})/,
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
                style={{ borderWidth: 0.5, flex: 1, paddingHorizontal: 4, backgroundColor: 'white' }}
                placeholder="https://www.mugcake.com"
                value={value}
              />
            )}
          />
          <Button
            title="Import"
            onPress={handleSubmit(async (data) => {
              console.log(`Fetching recipe from url ${data}`);
              const recipe = await boilDownRecipe(data.toString())
              console.log(recipe)
              storage.set('new', JSON.stringify(recipe))
              console.log('Redirecting to New Recipe Edit screen.')
              router.navigate('/recipe/new')
            })}
          />
        </ThemedView>
        <ThemedText style={{ color: "red" }}>{errors.href?.message}</ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
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
