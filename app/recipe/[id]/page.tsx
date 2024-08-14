import Image from "next/image";
import { getRecipeById } from "@/actions";
import { notFound } from "next/navigation";

type RecipeProps = {
  params: {
    id: string;
  };
};

export default async function RecipePage({ params }: RecipeProps) {
  const { id } = params;
  const recipe = await getRecipeById(id);

  if (!recipe) notFound();

  const { recipe_title, recipe_content, recipe_image } = recipe;
  const recipeText = JSON.parse(recipe_content);
  console.log(recipeText);

  return (
    <div className="flex flex-col justify-center items-center p-24 lg:flex-row lg:gap-10">
      <div>
        
        <div className="text-2xl font-bold font-serif">{recipe_title}</div>

        <div className="w-full h-auto my-5">
          <Image
            src={recipe_image}
            alt={recipe_title}
            sizes="100vw"
            width={1024}
            height={1024}
            style={{ width: "100%", height: "auto" }}
            className="object-fill"
          />
        </div>
      </div>

      <div dangerouslySetInnerHTML={{ __html: recipeText.recipe }} />
    </div>
  );
}
