"use server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function generateRecipe(ingredients: string[]) {
  try {
    console.log(ingredients);

    // Generate Recipe
    const recipePrompt =
      `
        Create a detailed recipe based on only the following ingredients:
        ` +
      ingredients.join(",") +
      `

        Give the recipe a title.
        Format the recipe in a HTML body with semantic elements.
        Give back the result in JSON as follow:
         {
            title: Recipe Title,
            recipe: Recipe formatted in HTML
         }
         Don't add any other markup.
        `;
         console.log(recipePrompt);

         // OpenAI API call
         const recipeCompletion = await openai.chat.completions.create({
            messages: [
                {
                    role: 'user',
                    content: recipePrompt
                }
            ],
            model: 'gpt-4o-mini',
            temperature: 0.7,
            response_format: {type: 'json_object'}
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
            model: 'dall-e-3',
            prompt: imagePrompt,
            size: '1024x1024',
            quality: 'standard',
            n: 1
         });

         console.log(imageCompletion);
        


         

  } catch (error) {
    console.log(error);
  }
}
