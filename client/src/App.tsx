import { useState } from "react";

import { AppHeader } from "./AppHeader";
import { PokemonListContainer } from "./PokemonListContainer";
import { pokemonFullDexList, isPokemonName, canDisplayPokemon } from "./data/helpers";
import { Pokemon, PokemonCaughtSet } from "./data/types"

function App() {

  const [pokemonToDisplay, setPokemonToDisplay] = useState<Array<Pokemon>>(pokemonFullDexList);

  const [pokemonCaught, setPokemonCaught] = useState<PokemonCaughtSet>({});
  const [displayedPokemonCaughtCount, setDisplayedPokemonCaughtCount] = useState<number>(0);

  const [inputBarFilter, setInputBarFilter] = useState<string>("");
  const [primaryTypeFilter, setPrimaryTypeFilter] = useState<string>("");
  const [secondaryTypeFilter, setSecondaryTypeFilter] = useState<string>("");

  const handleUpdateInput: React.ChangeEventHandler<HTMLInputElement> = (event: React.ChangeEvent<HTMLInputElement>) => {

    // Can only further filter current display if continuing to type a name
    const canFilterCurrentDisplay: boolean = (
      isPokemonName(event.target.value) &&
      inputBarFilter.length < event.target.value.length &&
      event.target.value.toLowerCase().startsWith(inputBarFilter.toLowerCase())
    );

    let caughtPokemonCountTracking: {map: PokemonCaughtSet, count: number} = {
      map: pokemonCaught,
      count: 0
    };
    const updatedPokemonToDisplay: Array<Pokemon> = 
      (canFilterCurrentDisplay ? pokemonToDisplay : pokemonFullDexList)
        .filter(
          pokemon => canDisplayPokemon(pokemon, event.target.value, primaryTypeFilter, 
              secondaryTypeFilter, caughtPokemonCountTracking)
        );
    setPokemonToDisplay(updatedPokemonToDisplay);
    setDisplayedPokemonCaughtCount(caughtPokemonCountTracking.count);
    setInputBarFilter(event.target.value);
  }
  
  const handleUpdateTypeSelection: React.ChangeEventHandler<HTMLSelectElement> = (event: React.ChangeEvent<HTMLSelectElement>) => {

    const isPrimaryTypeFilter: boolean = event.target.id === "1";
    const isResetToAny: boolean = event.target.value === "";
    const alreadyExistsPrimaryFilter: boolean = primaryTypeFilter !== "";
    const alreadyExistsSecondaryFilter: boolean = secondaryTypeFilter !== "";

    // Can only further filter current display if adding new filter (and not changing current filters)
    const canFilterCurrentDisplay: boolean = (
      !isResetToAny &&
      !(alreadyExistsPrimaryFilter && isPrimaryTypeFilter) &&
      !(alreadyExistsSecondaryFilter && !isPrimaryTypeFilter)
    )

    let caughtPokemonCountTracking: {map: PokemonCaughtSet, count: number} = {
      map: pokemonCaught,
      count: 0
    };
    const updatedPokemonToDisplay: Array<Pokemon> = 
      (canFilterCurrentDisplay ? pokemonToDisplay : pokemonFullDexList).filter(
        pokemon => canDisplayPokemon(pokemon, inputBarFilter,
            isPrimaryTypeFilter ? event.target.value : primaryTypeFilter,
            isPrimaryTypeFilter ? secondaryTypeFilter : event.target.value,
            caughtPokemonCountTracking
          )
      );
    setPokemonToDisplay(updatedPokemonToDisplay);
    setDisplayedPokemonCaughtCount(caughtPokemonCountTracking.count);
    isPrimaryTypeFilter ? 
      setPrimaryTypeFilter(event.target.value) :
      setSecondaryTypeFilter(event.target.value);
  }

  const handlePokemonCaughtToggle: React.MouseEventHandler<HTMLDivElement> =  (event: React.MouseEvent<HTMLDivElement>) => {

    const pokemonDexNumber: number = +event.currentTarget.id;

    const updatedPokemonCaught: PokemonCaughtSet = {...pokemonCaught};
    updatedPokemonCaught[pokemonDexNumber] = !updatedPokemonCaught[pokemonDexNumber];

    setDisplayedPokemonCaughtCount(
      updatedPokemonCaught[pokemonDexNumber] ?
        displayedPokemonCaughtCount + 1 :
        displayedPokemonCaughtCount - 1
    );
    setPokemonCaught(updatedPokemonCaught);
  }

  return (
    <div className="antialiased font-open-sans bg-gradient-to-b from-sky-100 to-sky-300 to-sky-400 min-h-screen">
      <AppHeader />

      <div className="mx-auto py-5 w-3/6 flex flex-col gap-3">
        <h2 className="font-bold text-2xl">Welcome to the PokeTracker!</h2>
        <p>
          Here is where you will be able to see which Pokemon you have left to
          catch on your way to completing the dex!
        </p>

        <p>
          All you have to do is click the Poke Ball icon to set a Pokemon as
          caught or uncaught.
        </p>

        <p>
          Use the search box below to search by a Pokemon's name or dex number.
        </p>

        <PokemonListContainer 
          pokemonData={pokemonToDisplay}
          pokemonCaught={pokemonCaught}
          pokemonCaughtCount={displayedPokemonCaughtCount}
          handleUpdateFilter={handleUpdateInput}
          handleUpdateTypeSelection={handleUpdateTypeSelection}
          handlePokemonCaughtToggle={handlePokemonCaughtToggle}
        />
      </div>
    </div>
  );
}

export default App;
