import { ObjectId } from "mongodb"

export type Recipe = {
    _id: ObjectId;
    recipe_title: string;
    recipe_content: string;
    recipe_image: string;
}