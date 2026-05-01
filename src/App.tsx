import { RouterProvider } from "react-router"
import { MainLayout } from "./layouts/MainLayout"
import { RecipePage } from "./recipes/RecipePage"
import { router } from "./routes/app.route"

function App() {

  return (
    <>
      {/* <MainLayout> */}
      {/*   <RecipePage /> */}
      {/* </MainLayout> */}
      <RouterProvider router={router} />
    </>
  )
}

export default App
