export type Ingredient = {
  quantity: string;
  unit: string;
  name: string;
  other: string;
};

export type IngredientSection = {
  header: string;
  ingredients: Ingredient[];
};

export type GeminiRecipe = {
  title: string;
  imageUrl: string;
  tags: string[];
  prepTime: string;
  cookTime: string;
  yield: string;
  instructions: string[];
  notes: string[];
  ingredients: IngredientSection[];
};
