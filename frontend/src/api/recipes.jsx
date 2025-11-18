import axios from "axios";

export async function generateRecipes(prompt) {
  const response = await axios.post(
    `${import.meta.env.VITE_RECIPES_API_URL}/generate`,
    { text: prompt }
  );

  return response.data; // { message: string, recipes: [] }
}
