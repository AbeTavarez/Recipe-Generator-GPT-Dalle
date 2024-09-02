"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import generateRecipe from "@/actions/generateRecipe";
import { RecipeOptions } from "@/types";

const allergenOptions = [
  { value: "exclude nuts", label: "Exclude Nuts" },
  { value: "exclude dairy", label: "Exclude Dairy" },
  { value: "exclude eggs", label: "Exclude Eggs" },
  { value: "exclude soy", label: "Exclude Soy" },
  { value: "exclude shellfish", label: "Exclude Shellfish" },
];

export default function CreatePage() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [recipeOptions, setRecipeOptions] = useState<RecipeOptions>({
    dietaryPreferences: "",
    cuisineType: "",
    mealType: "",
    cookingTime: "",
    servingSize: "",
    difficultyLevel: "",
    flavorProfile: "",
    cookingMethod: "",
    nutritionalPreference: "",
    occasion: "",
    allergenFilters: [],
  });

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      setLoading(true);
      console.log(ingredients);
      await generateRecipe(ingredients, recipeOptions);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    setRecipeOptions((prevState) => {
      const newFilters = checked
        ? [...prevState.allergenFilters, value]
        : prevState.allergenFilters.filter((i) => i !== value);
      return { ...prevState, allergenFilters: newFilters };
    });
  };

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setRecipeOptions((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <div className="h-full bg-gradient-to-r from-green-200 to-amber-200 ">
      <h1 className="text-3xl font-bold pt-10 ml-5 font-serif">
        Generate a new recipe
      </h1>

      <div className="flex flex-col items-center">
        <form onSubmit={handleSubmit} className="flex flex-col w-[50%]">
          <label
            htmlFor="ingredients"
            className="font-bold text-lg text-center underline mt-10"
          >
            Which ingredients, would you like to use?
          </label>

          <textarea
            onChange={(e) => setIngredients(e.target.value.split(","))}
            id="ingredients"
            className="border mt-2 p-1 font-sans"
            placeholder="Enter ingredients separated by commas: (ex: rice, chicken, peppers)"
            required
            disabled={loading}
          />

          {/*
    <!-- Dietary Preferences -->
    */}
          <label htmlFor="dietary-preferences">Dietary Preferences:</label>
          <select
            id="dietary-preferences"
            name="dietaryPreferences"
            value={recipeOptions.dietaryPreferences}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select Dietary Preference
            </option>
            <option value="vegan">Vegan</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="gluten-free">Gluten-Free</option>
            <option value="keto">Keto</option>
            <option value="paleo">Paleo</option>
            <option value="low-carb">Low-Carb</option>
            <option value="dairy-free">Dairy-Free</option>
            <option value="nut-free">Nut-Free</option>
          </select>

          {/*
    <!-- Cuisine Type -->
    */}
          <label htmlFor="cuisine-type">Cuisine Type:</label>
          <select
            id="cuisine-type"
            name="cuisineType"
            value={recipeOptions.cuisineType}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select Cuisine Type
            </option>
            <option value="italian">Italian</option>
            <option value="mexican">Mexican</option>
            <option value="chinese">Chinese</option>
            <option value="indian">Indian</option>
            <option value="mediterranean">Mediterranean</option>
            <option value="american">American</option>
            <option value="thai">Thai</option>
            <option value="japanese">Japanese</option>
          </select>

          {/*
    <!-- Meal Type -->
    */}
          <label htmlFor="meal-type">Meal Type:</label>
          <select
            id="meal-type"
            name="mealType"
            value={recipeOptions.mealType}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select Meal Type
            </option>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="snack">Snack</option>
            <option value="dessert">Dessert</option>
            <option value="appetizer">Appetizer</option>
          </select>

          {/*
    <!-- Cooking Time -->
    */}
          <label htmlFor="cooking-time">Cooking Time:</label>
          <select
            id="cooking-time"
            name="cookingTime"
            value={recipeOptions.cookingTime}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select Cooking Time
            </option>
            <option value="under 15 minutes">Under 15 Minutes</option>
            <option value="under 30 minutes">Under 30 Minutes</option>
            <option value="under 1 hour">Under 1 Hour</option>
            <option value="over 1 hour">Over 1 Hour</option>
          </select>

          {/*
    <!-- Serving Size -->
    */}
          <label htmlFor="serving-size">Serving Size:</label>
          <select
            id="serving-size"
            name="servingSize"
            value={recipeOptions.servingSize}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select Serving Size
            </option>
            <option value="single serving">Single Serving</option>
            <option value="2-4 servings">2-4 Servings</option>
            <option value="4-6 servings">4-6 Servings</option>
            <option value="family size">Family Size (6+ Servings)</option>
          </select>

          {/*
    <!-- Difficulty Level -->
    */}
          <label htmlFor="difficulty-level">Difficulty Level:</label>
          <select
            id="difficulty-level"
            name="difficultyLevel"
            value={recipeOptions.difficultyLevel}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select Difficulty Level
            </option>
            <option value="easy">Easy</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>

          {/*
    <!-- Flavor Profile -->
    */}
          <label htmlFor="flavor-profile">Flavor Profile:</label>
          <select
            id="flavor-profile"
            name="flavorProfile"
            value={recipeOptions.flavorProfile}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select Flavor Profile
            </option>
            <option value="spicy">Spicy</option>
            <option value="savory">Savory</option>
            <option value="sweet">Sweet</option>
            <option value="tangy">Tangy</option>
            <option value="herby">Herby</option>
            <option value="umami">Umami</option>
          </select>

          {/*
    <!-- Cooking Method -->
    */}
          <label htmlFor="cooking-method">Cooking Method:</label>
          <select
            id="cooking-method"
            name="cookingMethod"
            value={recipeOptions.cookingMethod}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select Cooking Method
            </option>
            <option value="baking">Baking</option>
            <option value="grilling">Grilling</option>
            <option value="stovetop">Stovetop</option>
            <option value="slow cooker">Slow Cooker</option>
            <option value="air fryer">Air Fryer</option>
            <option value="pressure cooker">Pressure Cooker</option>
          </select>

          {/*
    <!-- Nutritional Preferences -->
    */}
          <label htmlFor="nutritional-preferences">
            {" "}
            Nutritional Preferences:{" "}
          </label>
          <select
            id="nutritional-preferences"
            name="nutritionalPreference"
            value={recipeOptions.nutritionalPreference}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select Nutritional Preferences
            </option>
            <option value="low-calorie">Low-Calorie</option>
            <option value="high-protein">High-Protein</option>
            <option value="low-fat">Low-Fat</option>
            <option value="high-fiber">High-Fiber</option>
          </select>

          {/*
    <!-- Occasion -->
    */}
          <label htmlFor="occasion">Occasion:</label>
          <select
            id="occasion"
            name="occasion"
            value={recipeOptions.occasion}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select Occasion
            </option>
            <option value="romantic dinner">Romantic Dinner</option>
            <option value="party">Party</option>
            <option value="picnic">Picnic</option>
            <option value="bbq">BBQ</option>
            <option value="comfort food">Comfort Food</option>
          </select>

          {/*
      <!-- Allergen Filters -->
      */}
          <label htmlFor="allergen-filters">Allergen Filters:</label>
          <>
            {allergenOptions.map((option) => (
              <div key={option.value} id="allergen-filters">
                <input
                  type="checkbox"
                  value={option.value}
                  checked={recipeOptions.allergenFilters.includes(option.value)}
                  onChange={handleCheckboxChange}
                />
                <label>{option.label}</label>
              </div>
            ))}
          </>
          <input
            type="submit"
            className={`mt-5 border rounded bg-green-500 text-white p-1 mx-5 md:mx-0 border-green-500 hover:border-green-950 hover:cursor-pointer ${
              loading && "animate-pulse"
            }`}
            value={loading ? "Generating..." : "Generate"}
            disabled={loading}
          />
        </form>
      </div>
    </div>
  );
}
