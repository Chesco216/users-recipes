import { useEffect, useState } from "react"
import { getAllUsers } from "./actions/get-all-users"
import type { UserSchema } from "./schema/User.schema"
import { useSearchParams } from "react-router"
import { UserCard } from "./components/UserCard"
import { CustomCombobox } from "../components/custom/CustomCombobox"

export const UsersPage = () => {

  const [users, setUsers] = useState<UserSchema[]>([])

  useEffect(() => {
    getAllUsers()
      .then(res => setUsers(res))
      .catch(err => console.log({ err }))
  }, [])

  return (
    <section className="mt-10">
      <h2 className="mb-3">Seleccionar Usuario</h2>
      <CustomCombobox
        users={users}
      />
      <UserCard users={users} />
    </section>
  )
}

