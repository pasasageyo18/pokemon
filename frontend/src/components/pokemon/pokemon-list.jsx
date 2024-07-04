"use client";

import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

function PokemonList({ pokemons, setPokemons }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    const retrievePokemonList = async () => {
      let list = [];
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=15`);
      if (!res.ok) throw new Error("Data is not found!");
      const data = await res.json();
      data.results.map(async (pokemonList) => {
        try {
          const res = await fetch(`${pokemonList.url}`);
          if (!res.ok) throw new Error("Data is not found!");
          const data = await res.json();
          list.push(data);
          if (list.length === 15) {
            setPokemons(list);
          }
        } catch (error) {
          console.error(error);
        }
      });
    };
    retrievePokemonList();
    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading ? (
        <p>loading</p>
      ) : (
        <div className="flex flex-col gap-10">
          <div className="grid grid-cols-5 gap-10">
            {pokemons.map((pokemon, index) => {
              return (
                <div
                  key={index}
                  className="rounded-xl bg-orange-600 flex flex-col w-fit items-center px-8 py-2 cursor-pointer"
                  onClick={() => router.push(`/pokemon/${pokemon.name}`)}
                >
                  <Image
                    src={pokemon.sprites.front_default}
                    height={120}
                    width={120}
                    unoptimized
                    alt={pokemon.name}
                  />
                  <p>{pokemon.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default PokemonList;
