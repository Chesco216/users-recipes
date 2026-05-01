import type { UserSchema } from "../schema/User.schema"
import type { UsersResponse } from "../schema/UsersResponse.schema"

export const getAllUsers = async () => {

  const BASE_URL = import.meta.env.VITE_BASE_API_URL

  try {
    const usersStored = localStorage.getItem('users')

    if (usersStored) return JSON.parse(usersStored)

    const res = await fetch(`${BASE_URL}/users`)
    const data: UsersResponse = await res.json()
    const users: UserSchema[] = data.users.map(user => ({
      id: user.id,
      name: user.firstName + " " + user.lastName,
      username: "@" + user.username,
      email: user.email,
      age: user.age,
      image: user.image,
      phone: user.phone,
      city: user.address.city,
      country: user.address.country,
      university: user.university,
      company: user.company.name,
    }))

    return users
  } catch (error) {
    console.log(error)
  }
}
