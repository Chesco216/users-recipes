
export interface RecipeFromStorage {
  updates: [
    {
      userId: number
      recipeId: number
    }
  ]
}

export const updateUserFavorite = (userId: number, recipeId: number) => {

  const recipesStored = localStorage.getItem('recipes')


  if (recipesStored) {
    let recipes: RecipeFromStorage
    recipes = JSON.parse(recipesStored)
    const filteredRecipes = recipes.updates.filter(r => r.recipeId != recipeId)
    recipes = {
      updates: [
        ...filteredRecipes,
        {
          userId: userId,
          recipeId: recipeId
        }
      ]
    }
    localStorage.setItem('recipes', JSON.stringify(recipes))
  } else {
    const recipes = {
      updates: [
        {
          userId: userId,
          recipeId: recipeId
        }
      ]
    }
    localStorage.setItem('recipes', JSON.stringify(recipes))
  }


}
