import {connect} from 'react-redux';
import App from './App';
import { hideElements, disabledButtons, disabledUndo, disabledRedo } from "../actions/elementsActions";
import { setBoard, setInitialBoard, setTurns, addTurn, removeTurn, setTurnsCash, addTurnCash, removeTurnCash }
        from "../actions/boardsActions";
import { setUndoStyle, setRedoStyle } from "../actions/stylesActions";
import { setBoxIdState, setIsGame, setLevel, setValue, setId, setSelectedBox, setTurnCounter, turnUpCounter,
        turnDownCounter, setRunning } from "../actions/valuesActions";

const mapDispatchToProps = dispatch => ({
    hideElements: isHide => dispatch(hideElements(isHide)),
    disabledButtons: isDisabled => dispatch(disabledButtons(isDisabled)),
    disabledUndo: isDisabled => dispatch(disabledUndo(isDisabled)),
    disabledRedo: isDisabled => dispatch(disabledRedo(isDisabled)),
    setBoard: board => dispatch(setBoard(board)),
    setInitialBoard: board => dispatch(setInitialBoard(board)),
    setTurns: board => dispatch(setTurns(board)),
    addTurn: turn => dispatch(addTurn(turn)),
    removeTurn: () => dispatch(removeTurn()),
    setTurnsCash: board => dispatch(setTurnsCash(board)),
    addTurnCash: turn => dispatch(addTurnCash(turn)),
    removeTurnCash: () => dispatch(removeTurnCash()),
    setUndoStyle: style => dispatch(setUndoStyle(style)),
    setRedoStyle: style => dispatch(setRedoStyle(style)),
    setBoxIdState: value => dispatch(setBoxIdState(value)),
    setIsGame: isGame => dispatch(setIsGame(isGame)),
    setLevel: level => dispatch(setLevel(level)),
    setValue: value => dispatch(setValue(value)),
    setId: id => dispatch(setId(id)),
    setSelectedBox: box => dispatch(setSelectedBox(box)),
    setTurnCounter: value => dispatch(setTurnCounter(value)),
    turnUpCounter: () => dispatch(turnUpCounter()),
    turnDownCounter: () => dispatch(turnDownCounter()),
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
