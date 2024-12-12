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
  return (
    <div id="pokemon-list">
      {pokemons.map((pokemon, index) => (
        <div key={index} className="pokemon-card" onClick={() => details_on_click(index)}>
          <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`} alt={pokemon.name} className="pokemon-image"></img>
          <h3 className="pokemon-name">{pokemon.name}</h3>
        </div>
      ))}
    </div>
  );
}

async function getDetailsForPokemon(id) {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response.status: ${response.status}`);
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error.message);
  }
}
function DisplayPokemonDetails({ pokemon_details, id }) {
  const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id + 1}.png`;
  if (pokemon_details) {
    const name = pokemon_details.name;
    let type = "";
    if (pokemon_details.types.length == 1) {
      type = pokemon_details.types[0].type.name;
    } else {
      const type1 = pokemon_details.types[0].type.name;
      const type2 = pokemon_details.types[1].type.name;
      type = type1.concat(", ", type2);
    }
    const hp = pokemon_details.stats[0].base_stat;
    const attack = pokemon_details.stats[1].base_stat;
    const defense = pokemon_details.stats[2].base_stat;
    const height = pokemon_details.height;
    const weight = pokemon_details.weight;
    return (
      <div key={id} id="pokemon-details-container">
        <div className="pokemon-details">
          <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id + 1}.png`} alt={name} className="pokemon-image"></img>
          <h3 className="pokemon-name">{name}</h3>
          <h4 className="typy">typy: {type}</h4>
          <h4 className="statystyki">
            statystyki: hp({hp}), attack({attack}), defense({defense})
          </h4>
          <h4 className="wzrost">wzrost: {height}</h4>
          <h4 className="waga">waga: {weight}</h4>
        </div>
      </div>
    );
  }
}
const detailsRoot = ReactDOM.createRoot(document.getElementById("root-details"));

async function details_on_click(id) {
  const pokemon_details = await getDetailsForPokemon(id);
  detailsRoot.render(<DisplayPokemonDetails pokemon_details={pokemon_details} id={id} />);
}
async function renderApp() {
  const pokemons = await getPokemons();
  ReactDOM.createRoot(document.getElementById("root-list")).render(<DisplayPokemons pokemons={pokemons} />);
}
renderApp();
