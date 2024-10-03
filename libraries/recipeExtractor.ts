import dotenv from "dotenv";
import gemini from "@google/generative-ai";
import { GeminiRecipe } from "@/types/geminiTypes";
import { addTimes, parseIngredientSection, parseTime } from "./geminiParsers";

dotenv.config();

const genAI = new gemini.GoogleGenerativeAI(
  process.env.EXPO_PUBLIC_GEMINI_API_KEY as string
);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function boilDownRecipe(url: string) {
  const json = await promptGeminiForRecipe(url)
  const {prepTime, cookTime, yields, ...rest} = convertJSONtoRecipe(json)
  return {
    ...rest,
    url: url,
    tags: [],
    prepInfo: {
      prepTime: prepTime.toString(),
      cookTime: cookTime.toString(),
      totalTime: addTimes(prepTime, cookTime).toString(),
      yield: yields,
    },
  }
}

function convertJSONtoRecipe(recipeJSON: string) {
  const geminiRecipe = JSON.parse(recipeJSON) as GeminiRecipe;

  return {
    title: geminiRecipe.title,
    imageSource: geminiRecipe.imageUrl,
    prepTime: parseTime(geminiRecipe.prepTime),
    cookTime: parseTime(geminiRecipe.cookTime),
    yields: geminiRecipe.yield,
    instructions: geminiRecipe.instructions.map((i) => {
      return { value: i };
    }),
    notes: geminiRecipe.notes.map((i) => {
      return { value: i };
    }),
    ingredients: geminiRecipe.ingredients.map((i) => parseIngredientSection(i)),
  };
}

async function promptGeminiForRecipe(url: string) {
  let res = await fetch(url);
  const initialWebPage = await res.text();
  const webPage = await getPrintableVersion(initialWebPage);
  console.debug(`Web page length ${webPage.length}`);

  const trimmedWebPage = trimWebPage(webPage);
  console.debug(`Trimmed page length ${trimmedWebPage.length}`);

  try {
    const result = await model.generateContent(`Provide to me in JSON format 
        the recipe title, 
        the recipe image url, 
        the preparation time named prepTime,
        the cooking time named cookTime, 
        the yield, 
        the recipe instructions as a string array, 
        and the recipe notes as written in a string array from the following HTML page.
        Also include the recipe ingredients in the following JSON layout : {header: string, ingredients: {"quantity", "unit", "name", "other" }[]}: 
        \n${trimmedWebPage}
        You can reuse text from the promp without issue`);

    const geminiResponse = result.response.text();
    console.log(geminiResponse);
    const recipeJSON = geminiResponse.replaceAll("```", "").replace("json", "");
    return recipeJSON;
  } catch (err) {
    throw new Error("Error while prompting Gemini", { cause: err });
  }
}

async function getPrintableVersion(initialPage: string) {
  const printUrlPattern = /(?<=href=\")(.*?print.*?(?=\"))/;
  const printUrl = initialPage.match(printUrlPattern);
  if (printUrl === null) {
    return initialPage;
  }

  try {
    console.debug(printUrl[0]);
    const res = await fetch(printUrl[0]);
    return res.text();
  } catch {
    return initialPage;
  }
}

function trimWebPage(webPage: string) {
  const styleTagsPattern = /<style.*?<\/style>/gs;
  const svgTagsPattern = /<svg.*?<\/svg>/gs;
  const preTrimPage = webPage
    .replace(styleTagsPattern, "")
    .replace(svgTagsPattern, "");

  const scriptsPattern = /<script.*?<\/script>/gs; // All scripts
  const matches = preTrimPage.match(scriptsPattern);

  const scriptWithIngredients =
    /<script.*(ingredients|ingrédients).*<\/script>/i; // scripts that contain the word "ingredients"
  const scriptsToRemove = matches?.filter(
    (m) => m.match(scriptWithIngredients) === null
  );

  let trimmedWebPage = preTrimPage;
  scriptsToRemove?.forEach((scriptToRemove) => {
    trimmedWebPage = trimmedWebPage.replace(scriptToRemove, "");
  });

  return trimmedWebPage;
}
