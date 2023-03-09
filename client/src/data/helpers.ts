import { Pokemon, PokemonCaughtSet } from "./types"
import { pokemonWithDashInName } from "./constants";
import { pokemonData } from "./pokemon";

// Simple method to format Pokémon names properly from the input data
function formatPokemonName(name: string, dex_number: number): string {
    return name
        .split('-')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(
            // Some Pokémon (e.g. Wo-Chien, Ho-Oh) split their names with '-', 
            // whereas others (e.g. Roaring Moon, Tapu Koko) split with ' '
            pokemonWithDashInName.has(dex_number) ? '-' : ' '
        );
}

// Returns false only if input is an integer (to represent dex # of a Pokémon)
export function isPokemonName(input: string): boolean {
    return isNaN(+input) || isNaN(parseInt(input));
}

// Format initial input list of Pokémon data as Pokemon objects
export const pokemonFullDexList: Array<Pokemon> = pokemonData.map(pokemonDatum => ({
    name: formatPokemonName(pokemonDatum.name, pokemonDatum.dex_number),
    dex_number: pokemonDatum.dex_number,
    type_1: pokemonDatum.type_1,
    type_2: pokemonDatum.type_2,
    image_url: pokemonDatum.image_url
}));

// Determine if given Pokémon can be displayed under given filters, and increment
// a count if it can be displayed and the user has caught it
export function canDisplayPokemon(
    pokemon: Pokemon, inputBarFilter: string, primaryTypeFilter: string, 
    secondaryTypeFilter: string, caught: {map: PokemonCaughtSet, count: number}): boolean {
    const canDisplayBasedOnInputBar = (
        isPokemonName(inputBarFilter) ? 
            pokemon.name.toLowerCase().includes(inputBarFilter.toLowerCase()) :
            pokemon.dex_number === +inputBarFilter
    )
    const canDisplayBasedOnPrimaryFilter = (
        primaryTypeFilter === "" || 
        pokemon.type_1.toLowerCase() === primaryTypeFilter.toLowerCase()
    );
    const canDisplayBasedOnSecondaryFilter = (
        secondaryTypeFilter === "" || (
            pokemon.type_2 !== null && pokemon.type_2.toLowerCase() === secondaryTypeFilter.toLowerCase()
        )
    );
    const canDisplay: boolean = (
        canDisplayBasedOnInputBar && 
        canDisplayBasedOnPrimaryFilter &&
        canDisplayBasedOnSecondaryFilter
    );

    caught.count = canDisplay && caught.map[pokemon.dex_number] ?
        caught.count + 1 :
        caught.count;
    return canDisplay;
}