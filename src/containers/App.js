import React from 'react';
import {hot} from 'react-hot-loader/index';
import Board from '../components/Board';
import Coordinates from '../components/Coordinates';
import DifficultyModal from '../components/DifficultyLevelModal';
import sudoku from 'sudoku-umd';
import {ToastContainer, toast, cssTransition} from "react-toastify";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initialBoard: '',
            board: [],
            boxIdState: '',
            isGame: false,
            level: ''
        }
    }

    componentDidMount() {
        this.prepareBoard("begin");
    }

    prepareBoard(level) {
        console.log(`WOWO`);
        if (level === 'begin') {
            const begin = [];

            for (let i = 0; i < 81; i++) {
                begin.push('.')
            }
            this.setState({board: begin})
        } else {
            const random = sudoku.generate(level);
            this.setState({
                board: Array.from(random),
                initialBoard: Array.from(random),
                isGame: true,
                level: level
            });
        }
        setTimeout(() => this.setState({isGame: false}), 10);
    }

    takeNumber(id, value) {
        this.state.board.splice(id, 1, value);
    }

    takeCoordinates(id, state) {
        let boxState = {
            id: id,
            state: state
        };
        this.setState({boxIdState: boxState});

    }

    restartGame() {
        setTimeout(() => this.setState({
            board: this.state.initialBoard,
            isGame: true
        }), 10);
        setTimeout(() => this.setState({isGame: false}), 10);
    }

    checkSolution(solution) {
        const check = sudoku.solve(solution.join(''));
        check ? console.log(`Good :) --> ${check}`) : console.log(`Bad :( --> ${check}`);
    }

    render() {
        return (
            <div className="App row col-12">
                <div className="title row col-3 flex-center flex-content-start">
                    <h1>Sudoku</h1>
                    <h3>{this.state.level}</h3>
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
                           takeCoordinates={this.takeCoordinates.bind(this)} isGame={this.state.isGame}/>
                </div>
                <div className="buttons row col-3 flex-center flex-content-end">
                    <button onClick={() => this.checkSolution(this.state.board)}>Check</button>
                    <button onClick={() => toast.success(<DifficultyModal title="Select difficulty level"
                                                                          prepareBoard={this.prepareBoard.bind(this)}/>, {autoClose: false})}>New
                        Game
                    </button>
                    <button>Load Game</button>
                    <button>Save Game</button>
                    <button>Solve</button>
                    <button onClick={() => this.restartGame()}>Restart</button>
                </div>
                <ToastContainer/>
            </div>
        )
    }
}

export default hot(module)(App);