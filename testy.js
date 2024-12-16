// const samplePokemons = [{ name: "Bulbasaur" }, { name: "Ivysaur" }, { name: "Venusaur" }];
// function getPokemons({ pokemons }) {
//   console.log(pokemons);
// }
// getPokemons(samplePokemons);
async function getPokemons() {
  const url = "https://pokeapi.co/api/v2/pokemon";
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
function DisplayPokemons({ pokemons }) {
  console.log(pokemons);
}
async function obsluguje() {
  const pokemons = await getPokemons();
  if (pokemons) {
    console.log(pokemons);
  }
}

obsluguje();
