import { useState, useEffect } from "react";

function PokemonMoves({ moves }) {
  const [move, setMove] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const retrieveMovesList = async () => {
      try {
        const res = await fetch(`${moves.move.url}`);
        if (!res.ok) throw new Error("Data is not found!");
        const data = await res.json();
        setMove(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    retrieveMovesList();
  }, [moves.move.url]);
  return (
    <>
      {move ? (
        <div className="flex flex-col">
          <p className="font-bold text-lg">{move.name}</p>
        </div>
      ) : null}
    </>
  );
}

export default PokemonMoves;
