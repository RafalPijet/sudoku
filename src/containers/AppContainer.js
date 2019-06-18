import {connect} from 'react-redux';
import App from './App';
import {hideElements, disabledButtons, setBoard, setInitialBoard, setTurns, setTurnsCash,
        disabledUndo, disabledRedo, setUndoStyle, setRedoStyle, setBoxIdState, setIsGame,
        setLevel, setValue, setId, setSelectedBox, setTurnCounter, setRunning} from "../actions";

const mapDispatchToProps = dispatch => ({
    hideElements: isHide => dispatch(hideElements(isHide)),
    disabledButtons: isDisabled => dispatch(disabledButtons(isDisabled)),
    disabledUndo: isDisabled => dispatch(disabledUndo(isDisabled)),
    disabledRedo: isDisabled => dispatch(disabledRedo(isDisabled)),
    setBoard: board => dispatch(setBoard(board)),
    setInitialBoard: board => dispatch(setInitialBoard(board)),
    setTurns: board => dispatch(setTurns(board)),
    setTurnsCash: board => dispatch(setTurnsCash(board)),
    setUndoStyle: style => dispatch(setUndoStyle(style)),
    setRedoStyle: style => dispatch(setRedoStyle(style)),
    setBoxIdState: value => dispatch(setBoxIdState(value)),
    setIsGame: isGame => dispatch(setIsGame(isGame)),
    setLevel: level => dispatch(setLevel(level)),
    setValue: value => dispatch(setValue(value)),
    setId: id => dispatch(setId(id)),
    setSelectedBox: box => dispatch(setSelectedBox(box)),
    setTurnCounter: value => dispatch(setTurnCounter(value)),
    setRunning: isRunning => dispatch(setRunning(isRunning))
});

const mapStateToProps = state => (
    {
        values: state.values,
        boards: state.boards,
        elements: state.elements,
        styles: state.styles
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(App);
