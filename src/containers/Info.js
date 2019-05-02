import React from 'react';
import Turns from "./Turns";

class Info extends React.Component {

    pad0(value) {
        let result = value.toString();

        if (result.length < 2) {
            result = `0${result}`;
        }
        return result;
    }

    format() {
        return `${this.pad0(this.props.times.hours)}:${this.pad0(this.props.times.minutes)}:
        ${this.pad0(this.props.times.seconds)}`;
    }

    render() {
        return (
            <div className="title row col-3 flex-center flex-content-start">
                <h1>SUDOKU</h1>
                <h3 className="col-12" hidden={this.props.hideElements}>
                    {`${this.props.level} (${this.format(this.props.times)})`}
                </h3>
                <div className="col-10 row">
                    <h4 className="col-4" hidden={this.props.hideElements}>Turn</h4>
                    <h4 className="col-4" hidden={this.props.hideElements}>Coordinates</h4>
                    <h4 className="col-4" hidden={this.props.hideElements}>Value</h4>
                </div>
                <div className="col-10 row">
                    <h4 className="show col-4" hidden={this.props.hideElements}>{this.props.turnCounter + 1}</h4>
                    <h4 className="show col-4" hidden={this.props.hideElements}>{this.props.selectedBox}</h4>
                    <h4 className="show col-4" hidden={this.props.hideElements}>{this.props.value}</h4>
                </div>
                <Turns turns={this.props.turns} hidden={this.props.hideElements}/>
                <div className="buttons row col-10 flex-between">
                    <button className={this.props.undoStyle} hidden={this.props.hideElements}
                            disabled={this.props.disabledUndo} onClick={this.props.undoHandling}>Undo
                    </button>
                    <button className={this.props.redoStyle} hidden={this.props.hideElements}
                            disabled={this.props.disabledRedo} onClick={this.props.redoHandling}>Redo
                    </button>
                </div>
            </div>
        )
    }
}

export default Info;