import { HIDE_ELEMENTS, DISABLED_BUTTONS, DISABLED_UNDO, DISABLED_REDO } from "../actions/elementsActions";

const elements = (state = {}, action) => {
    switch (action.type) {
        case HIDE_ELEMENTS:
            return ({ ...state, hideElements: action.hideElements });
        case DISABLED_BUTTONS:
            return ({ ...state, disabledButtons: action.disabledButtons });
        case DISABLED_UNDO:
            return ({ ...state, disabledUndo: action.disabledUndo });
        case DISABLED_REDO:
            return ({ ...state, disabledRedo: action.disabledRedo });
        default:
            return state;
    }
};

export default elements;
