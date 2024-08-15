import { getAllRecipes } from "@/actions";
import RecipeCard from "@/components/recipe-card";
export default async function RecipesPage() {
  const recipes = await getAllRecipes();

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold font-serif mb-10">Recipes</h1>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        {recipes &&
          recipes.map((recipe) => (
            <RecipeCard key={recipe._id.toString()} recipe={recipe} />
          ))}
      </div>
    </div>
  );
}
