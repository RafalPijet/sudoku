import { connect } from 'react-redux';
import ButtonsPanel from './ButtonsPanel';

const mapStateToProps = state => (
    {
    hideElements: state.elements.hideElements,
    disabledButtons: state.elements.disabledButtons,
    board: state.boards.board,
    }
);

export default connect(mapStateToProps)(ButtonsPanel)
