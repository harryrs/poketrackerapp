import React from "react";

import styles from './styles/pokemon-types.module.css'

type Props  = {
    type: string | null
};

export const TypeIcon =  (props: Props) => {
    return props.type === null ? null : (
        <div className={`${styles["type-icon"]} ${styles[`${props.type}`]}`} />
    )
}