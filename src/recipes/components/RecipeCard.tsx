import type { SetStateAction } from "react"
import type { Recipe } from "../schema/Recipes.schema"

interface Props {
  recipe: Recipe
  focused: number
  setFocused: React.Dispatch<SetStateAction<number>>
}

export const RecipeCard = ({ recipe, focused, setFocused }: Props) => {
  return (
    <div
      className={`flex flex-row items-center gap-5 border-1 border-gray-300 rounded-xl p-3 ${focused === recipe.id ? 'bg-amber-100' : ''}`}
      onClick={() => setFocused(recipe.id)}
    >
      <img className='h-20 rounded-md' src={recipe.image} />
      <div>
        <span>
          <h3 className="text-xl font-semibold mb-2">{recipe.name}</h3>
          <ul className="flex flex-row gap-2">
            <li>{recipe.cuisine}</li>
            <li>•</li>
            <li>{recipe.mealType.join(',')}</li>
          </ul>
          <ul className="flex flex-row text-gray-500 gap-2">
            <li>Prep: {recipe.prepTimeMinutes}min</li>
            <li>•</li>
            <li>Cocción: {recipe.prepTimeMinutes}min</li>
            <li>•</li>
            <li>★ {recipe.prepTimeMinutes}min</li>
          </ul>
          <ul className="flex flex-row text-gray-500 gap-5">
            {
              recipe.tags.map(tag => <li>{tag}</li>)
            }
          </ul>
        </span>
      </div>
    </div>
  )
}

