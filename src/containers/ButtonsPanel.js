import React from 'react';
import {toast} from "react-toastify";
import DifficultyModal from "../components/DifficultyLevelModal";

const ButtonsPanel = props =>

    <div className="buttons row col-3 flex-center flex-content-end">
        <button hidden={props.hideElements} disabled={props.disabledButtons}
                onClick={() => props.checkSolution(props.board, false)}>Check
        </button>
        <button disabled={props.disabledButtons} onClick={() => toast.success(<DifficultyModal
                title="Select difficulty level" prepareBoard={props.prepareBoard}/>,
            {
                autoClose: false, onOpen: () => props.disableButtons(true),
                onClose: () => props.disableButtons(false)
            })}>New Game
        </button>
        <button disabled={props.disabledButtons} onClick={() => props.loadGame()}>Load Game</button>
        <button hidden={props.hideElements} disabled={props.disabledButtons}
                onClick={() => props.saveGame()}>Save Game
        </button>
        <button hidden={props.hideElements} disabled={props.disabledButtons}
                onClick={() => props.checkSolution(props.board, true)}>Solve
        </button>
        <button hidden={props.hideElements} disabled={props.disabledButtons}
                onClick={() => props.restartGame()}>Restart
        </button>
    </div>

export default ButtonsPanel;