import { createBrowserRouter } from "react-router";
import { MainLayout } from "../layouts/MainLayout";
import { UsersPage } from "../users/UsersPage";
import { RecipePage } from "../recipes/RecipePage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { path: 'users', Component: UsersPage },
      { path: 'recipes', Component: RecipePage },
    ]
  }
])


