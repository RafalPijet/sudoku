import { SET_BOX_ID_STATE, IS_GAME, SET_LEVEL, SET_VALUE, SET_ID, SET_SELECTED_BOX,
    SET_TURN_COUNTER, TURN_UP_COUNTER, TURN_DOWN_COUNTER, SET_RUNNING } from "../actions/valuesActions";

const values = (state = {}, action) => {
    switch (action.type) {
        case SET_BOX_ID_STATE:
            return ({ ...state, boxIdState: action.value });
        case IS_GAME:
            return ({ ...state, isGame: action.isGame });
        case SET_LEVEL:
            return ({ ...state, level: action.level });
        case SET_VALUE:
            return ({ ...state, value: action.value });
        case SET_ID:
            return ({ ...state, id: action.id });
        case SET_SELECTED_BOX:
            return ({ ...state, selectedBox: action.box });
        case SET_TURN_COUNTER:
            return ({ ...state, turnCounter: action.value });
        case TURN_UP_COUNTER:
            return ({ ...state, turnCounter: state.turnCounter + 1 });
        case TURN_DOWN_COUNTER:
            return ({ ...state, turnCounter: state.turnCounter - 1 });
        case SET_RUNNING:
            return ({ ...state, running: action.isRunning });
        default:
            return state;
    }
};

export default values;
