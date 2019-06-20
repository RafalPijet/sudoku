import {SET_BOARD, SET_INITIAL_BOARD, SET_TURNS, SET_TURNS_CASH,
    ADD_TURN, REMOVE_TURN, ADD_TURN_CASH, REMOVE_TURN_CASH} from "./actions";

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
        case ADD_TURN:
            let turns = state.turns;
            turns.unshift(action.turn);
            return (
                {
                    ...state,
                    turns
                }
            );
        case REMOVE_TURN:
            let turnsAfterRemove = state.turns;
            turnsAfterRemove.shift();
            return (
                {
                    ...state,
                    turns: turnsAfterRemove
                }
            );
        case SET_TURNS_CASH:
            return (
                {
                    ...state,
                    turnsCash: action.board
                }
            );
        case ADD_TURN_CASH:
            let turnsCash = state.turnsCash;
            turnsCash.unshift(action.turnCash);
            return (
                {
                    ...state,
                    turnsCash
                }
            );
        case REMOVE_TURN_CASH:
            let turnsCashAfterRemove = state.turnsCash;
            turnsCashAfterRemove.shift();
            return (
                {
                    ...state,
                    turnsCash: turnsCashAfterRemove
                }
            );
        default:
            return state;
    }
};

export default boards;
