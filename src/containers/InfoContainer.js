import { connect } from 'react-redux';
import Info from './Info';

const mapStateToProps = state => (
    {
        hideElements: state.elements.hideElements,
        level: state.values.level,
        turnCounter: state.values.turnCounter,
        selectedBox: state.values.selectedBox,
        value: state.values.value,
        turns: state.boards.turns,
        undoStyle: state.styles.undoStyle,
        redoStyle: state.styles.redoStyle,
        disabledUndo:state.elements.disabledUndo,
        disabledRedo:state.elements.disabledRedo,
    }
);

export default connect(mapStateToProps)(Info)
