import DisplayPokemonDetails from "@/app/components/PokemonDetails";

import Link from "next/link";
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
    return [];
  }
}

export default async function DetailsPage({ params }) {
  const { id } = await params;
  const details = await getDetailsForPokemon(id);
  return (
    <div>
      <nav className="text-sm mb-4" aria-label="Breadcrumbs">
        <Link href="/" className="text-black hover:underline">
          Home
        </Link>
        <span className="mx-2 text-black">/</span>
        <Link href="/pokemon" className="text-black hover:underline">
          Pokemon
        </Link>
        <span className="mx-2 text-black">/</span>
        <span className="text-black">{details.name}</span>
      </nav>
      <DisplayPokemonDetails details={details} id={id} />
    </div>
  );
}
