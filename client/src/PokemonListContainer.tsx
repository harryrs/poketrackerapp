import React from "react";

import { Pokemon, PokemonCaughtSet } from "./data/types"
import { PokemonCatchable } from "./PokemonCatchable";
import { PokemonTypeDropdown } from "./PokemonTypeDropdown";

type Props = {
  pokemonData: Array<Pokemon>,
  pokemonCaught: PokemonCaughtSet,
  pokemonCaughtCount: number,
  handleUpdateFilter: React.ChangeEventHandler<HTMLInputElement>,
  handleUpdateTypeSelection: React.ChangeEventHandler<HTMLSelectElement>,
  handlePokemonCaughtToggle: React.MouseEventHandler<HTMLDivElement>
};

export const PokemonListContainer = (props: Props) => {

  // Avoid dividing 0/0
  const percentageOfListCaught: number = props.pokemonData.length === 0 ? 0 :
    Math.round((100*props.pokemonCaughtCount) / props.pokemonData.length);

  return (
    <div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="pokemon-list-filter"
        >
          Filter By Name or PokeDex Number
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="pokemon-list-filter"
          type="text"
          placeholder="Enter name or PokeDex Number..."
          onChange={(e) => {props.handleUpdateFilter(e)}}
        />
      </div>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
        <PokemonTypeDropdown typeIndex={1} handleUpdateTypeSelection={props.handleUpdateTypeSelection}/>
        <PokemonTypeDropdown typeIndex={2} handleUpdateTypeSelection={props.handleUpdateTypeSelection}/>
      </div>

      <p>You have caught <strong>{props.pokemonCaughtCount}</strong> out of <strong>{props.pokemonData.length}</strong>, or <strong>~{percentageOfListCaught}%</strong></p>
      <br />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
          {
              props.pokemonData.map((pokemon) => (
                  <PokemonCatchable
                      pokemon={pokemon}
                      isCaught={props.pokemonCaught[pokemon.dex_number]}
                      handlePokemonCaughtToggle={props.handlePokemonCaughtToggle}
                      key={pokemon.dex_number}
                  />
              ))
          }
      </div>
    </div>
  );
};
