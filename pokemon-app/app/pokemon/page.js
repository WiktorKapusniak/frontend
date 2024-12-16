// pokemon/page.js
import DisplayPokemons from "../components/PokemonList";
async function getPokemons() {
  const url = "https://pokeapi.co/api/v2/pokemon?limit=100";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    return json.results;
  } catch (error) {
    console.error(error.message);
    return [];
  }
}
async function pokemonStatsAPI(idOrName) {
  const api = `https://pokeapi.co/api/v2/pokemon/${idOrName}`;
  try {
    const res = await fetch(api);
    if (!res.ok) {
      throw new Error(res.status);
    }

    const data = await res.json();
    return {
      name: data.name,
      types: data.types.map((x) => x.type.name).join(", "),
      stats: data.stats.map((x) => `${x.stat.name}: ${x.base_stat}`).join(", "),
      weight: data.weight,
      height: data.height,
      image: data.sprites.front_default,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}
export default async function PokemonPage() {
  const pokemons = await getPokemons();
  const pokelist = await Promise.all(
    pokemons.map(async (x, index) => {
      const stats = await pokemonStatsAPI(x.name);
      return { ...x, index: index, type: stats.types };
    })
  );
  if (pokelist) {
    return (
      <div>
        <DisplayPokemons pokemons={pokelist} />
      </div>
    );
  }
}
