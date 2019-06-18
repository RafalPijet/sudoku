export const HIDE_ELEMENTS = 'HIDE_ELEMENTS';
export const DISABLED_BUTTONS = "DISABLED_BUTTONS";
export const SET_BOARD = "SET_BOARD";
export const SET_INITIAL_BOARD = "SET_INITIAL_BOARD";
export const SET_TURNS = "SET_TURNS";
export const SET_TURNS_CASH = "SET_TURNS_CASH";
export const DISABLED_UNDO = "DISABLED_UNDO";
export const DISABLED_REDO = "DISABLED_REDO";
export const SET_UNDO_STYLE = "SET_UNDO_STYLE";
export const SET_REDO_STYLE = "SET_REDO_STYLE";
export const SET_BOX_ID_STATE = "SET_BOX_ID_STATE";
export const IS_GAME = "IS_GAME";
export const SET_LEVEL = "SET_LEVEL";
export const SET_VALUE = "SET_VALUE";
export const SET_ID = "SET_ID";
export const SET_SELECTED_BOX = "SET_SELECTED_BOX";
export const SET_TURN_COUNTER = "SET_TURN_COUNTER";
export const SET_RUNNING = "SET_RUNNING";

export const hideElements = isHide => {
    return {
        type: HIDE_ELEMENTS,
        hideElements: isHide
    }
};

export const disabledButtons = isDisabled => {
    return {
        type: DISABLED_BUTTONS,
        disabledButtons: isDisabled
    }
};

export const disabledUndo = isDisabled => {
    return {
        type: DISABLED_UNDO,
        disabledUndo: isDisabled
    }
};

export const disabledRedo = isDisabled => {
    return {
        type: DISABLED_REDO,
        disabledRedo: isDisabled
    }
};

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

export const setTurnsCash = board => {
    return {
        type: SET_TURNS_CASH,
        board
    }
};

export const setUndoStyle = style => {
    return {
        type: SET_UNDO_STYLE,
        style
    }
};

export const setRedoStyle = style => {
    return {
        type: SET_REDO_STYLE,
        style
    }
};

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

export const setRunning = isRunning => {
    return {
        type: SET_RUNNING,
        isRunning
    }
};
