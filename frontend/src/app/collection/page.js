"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useStorePokemon } from "@/lib/store";
import { useShallow } from "zustand/react/shallow";
import { Button } from "@/components/ui/button";

function Collection() {
  const router = useRouter();

  const myPokemons = useStorePokemon(useShallow((state) => state.myPokemons));
  const removePokemon = useStorePokemon(
    useShallow((state) => state.removePokemon)
  );
  const renamePokemon = useStorePokemon(
    useShallow((state) => state.renamePokemon)
  );

  const renameMyPokemon = async (pokemonName, count, index) => {
    try {
      const res = await fetch("http://localhost:4000/rename", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: pokemonName, renameCount: count }),
      });
      const data = await res.json();
      renamePokemon(index, data.newName);
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  const removeMyPokemon = async (index) => {
    try {
      const randomNumber = Math.floor(Math.random() * 100);
      if (randomNumber === 0) {
        return alert("You failed to release your pokemon...");
      }
      const res = await fetch("http://localhost:4000/release", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ number: randomNumber }),
      });
      const data = await res.json();
      if (data.success === true) {
        removePokemon(index);
      } else {
        return alert("You failed to release your pokemon...");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {myPokemons.length > 0 ? (
        <div className="flex flex-col gap-10">
          <div className="grid grid-cols-5 gap-10">
            {myPokemons.map((pokemon, index) => {
              return (
                <div
                  key={index}
                  className="rounded-xl bg-orange-600 flex flex-col items-center px-4 py-2"
                >
                  <div className="relative h-28 w-28">
                    <Image
                      src={pokemon.sprites.front_default}
                      fill={true}
                      style={{ objectFit: "contain" }}
                      unoptimized
                      alt={pokemon.name}
                    />
                  </div>
                  <p className="text-lg font-semibold">
                    {pokemon.newName ? pokemon.newName : pokemon.name}
                  </p>
                  <p>{pokemon.nickname}</p>
                  <div className="flex flex-col gap-2">
                    <Button
                      onClick={() =>
                        renameMyPokemon(
                          pokemon.name,
                          pokemon.renameCount,
                          index
                        )
                      }
                    >
                      Rename
                    </Button>
                    <Button onClick={() => removeMyPokemon(index)}>
                      Remove
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <p className="text-black font-bold text-2xl text-center mt-14">
          you're not having any pokemon, go catch one!
        </p>
      )}
    </>
  );
}

export default Collection;
