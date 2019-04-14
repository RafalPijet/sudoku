import React from 'react';
import {hot} from 'react-hot-loader/index';
import Board from '../containers/Board';
import Coordinates from '../components/Coordinates';
import Turns from '../containers/Turns';
import DifficultyModal from '../components/DifficultyLevelModal';
import SolveModal from '../components/SolveModal';
import FilesModal from '../components/FilesModal';
import ButtonStyle from '../components/Buttons.css';
import sudoku from 'sudoku-umd';
import {ToastContainer, toast} from "react-toastify";

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
            turnsCash: [],
            disabledButtons: false,
            disabledUndo: true,
            disabledRedo: true,
            undoStyle: ButtonStyle.smallButtonDisabled,
            redoStyle: ButtonStyle.smallButtonDisabled,
            value: '',
            id: '',
            selectedBox: '',
            turnCounter: 0,
            hideElements: true
        }
    }

    componentDidMount() {
        this.prepareBoard("begin");
    }

    prepareBoard(level) {

        if (level === 'begin') {
            const begin = [];

            for (let i = 0; i < 81; i++) {
                begin.push('')
            }
            this.setState({board: begin})
        } else {
            const random = Array.from(sudoku.generate(level));
            const resultForBoard = [];
            const resultForInitialBoard = [];
            random.map(item =>
                item.includes('.') ? resultForBoard.push(item.replace('.', ''))
                    : resultForBoard.push(item)
            );
            random.map(item =>
                item.includes('.') ? resultForInitialBoard.push(item.replace('.', ''))
                    : resultForInitialBoard.push(item)
            );
            this.setState({
                board: resultForBoard,
                initialBoard: resultForInitialBoard,
                isGame: true,
                level: level,
                turns: [],
                turnsCash: [],
                hideElements: false,
            });
        }
        this.buttonsHandling(false, false);
        setTimeout(() => this.setState({isGame: false}), 10);
    }

    takeNumber(id, value) {
        this.state.board.splice(id, 1, value);
        this.setState({value: value, id: id});
    }
    
    setTurn(isDefaultBackground, selectedBox) {
        let letter = selectedBox.substring(0, 1).toUpperCase();
        let number = selectedBox.substring(2, 3);
        let coordinates = letter + " - " + number;
        coordinates.length === 5 ? this.setState({selectedBox: coordinates}) : [];
        console.log(`${isDefaultBackground};${this.state.value.length};${this.state.selectedBox.length}`)
        if (isDefaultBackground && this.state.value.length &&
            this.state.selectedBox.length === 5) {
            this.state.turnCounter++;
            let turn = {
                turnId: this.state.turnCounter,
                selectedBox: coordinates,
                value: this.state.value,
                id: this.state.id,
                prevValue: this.state.initialBoard[this.state.id]
            };
            this.state.turns.unshift(turn);
            setTimeout(() => this.setState({value: '', selectedBox: '', turnsCash: []}), 1);
            this.buttonsHandling(true, false);
        }
    }

    buttonsHandling(isUndo, isRedo) {
        isUndo ? this.setState({disabledUndo: false, undoStyle: ButtonStyle.smallButton}) :
            this.setState({disabledUndo: true, undoStyle: ButtonStyle.smallButtonDisabled});
        isRedo ? this.setState({disabledRedo: false, redoStyle: ButtonStyle.smallButton}) :
            this.setState({disabledRedo: true, redoStyle: ButtonStyle.smallButtonDisabled});
    }

    undoHandling() {
        let item = this.state.turns.shift();
        this.state.turnsCash.unshift(item);
        this.state.turnCounter--;
        this.setState({turns: this.state.turns});
        this.state.turnsCash.length ? this.buttonsHandling(true, true) :
            this.buttonsHandling(true, false);
        !this.state.turns.length ? this.buttonsHandling(false, false) : [];
        this.state.board[item.id] = item.prevValue;
        this.setState({board: this.state.board, isGame: true});
        setTimeout(() => this.setState({isGame: false}), 10);
    }

    redoHandling() {

        if (this.state.turnsCash.length) {
            let item = this.state.turnsCash.shift();
            this.state.turns.unshift(item);
            this.state.turnCounter++;
            this.setState({turns: this.state.turns});
            this.state.board[item.id] = item.value;
            this.setState({board: this.state.board, isGame: true});
            setTimeout(() => this.setState({isGame: false}), 10);
            setTimeout(() => !this.state.turnsCash.length ? this.buttonsHandling(true,false) : [])
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
        this.setState({
            board: Array.from(this.state.initialBoard),
            isGame: true,
            turns: [],
            turnsCash: [],
            boxIdState: '',
            value: '',
            id: '',
            selectedBox: '',
            turnCounter: 0
        });
        setTimeout(() => this.setState({isGame: false}), 10);
        this.buttonsHandling(false, false);
        this.toastRestartGame();
    }

    checkSolution(solution, isSolve) {
        const result = [];
        solution.map(item => !item.length ? result.push(item.replace('', '.')) : result.push(item));
        const check = sudoku.solve(result.join(''));

        if (isSolve) {
            let counter = 0;
            for (let i = 0; i < this.state.board.length; i++) {
                this.state.board[i] === '' ? counter++ : [];
            }
            counter === 0 ?
             toast.success(<SolveModal title="⭐⭐⭐YOU ARE WINNER⭐⭐⭐" info="👌GAME OVER👌"/>,
                {autoClose: false, onOpen: () => this.disableButtons(true),
                    onClose: () => this.disableButtons(false)}) :
                toast.warn(<SolveModal title="⚠️YOUR solution is NOT FINISHED⚠️" info="Are you sure, you want to end the game?"/>,
                    {autoClose: false, onOpen: () => this.disableButtons(true),
                        onClose: () => this.disableButtons(false)})
        } else {
            check ? this.correctTactics() : this.notCorrectTactics();
        }
    }

    disableButtons(isReally) {
        isReally ? this.setState({disabledButtons: true}) : this.setState({disabledButtons: false});
    }

    loadGame(data) {
        console.log(`loadGame --> ${data}`);
    }

    toastRestartGame = () => toast('You restarted the game 😎',
{type: toast.TYPE.INFO, autoClose: 5000, onOpen: () => this.disableButtons(true),
    onClose: () => this.disableButtons(false)});

    correctTactics = () => toast('Your tactics are CORRECT 😀',
        {type: toast.TYPE.SUCCESS, autoClose: 5000, onOpen: () => this.disableButtons(true),
        onClose: () => this.disableButtons(false)});
    notCorrectTactics = () => toast('Your tactics are NOT CORRECT 😲',
        {type: toast.TYPE.ERROR, autoClose: 5000, onOpen: () => this.disableButtons(true),
            onClose: () => this.disableButtons(false)});

    render() {
        return (
            <div className="App row col-12">
                <div className="title row col-3 flex-center flex-content-start">
                    <h1>SUDOKU</h1>
                    <h3 className="col-12">{this.state.level}</h3>
                    <div className="col-10 row">
                        <h4 className="col-4" hidden={this.state.hideElements}>Turn</h4>
                        <h4 className="col-4" hidden={this.state.hideElements}>Coordinates</h4>
                        <h4 className="col-4" hidden={this.state.hideElements}>Value</h4>
                    </div>
                    <div className="col-10 row">
                        <h4 className="show col-4" hidden={this.state.hideElements}>{this.state.turnCounter + 1}</h4>
                        <h4 className="show col-4" hidden={this.state.hideElements}>{this.state.selectedBox}</h4>
                        <h4 className="show col-4" hidden={this.state.hideElements}>{this.state.value}</h4>
                    </div>
                    <Turns turns={this.state.turns} hidden={this.state.hideElements}/>
                    <div className="buttons row col-10 flex-between">
                        <button className={this.state.undoStyle} hidden={this.state.hideElements}
                                disabled={this.state.disabledUndo} onClick={this.undoHandling.bind(this)}>Undo</button>
                        <button className={this.state.redoStyle} hidden={this.state.hideElements}
                                disabled={this.state.disabledRedo} onClick={this.redoHandling.bind(this)}>Redo</button>
                    </div>
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
                           setTurn={this.setTurn.bind(this)}/>
                </div>
                <div className="buttons row col-3 flex-center flex-content-end">
                    <button hidden={this.state.hideElements} disabled={this.state.disabledButtons}
                            onClick={() => this.checkSolution(this.state.board, false)}>Check</button>
                    <button disabled={this.state.disabledButtons} onClick={() => toast.success(<DifficultyModal
                        title="Select difficulty level" prepareBoard={this.prepareBoard.bind(this)}/>,
                        {autoClose: false, onOpen: () => this.disableButtons(true),
                            onClose: () => this.disableButtons(false)})}>New Game
                    </button>
                    <button disabled={this.state.disabledButtons} onClick={() => 
                        toast.info(<FilesModal title="Load the game..." loadGame={this.loadGame.bind(this)}/>,
                        {autoClose: false})}>Load Game</button>
                    <button hidden={this.state.hideElements} disabled={this.state.disabledButtons}>Save Game</button>
                    <button hidden={this.state.hideElements} disabled={this.state.disabledButtons}
                            onClick={() => this.checkSolution(this.state.board, true)}>Solve</button>
                    <button hidden={this.state.hideElements} disabled={this.state.disabledButtons}
                            onClick={() => this.restartGame()}>Restart</button>
                </div>
                <ToastContainer/>
            </div>
        )
    }
}

export default hot(module)(App);