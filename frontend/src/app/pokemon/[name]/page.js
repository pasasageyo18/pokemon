"use client";

import { useState, useEffect } from "react";
import PokemonAbilities from "@/components/pokemon/pokemon-abilities";
import PokemonMoves from "@/components/pokemon/pokemon-moves";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useStorePokemon } from "@/lib/store";
import { useShallow } from "zustand/react/shallow";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

function PokemonDetail({ params }) {
  const [isLoading, setIsLoading] = useState(false);
  const [pokemon, setPokemon] = useState();
  const [nickname, setNickname] = useState();
  const [catched, setCatched] = useState();

  useEffect(() => {
    setIsLoading(true);
    const retrievePokemonDetails = async () => {
      try {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${params.name}`
        );
        if (!res.ok) throw new Error("Data is not found!");
        const data = await res.json();
        setPokemon(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (params.name) {
      retrievePokemonDetails();
    }
  }, [params.name]);

  const addPokemon = useStorePokemon(useShallow((state) => state.addPokemon));
  const router = useRouter();

  const catchPokemon = async () => {
    try {
      const res = await fetch("http://localhost:4000/catch");
      if (!res.ok) throw new Error("Data is not found!");
      const data = await res.json();
      if (data.probability === 50) {
        setCatched(true);
      } else {
        setCatched(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    router.push("/collection");
    addPokemon(pokemon, nickname);
  };

  return (
    <>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <div className="bg-white p-12 rounded-2xl h-full">
          <div className="flex flex-col items-center gap-4">
            <p>{pokemon?.name}</p>
            <div className="relative w-40 h-40">
              <Image
                src={pokemon?.sprites.other.dream_world.front_default}
                fill={true}
                style={{ objectFit: "contain" }}
                unoptimized
                alt={pokemon?.name}
              />
            </div>
            <Dialog>
              <DialogTrigger
                className="w-fit bg-red-600 rounded-lg px-4 py-2 text-white"
                onClick={catchPokemon}
              >
                Catch
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  {catched ? (
                    <>
                      <DialogTitle>You've catched a pokemon!!</DialogTitle>
                      <DialogDescription></DialogDescription>
                      <div>
                        <form
                          onSubmit={handleSubmit}
                          className="flex flex-col gap-4"
                        >
                          <label>Enter your pokemon nickname:</label>
                          <input
                            type="text"
                            className="h-8 outline outline-1 outline-gray-600 rounded-lg px-4 py-2 text-black"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                          />
                          <Button type="submit">Submit</Button>
                        </form>
                      </div>
                    </>
                  ) : (
                    <DialogTitle>You failed to catch the pokemon!!</DialogTitle>
                  )}
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex gap-4 mt-6">
            {pokemon?.types.map((type, index) => (
              <div
                key={index}
                className="w-fit py-1 px-4 rounded-2xl bg-slate-800"
              >
                <p className="text-white">{type.type.name}</p>
              </div>
            ))}
          </div>
          <div className="w-full mt-6">
            <Tabs defaultValue="ability" className="w-full">
              <TabsList>
                <TabsTrigger value="ability">ability</TabsTrigger>
                <TabsTrigger value="moves">moves</TabsTrigger>
              </TabsList>
              <TabsContent
                value="ability"
                className="grid grid-cols-2 max-h-96 overflow-y-auto"
              >
                {pokemon?.abilities.map((ability, index) => {
                  return (
                    <PokemonAbilities key={index} abilities={ability.ability} />
                  );
                })}
              </TabsContent>
              <TabsContent
                value="moves"
                className="grid grid-cols-5 max-h-96 overflow-y-auto"
              >
                {pokemon?.moves.map((move, index) => {
                  return <PokemonMoves key={index} moves={move} />;
                })}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}
    </>
  );
}

export default PokemonDetail;
