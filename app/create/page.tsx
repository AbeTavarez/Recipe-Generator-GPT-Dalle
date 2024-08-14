"use client";
import { FormEvent, useState } from "react";
import generateRecipe from "@/actions/generateRecipe";

export default function CreatePage() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    try {
        e.preventDefault();
        setLoading(true);
        console.log(ingredients);
        await generateRecipe(ingredients);

    } catch (error) {
        console.log(error);
    } finally {
        setLoading(false);
    }
  }

  return (
    <div className="h-screen bg-gradient-to-r from-green-200 to-amber-200">
      <h1 className="text-3xl font-bold pt-10 ml-5 font-serif">
        Generate a new recipe
      </h1>

      <div className="flex flex-col items-center">
        <form onSubmit={handleSubmit} className="flex flex-col w-96 h-96">
          <label
            htmlFor="ingredients"
            className="font-bold text-lg text-center underline mt-10"
          >
            Which ingredients, would you like to use?
          </label>

          <textarea
            onChange={(e) => setIngredients(e.target.value.split(","))}
            id="ingredients"
            className="border mt-2 flex-1 p-1 font-sans"
            placeholder="Enter ingredients separated by commas: (ex: rice, chicken, peppers)"
            required
            disabled={loading}
          />

          <input
            type="submit"
            className={`mt-5 border rounded bg-green-500 text-white p-1 mx-5 md:mx-0 border-green-500 hover:border-green-950 hover:cursor-pointer ${loading && 'animate-pulse'}`}
            value={loading ? 'Generating...': 'Generate'}
            disabled={loading}
          />
        </form>
      </div>
    </div>
  );
}
