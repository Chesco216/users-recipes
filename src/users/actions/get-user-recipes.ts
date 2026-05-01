export const getUserRecipe = async (id: string) => {

  const BASE_URL = import.meta.env.VITE_BASE_API_URL

  try {
    const res = await fetch(`${BASE_URL}/recipe/${id}`)

    return res.json()
  } catch (error) {
    console.log(error)
  }

}
