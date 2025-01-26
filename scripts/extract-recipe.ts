import { RecipeExtractor } from "../libraries/recipeExtractor";
import dotenv from "dotenv";

dotenv.config();

// boilDownRecipe(`https://www.ricardocuisine.com/en/recipes/5769-moist-chocolate-cake-in-a-cup`);
// boilDownRecipe(`https://www.budgetbytes.com/wprm_print/slow-cooker-chicken-tikka-masala#`);
boilDownRecipe(
  `https://www.ricardocuisine.com/recettes/5769-gateau-moelleux-au-chocolat-dans-une-tasse`
);
// boilDownRecipe(`https://www.okonomikitchen.com/5-easy-marinades-for-tempeh/print/10193/`);
// boilDownRecipe(`https://www.gimmesomeoven.com/italian-orzo-tuna-salad/`);

// PROBLEMATIC URLS
// boilDownRecipe(`https://holycowvegan.net/oven-blackened-tandoori-tofu/`); // 2.0 fixed
// boilDownRecipe(`https://minimalistbaker.com/crispy-peanut-tofu-cauliflower-rice-stir-fry/`); // 2.0 NOT fixed

async function boilDownRecipe(url: string) {
  const extractor = new RecipeExtractor(process.env.EXPO_PUBLIC_GEMINI_API_KEY)
  const recipeJSON = await extractor.promptLlmForRecipe(url)
  console.log(recipeJSON);
}
