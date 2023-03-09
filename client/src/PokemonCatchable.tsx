import React from "react";

import { Pokemon } from "./data/types";
import { TypeIcon } from "./TypeIcon";
import PokeBallIcon from "./PokeBallIcon";

type Props = {
    pokemon: Pokemon,
    isCaught: boolean,
    handlePokemonCaughtToggle: React.MouseEventHandler<HTMLDivElement>
};

export const PokemonCatchable = (props: Props) => {

    return (
        <div 
            className={
                "block " + (props.isCaught ? "bg-green-400" : "bg-white") +
                " " + (props.isCaught ? "hover:bg-green-600" : "hover:bg-gray-100") +
                " rounded shadow-lg py-4"
            }
            id={props.pokemon.dex_number.toString()}
            onClick={(e) => {props.handlePokemonCaughtToggle(e)}}
        >
            <div className="grid justify-items-center">
                <strong>{props.pokemon.name}</strong>
                <p><strong>#{props.pokemon.dex_number}</strong></p>
                <p><img src={props.pokemon.image_url} alt={props.pokemon.name} /></p>
                <div><TypeIcon type={props.pokemon.type_1} /> <TypeIcon type={props.pokemon.type_2} /></div>
                <br />
                <div>
                    {PokeBallIcon(props.isCaught)}
                </div>
            </div>
        </div>
    );
}