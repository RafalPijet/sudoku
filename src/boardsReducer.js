import {SET_BOARD, SET_INITIAL_BOARD, SET_TURNS, SET_TURNS_CASH} from "./actions";

const boards = (state = {}, action) => {
    switch (action.type) {
        case SET_BOARD:
            return (
                {
                    ...state,
                    board: action.board
                }
            );
        case SET_INITIAL_BOARD:
            return (
                {
                    ...state,
                    initialBoard: action.board
                }
            );
        case SET_TURNS:
            return (
                {
                    ...state,
                    turns: action.board
                }
            );
        case SET_TURNS_CASH:
            return (
                {
                    ...state,
                    turnsCash: action.board
                }
            );
        default:
            return state;
    }
};

export default boards;
