import { useEffect, useState } from "react"
import type { RecipesResponse } from "./schema/Recipes.schema"
import { CustomPagination } from "@/components/custom/CustomPagination"
import { useSearchParams } from "react-router"
import { getRecipes } from "./actions/get-recipes"
import { RecipeGrid } from "./components/RecipeGrid"

export const RecipePage = () => {

  const [recipes, setRecipes] = useState<RecipesResponse>()
  const [searchParams, setSearchParams] = useSearchParams()

  const page = searchParams.get('page') ?? 1
  const limit = searchParams.get('limit') ?? 5
  const totalPages = Math.ceil(recipes?.total / +limit)
  const skip = (+page - 1) * +limit

  useEffect(() => {
    getRecipes(skip.toString(), limit.toString())
      .then(res => setRecipes(res))
      .catch(err => console.log(err))
  }, [limit, skip])

  return (
    <div>
      <CustomPagination totalPages={totalPages} />
      {
        (recipes) &&
        <RecipeGrid recipes={recipes?.recipes} />
      }
    </div>
  )
}

