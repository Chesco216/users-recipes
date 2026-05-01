import type { UserSchema } from "@/users/schema/User.schema"
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "../ui/combobox"
import type React from "react"
import { useEffect, useState, type SetStateAction } from "react"
import { useSearchParams } from "react-router"

interface Props {
  users: UserSchema[]
  defaultVal?: number
}

export const CustomCombobox = ({ users, defaultVal }: Props) => {

  const [searchParams, setSearchParams] = useSearchParams()
  const [displayedUser, setDisplayedUser] = useState('')

  useEffect(() => {
    if (defaultVal) {
      const usr = users.find(u => u.id === defaultVal)
      setSearchParams((searchParams) => {
        searchParams.set("user", defaultVal.toString())
        return searchParams
      })
      if (usr) setDisplayedUser(usr.name)
    }
  }, [defaultVal])

  const handleSelectedUser = (userId: number) => {
    setSearchParams((searchParams) => {
      searchParams.set("user", userId.toString())
      return searchParams
    })
    const user = users.find(user => user.id === userId)
    if (user) setDisplayedUser(user.name)
  }

  return (
    <Combobox items={users} onValueChange={e => handleSelectedUser(e)}>
      <ComboboxInput
        placeholder="Selecciona un usuario"
        value={displayedUser}
        onChange={e => setDisplayedUser(e.target.value)}
      />
      <ComboboxContent>
        <ComboboxEmpty>No se encontraron usuarios</ComboboxEmpty>
        <ComboboxList>
          {(item: UserSchema) => (
            <ComboboxItem
              key={item.id}
              value={item.id}>
              {item.name}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}

