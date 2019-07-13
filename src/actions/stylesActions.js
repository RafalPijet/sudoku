export const SET_UNDO_STYLE = "SET_UNDO_STYLE";
export const SET_REDO_STYLE = "SET_REDO_STYLE";

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
