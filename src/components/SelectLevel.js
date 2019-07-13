import React from "react";

const SelectLevel = props => (
    <div className="cell col-12">
        <input onClick={(event) => event.stopPropagation()} type="radio" name={props.level} value={props.level}
               onChange={(event) => props.setLevel(event.target.value)} id={props.level}/>
        <label htmlFor={props.level}>{props.level}</label>
    </div>
);

export default SelectLevel;

