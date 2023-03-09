// Simple object type for Pokémon as they are stored and rendered
export type Pokemon = {
    name: string,
    dex_number: number,
    type_1: string,
    type_2: string | null,
    image_url: string
};

// Implements a hash map of dex number to caught status defaulting to uncaught
export type PokemonCaughtSet = {
    [key: number]: boolean
};