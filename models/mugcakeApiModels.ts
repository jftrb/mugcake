export type RecipeModel = {
  favorite: boolean;
  title: string;
  url: string;
  tags: TagModel[];
  imageSource: string;
  prepInfo: {
    prepTime: string;
    cookTime: string;
    totalTime: string;
    yield: string;
  };
  ingredientSections: IngredientSectionModel[];
  directions: CookingStepModel[];
  notes: NoteModel[];
};

export type RecipeSummaryModel = {
  recipeId: number;
  favorite: boolean;
  title: string;
  totalTime: string;
  tags: string[];
  imageSource: string;
};

export interface IngredientModel {
  quantity: string;
  unit: string;
  ingredient: string;
  other: string;
}

export interface IngredientSectionModel {
  header: string;
  ingredients: IngredientModel[];
}

export type CookingStepModel = {
  value: string;
};

export type NoteModel = {
  value: string;
};

export type TagModel = {
  id: string;
  value: string;
};
