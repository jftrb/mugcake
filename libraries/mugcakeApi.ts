import {
  IngredientModel,
  RecipeModel,
  RecipeSummaryModel,
} from "@/models/mugcakeApiModels";

const baseUrl = "http://192.168.18.12:3000/api";

function BuildRequest(endpoint: string) {
  const headers: Headers = new Headers();
  // Add a few headers
  headers.set("Content-Type", "application/json");
  headers.set("Accept", "application/json");

  const req = new Request(baseUrl + endpoint, {
    method: "GET",
    headers: headers,
  });

  console.log("Performing following request : " + req.method + " " + req.url);
  return req;
}

async function GetResponse(request: RequestInfo) {
  return fetch(request)
    .then((res) => res.json())
    .then((res) => {
      console.log(`GET request got ${JSON.stringify(res)}`);
      return res;
    });
}

export async function GetRecipeSummaries(): Promise<RecipeSummaryModel[]> {
  const request: RequestInfo = BuildRequest("/recipes/summaries");

  return GetResponse(request).then(
    (res) => res.Summaries as RecipeSummaryModel[]
  );
}

export async function GetRecipe(recipeId: number): Promise<RecipeModel> {
  const request: RequestInfo = BuildRequest(`/recipes/${recipeId}`);

  return GetResponse(request).then((res) => {
    const out = res.Recipe;
    out.tags = out.tags.map((d: string) => ({ value: d }));
    out.directions = out.directions.map((d: string) => ({ value: d }));
    out.notes = out.notes.map((n: string) => ({ value: n }));
    return out as RecipeModel;
  });
}

export function parseCapitalJSON(text: string): any {
  return JSON.parse(text, function (prop, value) {
    if (prop.length > 0) {
      var firstLetterLower = prop[0].toLowerCase() + prop.slice(1);
      if (prop === firstLetterLower) return value;
      else this[firstLetterLower] = value;
    } else {
      return value;
    }
  });
}
