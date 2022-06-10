import React from 'react';
import './Wordle.css';

const Character = (props) => {

    return (
        <button className={props.color}> {props.value} </button>
    );
};

export default Character;
