import { RecipeModel, RecipeSummaryModel } from "@/models/mugcakeApiModels";

const baseUrl = process.env.EXPO_PUBLIC_MUGCAKE_API_URL;

function BuildRequest(
  method: "GET" | "POST" | "DELETE" | "PUT" | "PATCH",
  endpoint: string,
  body?: string
) {
  const headers: Headers = new Headers();
  // Add a few headers
  headers.set("Content-Type", "application/json");
  headers.set("Accept", "application/json");

  const req = new Request(baseUrl + endpoint, {
    method: method,
    headers: headers,
    body: body,
  });

  console.log("Performing following request : " + req.method + " " + req.url);
  console.debug(`Body : ${body}`);
  return req;
}

async function GetResponse(request: Request) {
  try {
    return fetch(request)
      .then((res) => res.json())
      .then((res) => {
        console.debug(`${request.method} request got ${JSON.stringify(res)}`);
        return res;
      });
  } catch (err) {
    console.error(err);
  }
}

export async function GetExtractorKey(): Promise<string> {
  const request: RequestInfo = BuildRequest("GET", "/extractor/key");
  return GetResponse(request).then((res) => {
    return res.Key as string;
  });
}

export async function GetRecipeSummaries(): Promise<RecipeSummaryModel[]> {
  const request: RequestInfo = BuildRequest("GET", "/recipes/summaries");

  return GetResponse(request).then((res) => {
    const out = res.Summaries as RecipeSummaryModel[];
    out.map((o) => {
      if (!o.tags) o.tags = [];
      if (!o.favorite) o.favorite = false;
    });
    return out;
  });
}

export async function GetRecipe(recipeId: number): Promise<RecipeModel> {
  const request: RequestInfo = BuildRequest("GET", `/recipes/${recipeId}`);

  return GetResponse(request).then((res) => {
    const out = res.Recipe;
    out.ingredientSections = out.ingredientSections
      ? out.ingredientSections
      : [];
    out.tags = out.tags ? out.tags.map((d: string) => ({ value: d })) : [];
    out.directions = out.directions
      ? out.directions.map((d: string) => ({ value: d }))
      : [];
    out.notes = out.notes ? out.notes.map((n: string) => ({ value: n })) : [];
    return out as RecipeModel;
  });
}

export async function DeleteRecipe(recipeId: number) {
  const request: RequestInfo = BuildRequest("DELETE", `/recipes/${recipeId}`);
  return fetch(request);
}

export async function UpdateRecipe(recipeId: number, recipe: RecipeModel) {
  const body = parseBody(recipe);

  const request: RequestInfo = BuildRequest(
    "PUT",
    `/recipes/${recipeId}`,
    body
  );
  return fetch(request);
}

export async function PatchRecipe(recipeId: number, favorite: boolean) {
  const request: RequestInfo = BuildRequest(
    "PATCH",
    `/recipes/${recipeId}?favorite=${favorite}`
  );
  return fetch(request);
}

export async function PostRecipe(recipe: RecipeModel): Promise<number> {
  const body = parseBody(recipe);

  const request: RequestInfo = BuildRequest("POST", `/recipes`, body);
  return GetResponse(request).then((res) => res.ID as number);
}

function parseBody(recipe: RecipeModel) {
  const body = {
    favorite: recipe.favorite,
    title: recipe.title,
    url: recipe.url,
    imageSource: recipe.imageSource,
    tags: recipe.tags.map((t) => t.value),
    prepInfo: recipe.prepInfo,
    ingredientSections: recipe.ingredientSections,
    directions: recipe.directions.map((d) => d.value),
    notes: recipe.notes.map((n) => n.value),
  };
  try {
    return JSON.stringify(body);
  } catch (error) {
    console.error(error);
  }
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
