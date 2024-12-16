"use client";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "../pokemon/pokemon.module.css";
import { useState, useEffect } from "react";

export default function DisplayPokemons({ pokemons }) {
  const [favorites, setFavorites] = useState([]);
  const list = pokemons;
  const [search, setSearch] = useState("");
  const [typeSearch, setTypeSearch] = useState("");
  const [limitSearch, setLimitSearch] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "all";
  const type = searchParams.get("type") || "all";
  const limit = searchParams.get("limit") || "all";

  const filteredByName = name === "all" ? list : list.filter((x) => x.name.toLowerCase().includes(name.toLowerCase()));

  const filteredByType = type === "all" ? filteredByName : filteredByName.filter((x) => x.type.toLowerCase().includes(type.toLowerCase()));

  const finalPokelist = limit === "all" ? filteredByType : filteredByType.slice(0, limit);

  function handleClick(id) {
    router.push(`/pokemon/${id}`);
  }

  function handleInputChange(e) {
    const query = e.target.value;
    setSearch(query);
    const params = new URLSearchParams(searchParams.toString());
    params.set("name", query);
    router.push(`/pokemon?${params.toString()}`);
  }

  function handleTypeInputChange(e) {
    setTypeSearch(e.target.value);
  }

  function handleLimitInputChange(e) {
    setLimitSearch(e.target.value);
  }

  function handleKeyDown(e) {
    const params = new URLSearchParams(searchParams.toString());

    if (e.key === "Enter") {
      if (e.target.name === "name") {
        params.set("name", search);
      }
      if (e.target.name === "type") {
        params.set("type", typeSearch);
      }
      if (e.target.name === "limit") {
        params.set("limit", limitSearch);
      }
      router.push(`/pokemon?${params.toString()}`);
    }
  }
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);
  function handleClick(index) {
    router.push(`/pokemon/${index}`);
  }
  const handleAddToFavorites = (event, pokemon) => {
    event.stopPropagation();
    if (!favorites.some((fav) => fav.name === pokemon.name)) {
      const updatedFavorites = [...favorites, pokemon];
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }
  };
  return (
    <>
      <nav className={styles.searchBars}>
        <div>
          <p className={styles.podpis}>Typ</p>
          <input type="text" name="type" placeholder="Search..." value={typeSearch} onChange={handleTypeInputChange} onKeyDown={handleKeyDown} />
        </div>
        <div>
          <p className={styles.podpis}>Limit</p>
          <input type="text" name="limit" placeholder="Search..." value={limitSearch} onChange={handleLimitInputChange} onKeyDown={handleKeyDown} />
        </div>
        <div>
          <p className={styles.podpis}>Nazwa</p>
          <input type="text" name="name" placeholder="Search..." value={search} onChange={handleInputChange} />
        </div>
      </nav>
      <div className={styles.pokemonList}>
        {finalPokelist.map((pokemon) => (
          <div key={pokemon.index + 1} className={styles.pokemonCard} onClick={() => handleClick(pokemon.index + 1)}>
            <button className={styles.star} onClick={(event) => handleAddToFavorites(event, pokemon)}>
              ☆
            </button>
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.index + 1}.png`} alt={pokemon.name} className={styles.pokemonImage} />
            <h3 className={styles.pokemonName}>{pokemon.name}</h3>
          </div>
        ))}
      </div>
    </>
  );
}
