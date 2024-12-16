export default function PokemonLayout({ children }) {
  return (
    <div>
      <div className="pokemon-list">{children}</div>
    </div>
  );
}
