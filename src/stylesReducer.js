import {SET_UNDO_STYLE, SET_REDO_STYLE} from "./actions";

const styles = (state = {}, action) => {
    switch (action.type) {
        case SET_UNDO_STYLE:
            return (
                {
                    ...state,
                    undoStyle: action.style
                }
            );
        case SET_REDO_STYLE:
            return (
                {
                    ...state,
                    redoStyle: action.style
                }
            );
        default:
            return state;
    }
};

export default styles;
