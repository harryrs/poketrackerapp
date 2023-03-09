import React from "react";

import { listOfTypes } from "./data/constants"

type Props = {
    typeIndex: number,
    handleUpdateTypeSelection: React.ChangeEventHandler<HTMLSelectElement>
};

export const PokemonTypeDropdown = (props: Props) => {
    return (
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Type {props.typeIndex}
          </label>
          <select defaultValue={""} id={props.typeIndex.toString()} onChange={(e) => {props.handleUpdateTypeSelection(e)}}>
            <option value="">Any</option>
            {
                listOfTypes.map(type => (
                    <option value={type.toLowerCase()} key={type.toLowerCase()}>{type}</option>
                ))
            }
          </select>
        </div>
    );
};