// The Treasures of Ruin use a special character '-' in their actual name, so
// we track their dex numbers to make formatting easier
export const pokemonWithDashInName: Set<number> = new Set<number>(
    [1001, 1002, 1003, 1004]
);

// Adding a list of types as users will read and select them
export const listOfTypes: Array<string> = [
    "Bug",
    "Dark",
    "Dragon",
    "Electric",
    "Fairy",
    "Fighting",
    "Fire",
    "Flying",
    "Ghost",
    "Grass",
    "Ground",
    "Ice",
    "Normal",
    "Poison",
    "Psychic",
    "Rock",
    "Steel",
    "Water"
];