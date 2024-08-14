"use server";

import mongoDBClient from "@/db";
import { Recipe } from "@/types";
import { ObjectId } from "mongodb";

export async function getRecipeById(id: string) {
  try {
    const db = await mongoDBClient.db("recipe_generator");
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
