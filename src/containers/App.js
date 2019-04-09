import React from 'react';
import {hot} from 'react-hot-loader/index';
import Board from '../containers/Board';
import Coordinates from '../components/Coordinates';
import Turns from '../containers/Turns';
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
            level: '',
            turns: [],
            value: ''
        }
    }

    componentDidMount() {
        this.prepareBoard("begin");
    }

    prepareBoard(level) {

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
        this.setState({value: value});
    }
    
    takeBackground(isDefaultBackground, selectedBox) {

        if (isDefaultBackground) {
            let letter = selectedBox.substring(0, 1).toUpperCase();
            let number = selectedBox.substring(2, 3);
            let turn = {
                selectedBox: letter + " - " + number,
                value: this.state.value
            };
            this.state.turns.push(turn);
            console.log("WOW");
            setTimeout(() => console.log(this.state.turns), 10);
        }
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
        check ? this.correctTactics() : this.notCorrectTactics();
    }

    correctTactics = () => toast('Your tactics are CORRECT 😀',
        {type: toast.TYPE.SUCCESS, autoClose: 5000});
    notCorrectTactics = () => toast('Your tactics are NOT COORECT 😲',
        {type: toast.TYPE.WARNING, autoClose: 5000});

    render() {
        return (
            <div className="App row col-12">
                <div className="title row col-3 flex-center flex-content-start">
                    <h1>Sudoku</h1>
                    <h3 className="col-12">{this.state.level}</h3>
                    <Turns turns={this.state.turns}/>
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
                           takeCoordinates={this.takeCoordinates.bind(this)} isGame={this.state.isGame}
                           takeBackground={this.takeBackground.bind(this)}/>
                </div>
                <div className="buttons row col-3 flex-center flex-content-end">
                    <button onClick={() => this.checkSolution(this.state.board)}>Check</button>
                    <button onClick={() => toast.success(<DifficultyModal
                        title="Select difficulty level" prepareBoard={this.prepareBoard.bind(this)}/>,
                        {autoClose: false})}>New Game
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