"use server";
import OpenAI from "openai";
import { v2 as cloudiary } from "cloudinary";
import mongoDBClient from "@/db";
import { redirect } from "next/navigation";
import { RecipeOptions } from "@/types";
import { generateRecipePrompt } from "@/utils";

// OPENAI Client
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Cloudirary Client
cloudiary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

export default async function generateRecipe(
  ingredients: string[],
  recipeOptions: RecipeOptions,
) {
  const db = await mongoDBClient.db("recipe_generator");
  let recipePath;

  try {
    console.log(ingredients);

    // Generate Recipe
    const recipePrompt = generateRecipePrompt(ingredients, recipeOptions);
     
    console.log(recipePrompt);

    // OpenAI API call
    const recipeCompletion = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: recipePrompt,
        },
      ],
      model: "gpt-4o-mini",
      temperature: 0.7,
      response_format: { type: "json_object" },
    });

    console.log(recipeCompletion.choices[0].message.content);
    const content = recipeCompletion.choices[0].message.content as string;
    const recipeData = JSON.parse(content);

    // Generate the dish image
    const recipeTitle = recipeData?.title;

    if (!recipeTitle) {
      throw new Error("Recipe title is required for image generation!");
    }

    const imagePrompt = `${recipeTitle}, professional food photography.`;

    // OpenAI Dalle API call
    const imageCompletion = await openai.images.generate({
      model: "dall-e-3",
      prompt: imagePrompt,
      size: "1024x1024",
      quality: "standard",
      n: 1,
    });

    console.log(imageCompletion);

    const imageURL = imageCompletion.data[0].url;

    // Store image in cloudinary
    const imageFileName = recipeTitle.split(" ").join("_").toLowerCase();

    const uploadResult = await cloudiary.uploader.upload(imageURL!, {
      public_id: imageFileName,
    });

    console.log(uploadResult);

    // Store recipe and image in MongoDB
    const savedRecipe = await db.collection("recipes").insertOne({
      recipe_title: recipeTitle,
      recipe_content: content,
      recipe_image: uploadResult.url,
    });

    console.log(savedRecipe);

    recipePath = savedRecipe.insertedId;
  } catch (error) {
    console.log(error);
  } finally {
    redirect(`/recipe/${recipePath}`);
  }
}
