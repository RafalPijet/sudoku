export const SET_BOX_ID_STATE = "SET_BOX_ID_STATE";
export const IS_GAME = "IS_GAME";
export const SET_LEVEL = "SET_LEVEL";
export const SET_VALUE = "SET_VALUE";
export const SET_ID = "SET_ID";
export const SET_SELECTED_BOX = "SET_SELECTED_BOX";
export const SET_TURN_COUNTER = "SET_TURN_COUNTER";
export const TURN_UP_COUNTER = "TURN_UP_COUNTER";
export const TURN_DOWN_COUNTER = "TURN_DOWN_COUNTER";
export const SET_RUNNING = "SET_RUNNING";

export const setBoxIdState = value => {
    return {
        type: SET_BOX_ID_STATE,
        value
    }
};

export const setIsGame = isGame => {
    return {
        type: IS_GAME,
        isGame
    }
};

export const setLevel = level => {
    return {
        type: SET_LEVEL,
        level
    }
};

export const setValue = value => {
    return {
        type: SET_VALUE,
        value
    }
};

export const setId = id => {
    return {
        type: SET_ID,
        id
    }
};

export const setSelectedBox = box => {
    return {
        type: SET_SELECTED_BOX,
        box
    }
};

export const setTurnCounter = value => {
    return {
        type: SET_TURN_COUNTER,
        value
    }
};

export const turnUpCounter = () => {
    return {
        type: TURN_UP_COUNTER
    }
};

export const turnDownCounter = () => {
    return {
        type: TURN_DOWN_COUNTER
    }
};

export const setRunning = isRunning => {
    return {
        type: SET_RUNNING,
        isRunning
    }
};
