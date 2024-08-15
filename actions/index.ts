"use server";

import mongoDBClient from "@/db";
import { Recipe } from "@/types";
import { ObjectId } from "mongodb";

const db = mongoDBClient.db("recipe_generator");

/**
 * Gets single recipe by the _id
 * @param id 
 * @returns 
 */
export async function getRecipeById(id: string) {
  try {
    const recipe = await db
      .collection<Recipe>("recipes")
      .findOne({ _id: ObjectId.createFromHexString(id) });

    if (!recipe) {
      throw new Error(`Recipe not found with id: ${id}`);
    }

    return recipe;
  } catch (error) {
    console.log(error);
  }
}

/**
 * GET
 * @returns an array of Recipes
 */
export async function getAllRecipes() {
  try {
    const recipes = await db.collection<Recipe>('recipes').find().toArray();

    if (!recipes) {
      throw new Error("Error fetching recipes from mongodb");
    }
    return recipes;
  } catch (error) {
    console.error(error);
    
  }
}
