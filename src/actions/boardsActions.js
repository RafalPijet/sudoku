export const SET_BOARD = "SET_BOARD";
export const SET_INITIAL_BOARD = "SET_INITIAL_BOARD";
export const SET_TURNS = "SET_TURNS";
export const ADD_TURN = "ADD_TURN";
export const REMOVE_TURN = "REMOVE_TURN";
export const SET_TURNS_CASH = "SET_TURNS_CASH";
export const ADD_TURN_CASH = "ADD_TURN_CASH";
export const REMOVE_TURN_CASH = "REMOVE_TURN_CASH";

export const setBoard = board => {
    return {
        type: SET_BOARD,
        board
    }
};

export const setInitialBoard = board => {
    return {
        type: SET_INITIAL_BOARD,
        board
    }
};

export const setTurns = board => {
    return {
        type: SET_TURNS,
        board
    }
};

export const addTurn = turn => {
    return {
        type: ADD_TURN,
        turn
    }
};

export const removeTurn = () => {
    return {
        type: REMOVE_TURN
    }
};

export const setTurnsCash = board => {
    return {
        type: SET_TURNS_CASH,
        board
    }
};

export const addTurnCash = turnCash => {
    return {
        type: ADD_TURN_CASH,
        turnCash
    }
};

export const removeTurnCash = () => {
    return {
        type: REMOVE_TURN_CASH
    }
};
