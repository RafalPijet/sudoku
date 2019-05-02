import React from 'react';
import Coordinates from "../components/Coordinates";
import Board from "./Board";

const Matrix = props =>

    <div className="row col-6">
        <div className="row col-12">
            <div className="numbersLine row">
                <Coordinates name="1" boxIdState={props.boxIdState}/>
                <Coordinates name="2" boxIdState={props.boxIdState}/>
                <Coordinates name="3" boxIdState={props.boxIdState}/>
                <Coordinates name="4" boxIdState={props.boxIdState}/>
                <Coordinates name="5" boxIdState={props.boxIdState}/>
                <Coordinates name="6" boxIdState={props.boxIdState}/>
                <Coordinates name="7" boxIdState={props.boxIdState}/>
                <Coordinates name="8" boxIdState={props.boxIdState}/>
                <Coordinates name="9" boxIdState={props.boxIdState}/>
            </div>
        </div>
        <div className="lettersLine row flex-end">
            <Coordinates name="A" boxIdState={props.boxIdState}/>
            <Coordinates name="B" boxIdState={props.boxIdState}/>
            <Coordinates name="C" boxIdState={props.boxIdState}/>
            <Coordinates name="D" boxIdState={props.boxIdState}/>
            <Coordinates name="E" boxIdState={props.boxIdState}/>
            <Coordinates name="F" boxIdState={props.boxIdState}/>
            <Coordinates name="G" boxIdState={props.boxIdState}/>
            <Coordinates name="H" boxIdState={props.boxIdState}/>
            <Coordinates name="I" boxIdState={props.boxIdState}/>
        </div>
        <Board takeNumber={props.takeNumber} randomNumbers={props.randomNumbers}
               takeCoordinates={props.takeCoordinates} isGame={props.isGame}
               setTurn={props.setTurn}/>
    </div>


export default Matrix;