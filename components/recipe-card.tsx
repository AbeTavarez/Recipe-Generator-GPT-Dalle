import { Recipe } from "@/types"
import Image from "next/image";
import Link from "next/link";

type RecipeCardProps = {
    recipe: Recipe
}

export default function RecipeCard({recipe}: RecipeCardProps) {
    const {recipe_title, recipe_image, _id} = recipe;

    return (
        <Link href={`/recipe/${_id}`} className="flex flex-col border rounded hover:scale-105 hover:transition hover:ease-in-out hover:delay-150">
            <h2 className="ml-2">{recipe_title}</h2>

            <div className="mt-auto">
                <Image
                   src={recipe_image}
                   alt={recipe_title}
                   width={400}
                   height={400}
                   sizes="100vw"
                   style={{width: '100%', height:'100%' }}
                   className="object-cover"
                />
            </div>
        </Link>
    )
}