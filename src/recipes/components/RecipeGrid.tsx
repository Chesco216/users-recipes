import { useEffect, useState } from "react"
import type { Recipe } from "../schema/Recipes.schema"
import { RecipeCard } from "./RecipeCard"
import { CustomCombobox } from "../../components/custom/CustomCombobox"
import { getAllUsers } from "@/users/actions/get-all-users"
import type { UserSchema } from "@/users/schema/User.schema"
import { Button } from "@/components/ui/button"
import { updateUserFavorite } from "../actions/update-user-favorite"
import { useSearchParams } from "react-router"

interface Props {
  recipes: Recipe[]
}

export const RecipeGrid = ({ recipes }: Props) => {

  const [focused, setFocused] = useState<number>(0)
  const [users, setUsers] = useState<UserSchema[]>([])
  const [searchParams, setSearchParams] = useSearchParams()
  const userId = searchParams.get('user')

  useEffect(() => {
    getAllUsers()
      .then(res => setUsers(res))
      .catch(err => console.log({ err }))
  }, [])

  return (
    <section className="flex flex-col gap-1 xl:p-10">
      {
        (recipes) &&
        recipes.map(recipe =>
          <RecipeCard recipe={recipe} focused={focused ?? 0} setFocused={setFocused} />
        )
      }
      <footer className="grid grid-cols-5">
        <div className="col-span-4">
          <CustomCombobox users={users} defaultVal={focused} />
        </div>
        <Button
          onClick={() => updateUserFavorite(userId, focused)}
          className="col-span-1"
        >
          Asignar
        </Button>
      </footer>
    </section >
  )
}

