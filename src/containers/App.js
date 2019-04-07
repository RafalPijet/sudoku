import React from 'react';
import {hot} from 'react-hot-loader/index';
import Board from '../components/Board';
import Coordinates from '../components/Coordinates';
import sudoku from 'sudoku-umd';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initialBoard: '',
            board: '',
            boxIdState: ''
        }
    }

    componentDidMount() {
        this.prepareBoard();
    }

    prepareBoard() {
        const random = sudoku.generate("easy");
        const result = Array.from(random);

        this.setState({
            board: result
        });
    }

    takeNumber(id, value) {
        const mainBoard = this.state.board;
        mainBoard.splice(id, 1, value);
        this.setState({board: mainBoard});
    }

    takeCoordinates(id, state) {
        let boxState = {
            id: id,
            state: state
        };
        this.setState({boxIdState: boxState});
        
    }

    checkSolution(solution) {
        const check = sudoku.solve(solution.join(''));
        check ? console.log(`Good :) --> ${check}`) : console.log(`Bad :( --> ${check}`);
    }

    render() {
        return (
            <div className="App row col-12">
                <div className="row col-3 flex-center">
                    <h1>Sudoku</h1>
                </div>
                <div className="row col-6">
                    <div className="row col-12">
                        <div className="numbersLine row">
                            <Coordinates name="1" boxIdState={this.state.boxIdState}/>
                            <Coordinates name="2" boxIdState={this.state.boxIdState}/>
                            <Coordinates name="3" boxIdState={this.state.boxIdState}/>
                            <Coordinates name="4" boxIdState={this.state.boxIdState}/>
                            <Coordinates name="5" boxIdState={this.state.boxIdState}/>
                            <Coordinates name="6" boxIdState={this.state.boxIdState}/>
                            <Coordinates name="7" boxIdState={this.state.boxIdState}/>
                            <Coordinates name="8" boxIdState={this.state.boxIdState}/>
                            <Coordinates name="9" boxIdState={this.state.boxIdState}/>
                        </div>
                    </div>
                    <div className="lettersLine row flex-end">
                        <Coordinates name="A" boxIdState={this.state.boxIdState}/>
                        <Coordinates name="B" boxIdState={this.state.boxIdState}/>
                        <Coordinates name="C" boxIdState={this.state.boxIdState}/>
                        <Coordinates name="D" boxIdState={this.state.boxIdState}/>
                        <Coordinates name="E" boxIdState={this.state.boxIdState}/>
                        <Coordinates name="F" boxIdState={this.state.boxIdState}/>
                        <Coordinates name="G" boxIdState={this.state.boxIdState}/>
                        <Coordinates name="H" boxIdState={this.state.boxIdState}/>
                        <Coordinates name="I" boxIdState={this.state.boxIdState}/>
                    </div>
                    <Board takeNumber={this.takeNumber.bind(this)} randomNumbers={this.state.board}
                           takeCoordinates={this.takeCoordinates.bind(this)}/>
                </div>
                <div className="buttons row col-3 flex-center flex-content-end">
                    <button onClick={() => this.checkSolution(this.state.board)}>Check</button>
                    <button onClick={this.prepareBoard.bind(this)}>New Game</button>
                    <button>Load Game</button>
                    <button>Save Game</button>
                    <button>Solve</button>
                    <button onClick={() => this.setState({board: ''})}>Restart</button>
                </div>
            </div>
        )
    }
}

export default hot(module)(App);