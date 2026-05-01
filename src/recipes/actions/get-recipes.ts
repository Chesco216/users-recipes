import type { RecipesResponse } from "../schema/Recipes.schema"

export const getRecipes = async (skip: string, limit: string) => {
  const BASE_URL = import.meta.env.VITE_BASE_API_URL

  try {

    const res = await fetch(`${BASE_URL}/recipes?limit=${limit}&skip=${skip}`)
    const data: RecipesResponse = await res.json()

    return data
  } catch (error) {
    console.log(error)
  }

}
