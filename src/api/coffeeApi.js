const API_URL = 'http://localhost:3001/coffee';

export async function getCoffees() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`Erro ao buscar cafés: ${response.status}`);
  }

  return await response.json();
}