import { RecipeExtractor } from "@/libraries/recipeExtractor";
import dotenv from "dotenv";

describe("Testing connectivity to Gemini", () => {
  const env = dotenv.config();
  const extractor = new RecipeExtractor(env.parsed?.EXPO_PUBLIC_GEMINI_API_KEY)

  const url = `https://www.ricardocuisine.com/recettes/5769-gateau-moelleux-au-chocolat-dans-une-tasse`
  test("Prompt Gemini", async () => {
    const json = await extractor.promptGeminiForRecipe(url)
    const recipe = JSON.parse(json) 
    expect(recipe.title).toMatchSnapshot()
  })
})