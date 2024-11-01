import { GeminiRecipe } from "@/types/geminiTypes";
import {
  addTimes,
  parseIngredientSection,
  parseTag,
  parseTime,
} from "./geminiParsers";
import { RecipeModel } from "@/models/mugcakeApiModels";
import { getGeminiResponse, getGptResponse } from "./llmModels";

export class RecipeExtractor {
  private gemini_api_key?: string;

  constructor(api_key?: string) {
    this.gemini_api_key = api_key;
  }

  async boilDownRecipe(url: string): Promise<RecipeModel> {
    const json = await this.promptLlmForRecipe(url);
    const { prepTime, cookTime, yields, ...rest } =
      this.convertJSONtoRecipe(json);
    return {
      ...rest,
      favorite: false,
      url: url,
      prepInfo: {
        prepTime: prepTime.toString(),
        cookTime: cookTime.toString(),
        totalTime: addTimes(prepTime, cookTime).toString(),
        yield: yields,
      },
    };
  }

  private convertJSONtoRecipe(recipeJSON: string) {
    let geminiRecipe: GeminiRecipe;
    try {
      geminiRecipe = JSON.parse(recipeJSON, function (prop, value) {
        if (prop === "image_url") {
          console.debug("Caught badly formed JSON from Gemini");
          this["imageUrl"] = value;
        } else {
          return value;
        }
      });
    } catch (err) {
      throw Error("Unable to parse recipe. Gemini provided invalid JSON.", {
        cause: err,
      });
    }

    return {
      title: geminiRecipe.title,
      imageSource: geminiRecipe.imageUrl,
      tags: geminiRecipe.tags.map((t) => ({ id: "", value: parseTag(t) })),
      prepTime: parseTime(geminiRecipe.prepTime),
      cookTime: parseTime(geminiRecipe.cookTime),
      yields: `${geminiRecipe.yield}`,
      directions: geminiRecipe.instructions.map((i) => {
        return { value: i };
      }),
      notes: geminiRecipe.notes.map((i) => {
        return { value: i };
      }),
      ingredientSections: geminiRecipe.ingredients.map((i) =>
        parseIngredientSection(i)
      ),
    };
  }

  // TODO : fallback to initial page if printed version is bad
  async promptLlmForRecipe(url: string) {
    const webPage = await getWebPage(url);
    const trimmedWebPage = trimWebPage(webPage);
    console.debug(`Trimmed page length ${trimmedWebPage.length}`);

    const prompt = `You are an expert at parsing HTML.
        Provide to me in JSON format 
        the recipe title named title, 
        the recipe image url named imageUrl, 
        the preparation time named prepTime,
        the cooking time named cookTime, 
        the yield, 
        the recipe instructions as a string array named instructions, 
        2 to 3 tags (for example the main dish protein, the dish nationality, whether it is a side/main course/dessert, etc.) as a string array,
        and the recipe notes as written in a string array named notes from the following HTML page.
        Also include the recipe ingredients named ingredients in the following JSON layout : {header: string, ingredients: {"quantity", "unit", "name", "other" }[]}[]: 
        \n${trimmedWebPage}
        You can reuse text from the prompt without issue.`;

    let response: string;
    try {
      response = await getGeminiResponse(prompt, this.gemini_api_key as string);
    } catch {
      response = await getGptResponse(prompt);
    }

    console.debug(response);
    const recipeJSON = response.replaceAll("```", "").replace("json", "");
    return recipeJSON;
  }
}

async function getWebPage(url: string) {
  const res = await fetch(url);
  const initialWebPage = await res.text();
  console.debug(`Initial web page length ${initialWebPage.length}`);

  // Deactivated as it is too unreliable.
  // const printableWebPage = await getPrintableVersion(initialWebPage);
  // console.debug(`Printable web page length ${printableWebPage.length}`);

  return initialWebPage;
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
