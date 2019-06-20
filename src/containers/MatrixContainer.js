import { connect } from 'react-redux';
import Matrix from './Matrix';

const mapStateToProps = state => (
    {
        boxIdState: state.values.boxIdState,
        randomNumbers: state.boards.board,
        isGame: state.values.isGame,
    }
);

export default connect(mapStateToProps)(Matrix);
