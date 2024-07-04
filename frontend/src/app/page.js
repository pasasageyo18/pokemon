"use client";

import PokemonList from "@/components/pokemon/pokemon-list";
import { useStorePokemon } from "@/lib/store";
import { useShallow } from "zustand/react/shallow";

function Home() {
  const pokemons = useStorePokemon(useShallow((state) => state.pokemons));
  const setPokemons = useStorePokemon(useShallow((state) => state.setPokemons));

  return <PokemonList pokemons={pokemons} setPokemons={setPokemons} />;
}

export default Home;
