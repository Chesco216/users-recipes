import { useEffect, useState } from "react"
import type { RecipesResponse } from "./schema/Recipes.schema"
import { CustomPagination } from "@/components/custom/CustomPagination"
import { useSearchParams } from "react-router"
import { getRecipes } from "./actions/get-recipes"
import { RecipeGrid } from "./components/RecipeGrid"
import type { RecipeFromStorage } from "./actions/update-user-favorite"

export const RecipePage = () => {

  const [recipes, setRecipes] = useState<RecipesResponse>()
  const [searchParams, setSearchParams] = useSearchParams()

  const page = searchParams.get('page') ?? 1
  const limit = searchParams.get('limit') ?? 5
  const totalPages = Math.ceil(recipes?.total / +limit)
  const skip = (+page - 1) * +limit

  useEffect(() => {
    getRecipes(skip.toString(), limit.toString())
      .then(res => {
        const storedUpdates: RecipeFromStorage = JSON.parse(localStorage.getItem('recipes') ?? 'null')
        if (storedUpdates) {
          const updatedRecipes = res?.recipes.map(r => {
            const isUpdated = storedUpdates.updates.find(u => u.recipeId === r.id)
            if (isUpdated) {
              return { ...r, userId: isUpdated.userId }
            } else {
              return r
            }
          })
          setRecipes({ ...res, recipes: updatedRecipes })
        } else {
          setRecipes(res)
        }
      })
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

