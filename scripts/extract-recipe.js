
const dotenv = require('dotenv');
const gemini = require('@google/generative-ai');

dotenv.config();

const genAI = new gemini.GoogleGenerativeAI(process.env.EXPO_PUBLIC_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// promptGemini(`https://www.ricardocuisine.com/en/recipes/5769-moist-chocolate-cake-in-a-cup`);
// promptGemini(`https://www.budgetbytes.com/wprm_print/slow-cooker-chicken-tikka-masala#`);
promptGemini(`https://www.ricardocuisine.com/recettes/5769-gateau-moelleux-au-chocolat-dans-une-tasse`);

async function promptGemini(url) {
    let res = await fetch(url)
    const webPage = await res.text()

    const result = await model.generateContent(`Provide to me in JSON format 
        the recipe title, 
        the recipe instructions as a string array, 
        and the recipe notes as written in a string array from the following HTML page.
        Also include the recipe ingredients in the following JSON layout : {"amount", "unit", "name", "other" } :\n${webPage}`);
    console.log(result.response.text());
}
