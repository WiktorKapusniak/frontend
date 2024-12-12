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
  }
}
async function displayPokemons() {
  parent = document.getElementById("pokemon-list");
  parent.innerHTML = `<div class="loader-container">
                              <div class="loader"></div>
                          </div>`;
  const pokemons = await getPokemons();
  parent.innerHTML = ``;
  pokemons.forEach((pokemon, index) => {
    const div = document.createElement("div");
    div.classList.add("pokemon-card");
    div.addEventListener("click", async () => {
      await displayDetailsforPokemon(index + 1);
    });

    const img = document.createElement("img");
    img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`;
    img.classList.add("pokemon-image");

    const name = document.createElement("h3");
    name.innerText = pokemon.name;
    name.classList.add("pokemon-name");

    parent.appendChild(div);
    div.appendChild(img);
    div.appendChild(name);
  });
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
async function displayDetailsforPokemon(id) {
  const pokemon_details = await getDetailsForPokemon(id);
  const parent = document.getElementById("pokemon-details-container");
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
    parent.innerHTML = `<div class="pokemon-details">
                            <img src="${img}" alt="${name}" class="pokemon-image" />
                            <h3 class="pokemon-name">${name}</h3>
                            <h4 class="typy">typy:${type}</h2>
                            <h4 class="statystyki">statystyki:hp(${hp}),attack(${attack}),defense(${defense})</h2>
                            <h4 class="wzrost">wzrost:${height}</h2>
                            <h4 class="waga">waga:${weight}</h2>
                        </div>`;
  }
}
document.addEventListener("DOMContentLoaded", () => {
  displayPokemons();
});
