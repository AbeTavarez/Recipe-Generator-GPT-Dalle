import { ObjectId } from "mongodb";

export type Recipe = {
  _id: ObjectId;
  recipe_title: string;
  recipe_content: string;
  recipe_image: string;
};

export type RecipeOptions = {
  dietaryPreferences: string;
  cuisineType: string;
  mealType: string;
  cookingTime: string;
  servingSize: string;
  difficultyLevel: string;
  flavorProfile: string;
  cookingMethod: string;
  nutritionalPreference: string;
  occasion: string;
  allergenFilters: string[];
};
