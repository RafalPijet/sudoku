import React, {Component} from 'react';

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

    render() {
        return (
            <form className="modal-select-difficulty row" onSubmit={(event) => event.preventDefault()}>
                <label className="col-12">{this.props.title}:</label>
                <div className="select-level col-12 row flex-around" onClick={(event) => event.stopPropagation()}>
                    <div className="col-4 row">
                        <div className="cell col-12">
                            <input onClick={(event) => event.stopPropagation()} type="radio" name="level" value="easy"
                                   onChange={(event) => this.setState({level: event.target.value})} id="easy"/>
                            <label htmlFor="easy">easy</label>
                        </div>
                        <div className="cell col-12">
                            <input onClick={(event) => event.stopPropagation()} type="radio" name="level" value="medium"
                                   onChange={(event) => this.setState({level: event.target.value})} id="medium"/>
                            <label htmlFor="medium">medium</label>
                        </div>
                        <div className="cell col-12">
                            <input onClick={(event) => event.stopPropagation()} type="radio" name="level" value="hard"
                                   onChange={(event) => this.setState({level: event.target.value})} id="hard"/>
                            <label htmlFor="hard">hard</label>
                        </div>
                    </div>
                    <div className="col-4 row">
                        <div className="cell col-12">
                            <input onClick={(event) => event.stopPropagation()} type="radio" name="level" value="very-hard"
                                   onChange={(event) => this.setState({level: event.target.value})} id="very-hard"/>
                            <label htmlFor="very-hard">very-hard</label>
                        </div>
                        <div className="cell col-12">
                            <input onClick={(event) => event.stopPropagation()} type="radio" name="level" value="insane"
                                   onChange={(event) => this.setState({level: event.target.value})} id="insane"/>
                            <label htmlFor="insane">insane</label>
                        </div>
                        <div className="cell col-12">
                            <input onClick={(event) => event.stopPropagation()} type="radio" name="level" value="inhuman"
                                   onChange={(event) => this.setState({level: event.target.value})} id="inhuman"/>
                            <label htmlFor="inhuman">inhuman</label>
                        </div>
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