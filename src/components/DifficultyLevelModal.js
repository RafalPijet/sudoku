import React, {Component} from 'react';
import SelectLevel from './SelectLevel';

class DifficultyLevelModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            level: ''
        }
    }

    handleClick(event) {
        !this.state.level.length ? event.stopPropagation() : this.props.prepareBoard(this.state.level);
    }

    setLevel(level) {
        this.setState({ level })
    }

    render() {
        return (
            <form className="modal-select-difficulty row" onSubmit={(event) => event.preventDefault()}>
                <label className="col-12">{this.props.title}:</label>
                <div className="select-level col-12 row flex-around" onClick={(event) => event.stopPropagation()}>
                    <div className="col-4 row">
                        <SelectLevel level="easy" setLevel={this.setLevel.bind(this)} />
                        <SelectLevel level="medium" setLevel={this.setLevel.bind(this)} />
                        <SelectLevel level="hard" setLevel={this.setLevel.bind(this)} />
                    </div>
                    <div className="col-4 row">
                        <SelectLevel level="very-hard" setLevel={this.setLevel.bind(this)} />
                        <SelectLevel level="insane" setLevel={this.setLevel.bind(this)} />
                        <SelectLevel level="inhuman" setLevel={this.setLevel.bind(this)} />
                    </div>
                </div>
                <div className="row col-12 flex-end">
                    <button onClick={this.handleClick.bind(this)}>Submit</button>
                </div>
            </form>
        );
    }
}

export default DifficultyLevelModal;
