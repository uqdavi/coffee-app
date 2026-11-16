const API_URL = 'https://coffee-app-3cu0.onrender.com/coffee/';

export async function getCoffees() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`Erro ao buscar cafés: ${response.status}`);
  }

  return await response.json();
}