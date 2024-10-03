const dotenv = require("dotenv");
const gemini = require("@google/generative-ai");

dotenv.config();

const genAI = new gemini.GoogleGenerativeAI(
  process.env.EXPO_PUBLIC_GEMINI_API_KEY
);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// boilDownRecipe(`https://www.ricardocuisine.com/en/recipes/5769-moist-chocolate-cake-in-a-cup`);
// boilDownRecipe(`https://www.budgetbytes.com/wprm_print/slow-cooker-chicken-tikka-masala#`);
boilDownRecipe(
  `https://www.ricardocuisine.com/recettes/5769-gateau-moelleux-au-chocolat-dans-une-tasse`
);
// boilDownRecipe(`https://www.okonomikitchen.com/5-easy-marinades-for-tempeh/print/10193/`);
// boilDownRecipe(`https://www.gimmesomeoven.com/italian-orzo-tuna-salad/`);

async function boilDownRecipe(url) {
  let res = await fetch(url);
  const webPage = await getPrintableVersion(res);
  console.log(`Web page length ${webPage.length}`);

  const trimmedWebPage = trimWebPage(webPage);
  console.log(`Trimmed page length ${trimmedWebPage.length}`);

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
  const recipeJSON = geminiResponse.replaceAll("\n```", "").replace("```json\n", "");
  console.log(recipeJSON);
}

async function getPrintableVersion(res) {
  const initialPage = await res.text();

  const printUrlPattern = /(?<=href=\")(.*?print.*?(?=\"))/;
  const printUrl = initialPage.match(printUrlPattern);

  try {
    console.debug(printUrl[0]);
    const res = await fetch(printUrl[0]);
    return res.text();
  } catch {
    return initialPage;
  }
}

function trimWebPage(webPage) {
  const styleTagsPattern = /<style.*?<\/style>/gs;
  const svgTagsPattern = /<svg.*?<\/svg>/gs;
  const preTrimPage = webPage
    .replace(styleTagsPattern, "")
    .replace(svgTagsPattern, "");

  const scriptsPattern = /<script.*?<\/script>/gs; // All scripts
  const matches = preTrimPage.match(scriptsPattern);

  const scriptWithIngredients =
    /<script.*(ingredients|ingrédients).*<\/script>/i; // scripts that contain the word "ingredients"
  const scriptsToRemove = matches.filter(
    (m) => m.match(scriptWithIngredients) === null
  );

  let trimmedWebPage = preTrimPage;
  scriptsToRemove.forEach((scriptToRemove) => {
    trimmedWebPage = trimmedWebPage.replace(scriptToRemove, "");
  });

  return trimmedWebPage;
}
