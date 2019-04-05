import React from 'react';
import {hot} from 'react-hot-loader';
import Board from '../components/Board';
import sudoku from "sudoku-umd";

class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            initialBoard: '',
            board: ''
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

    takeBox(id) {
        console.log(`BoxID --> ${id}`);
    }

    checkSolution(solution) {
        const check = sudoku.solve(solution.join(''));
        check ? console.log(`Good :) --> ${check}`) : console.log(`Bad :( --> ${check}`);
    }

    render() {
        return (
            <div className="App">
                <h1>Sudoku</h1>
                <Board takeNumber={this.takeNumber.bind(this)} randomNumbers={this.state.board}/>
                <div className="buttons">
                    <button onClick={() => this.checkSolution(this.state.board)}>Check</button>
                    <button onClick={this.prepareBoard.bind(this)}>New Game</button>
                    <button>Solve</button>
                    <button onClick={() =>this.setState({board: ''})}>Restart</button>
                </div>
            </div>
        )
    }
}

export default hot(module)(App);