import { useSearchParams } from "react-router"
import type { UserSchema } from "../schema/User.schema"
import { useEffect, useState } from "react"
import { getUserRecipe } from "../actions/get-user-recipes"
import type { Recipe } from "../../recipes/schema/Recipes.schema"


interface Props {
  users: UserSchema[]
}
export const UserCard = ({ users }: Props) => {

  const [favoriteRecipe, setFavoriteRecipe] = useState()
  const [searchParams, setSearchParams] = useSearchParams<Recipe>()

  const userId = searchParams.get('user')
  console.log({ userId })
  useEffect(() => {
    if (userId) {
      getUserRecipe(userId)
        .then(res => setFavoriteRecipe(res))
        .catch(err => console.log(err))
    }
  }, [userId])

  const user: UserSchema = users.find(user => user.id === parseInt(userId))
  console.log({ user })

  return (
    <article>
      {
        (user) &&
        <>
          <header className="flex felx-row items-center gap-4 my-4">
            <img src={user.image} />
            <div>
              <h3 className="text-xl font-semibold">{user.name}</h3>
              <p>{user.username}</p>
              <p>{user.age} años</p>
            </div>
          </header>
          <dl className="flex flex-col xl:grid xl:grid-cols-2 gap-4">
            <div>
              <dt>EMAIL</dt>
              <dd className="text-gray-500">{user.email}</dd>
            </div>
            <div>
              <dt>TELÉFONO</dt>
              <dd className="text-gray-500">{user.phone}</dd>
            </div>
            <div>
              <dt>CUIDAD</dt>
              <dd className="text-gray-500">{user.city}</dd>
            </div>
            <div>
              <dt>PAÍS</dt>
              <dd className="text-gray-500">{user.country}</dd>
            </div>
            <div>
              <dt>UNIVERSIDADL</dt>
              <dd className="text-gray-500">{user.university}</dd>
            </div>
            <div>
              <dt>EMPRESA</dt>
              <dd className="text-gray-500">{user.company}</dd>
            </div>
          </dl>
          {
            (favoriteRecipe) &&
            <>
              <h3 className="mt-5 mb-2">RECETA FAVORITA</h3>
              <div className="w-full flex flex-row items-center gap-4 p-2 border-2 border-amber-200 bg-amber-100 rounded-xl xl:w-100">
                <img
                  className="w-20 rounded-l-xl"
                  src={favoriteRecipe.image}
                />
                <ul>
                  <li className="text-amber-500">{favoriteRecipe.name}</li>
                  <li className="text-amber-500">{favoriteRecipe.cuisine}</li>
                </ul>
              </div>
            </>
          }
        </>
      }
    </article >
  )
}

