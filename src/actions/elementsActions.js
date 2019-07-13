export const HIDE_ELEMENTS = 'HIDE_ELEMENTS';
export const DISABLED_BUTTONS = "DISABLED_BUTTONS";
export const DISABLED_UNDO = "DISABLED_UNDO";
export const DISABLED_REDO = "DISABLED_REDO";

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
