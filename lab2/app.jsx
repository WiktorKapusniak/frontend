function PokemonList({ pokemons }) {
  return (
    <div id="pokemon-list">
      {pokemons.map((pokemon, index) => (
        <div key={index} className="pokemon-card">
          <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`} alt={pokemon.name} className="pokemon-image" />
          <h3 className="pokemon-name">{pokemon.name}</h3>
        </div>
      ))}
    </div>
  );
}

async function getPokemons() {
  const url = "https://pokeapi.co/api/v2/pokemon";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    return json.results; // Lista Pokémonów
  } catch (error) {
    console.error(error.message);
    return []; // W przypadku błędu zwróć pustą tablicę
  }
}

// Główna funkcja do renderowania
async function renderApp() {
  const pokemons = await getPokemons(); // Czekaj na dane
  ReactDOM.createRoot(document.getElementById("root")).render(PokemonList(pokemons));
}

// Uruchom renderowanie aplikacji
renderApp();
