import styles from "../pokemon/[id]/id.module.css";
export default function DisplayPokemonDetails({ details, id }) {
  if (details) {
    const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    const name = details.name;
    let type = "";
    if (details.types.length == 1) {
      type = details.types[0].type.name;
    } else {
      const type1 = details.types[0].type.name;
      const type2 = details.types[1].type.name;
      type = type1.concat(", ", type2);
    }
    const hp = details.stats[0].base_stat;
    const attack = details.stats[1].base_stat;
    const defense = details.stats[2].base_stat;
    const height = details.height;
    const weight = details.weight;
    return (
      <div key={id} className={styles.pokemonDetailsContainer}>
        <div className={styles.pokemonDetails}>
          <img src={img} alt={name} className={styles.pokemonImage}></img>
          <h3 className={styles.pokemonName}>{name}</h3>
          <h4 className={styles.typy}>typy: {type}</h4>
          <h4 className={styles.statystyki}>
            statystyki: hp({hp}), attack({attack}), defense({defense})
          </h4>
          <h4 className={styles.wzrost}>wzrost: {height}</h4>
          <h4 className={styles.waga}>waga: {weight}</h4>
        </div>
      </div>
    );
  }
}
