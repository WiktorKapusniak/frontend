"use client";
import { useState, useEffect } from "react";
import styles from "./favorite.module.css";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const handleRemoveFavorite = (pokemonName) => {
    const updatedFavorites = favorites.filter((fav) => fav.name !== pokemonName);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div>
      <div className={styles.favorites}>Favorites</div>
      {favorites.length > 0 ? (
        <div className={styles.favoriteList}>
          {favorites.map((pokemon) => (
            <div key={pokemon.name} className={styles.favoriteCard}>
              <p>{pokemon.name}</p>
              <button className={styles.button} onClick={() => handleRemoveFavorite(pokemon.name)}>
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.noFavorites}>No favorites yet!</div>
      )}
    </div>
  );
}
