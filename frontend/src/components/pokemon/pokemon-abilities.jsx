"use client";

import { useState, useEffect } from "react";

function PokemonAbilities({ abilities }) {
  console.log(abilities);
  const [ability, setAbility] = useState();

  useEffect(() => {
    const retrieveAbilityDetails = async () => {
      try {
        const res = await fetch(`${abilities.url}`);
        if (!res.ok) throw new Error("Data is not found!");
        const data = await res.json();
        setAbility(data);
      } catch (error) {
        console.error(error);
      }
    };

    retrieveAbilityDetails();
  }, [abilities.url]);

  return (
    <>
      {ability ? (
        <div className="flex flex-col">
          <p className="font-bold text-lg">{ability.name}</p>
        </div>
      ) : null}
    </>
  );
}

export default PokemonAbilities;
