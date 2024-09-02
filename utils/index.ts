import { RecipeOptions } from "@/types";

const formatKey = (key: string) => {
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
  };

export function generateRecipePrompt(
  ingredients: string[],
  recipeOptions: RecipeOptions,
) {

    // Prompt Sections Array
  const promptSections = [
    'Create a detailed recipe based on only the following ingredients:\n',
      ...ingredients,
      '\nMake sure the recipe follows the following preferences:\n',
  ];

  // Loops over the recipe options object and add the options to the array
  Object.entries(recipeOptions).forEach(([key, value]) => {
    if (Array.isArray(value) && value.length > 0) {
        promptSections.push(`Allergen Filters: ${value.join(', ')}\n`)
    } else {
        promptSections.push(`${formatKey(key)}: ${value}\n`)
    }
  })


  promptSections.push(`
    Give the recipe a title.
    Format the recipe in a HTML body with semantic elements.
    Give back the result in JSON as follow:
     {
        title: Recipe Title,
        recipe: Recipe formatted in HTML
     }
     Don't add any other markup.
    `);

    return promptSections.join('');
    
}
