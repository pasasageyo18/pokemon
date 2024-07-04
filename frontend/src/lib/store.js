import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useStorePokemon = create(
  persist(
    (set, get) => ({
      pokemons: [],
      myPokemons: [],
      addPokemon: (pokemon, nickname) => {
        const pokemonWithNic = { ...pokemon, nickname, renameCount: 0 };
        set((state) => ({
          myPokemons: [...state.myPokemons, pokemonWithNic],
        }));
      },
      removePokemon: (index) =>
        set((state) => {
          const newMyPokemons = [...state.myPokemons];
          newMyPokemons.splice(index, 1);
          return { myPokemons: newMyPokemons };
        }),
      renamePokemon: (index, newName) =>
        set((state) => {
          const newMyPokemons = [...state.myPokemons];
          newMyPokemons[index].newName = newName;
          newMyPokemons[index].renameCount =
            newMyPokemons[index].renameCount + 1;
          return { myPokemons: newMyPokemons };
        }),
      setPokemons: (list) => {
        set({ pokemons: list });
      },
    }),
    {
      name: "pokemon-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
