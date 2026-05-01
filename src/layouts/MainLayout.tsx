import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Outlet, useNavigate } from "react-router"

export const MainLayout = () => {

  const navigate = useNavigate()

  const handleTabsChange = (e: string) => {
    navigate(`/${e}`)
  }

  return (
    <main className="w-full p-8 xl:p-20">
      <header className="w-full flex flex-row justify-center items-center"><img className="w-fit" src="https://www.dazasoftware.com/assets/img/daz_logo2.png" /></header>
      <Tabs className="w-full p-2">
        <TabsList className="w-full">
          <TabsTrigger className="text-2xl" onClick={() => handleTabsChange('users')} value="users">Usuarios</TabsTrigger>
          <TabsTrigger className="text-2xl" onClick={() => handleTabsChange('recipes')} value="recipes">Recetas</TabsTrigger>
        </TabsList>
      </Tabs>
      <Outlet />
    </main>
  )
}

