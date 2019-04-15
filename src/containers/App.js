import React from 'react';
import {hot} from 'react-hot-loader/index';
import Board from '../containers/Board';
import Coordinates from '../components/Coordinates';
import Turns from '../containers/Turns';
import DifficultyModal from '../components/DifficultyLevelModal';
import SolveModal from '../components/SolveModal';
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
            hideElements: true,
            running: false,
            times: {
                hours: 0,
                minutes: 0,
                seconds: 0
            }
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
            const setPreparing = () => new Promise(resolve => resolve(
                this.setState({
                    board: resultForBoard,
                    initialBoard: resultForInitialBoard,
                    boxIdState: '',
                    isGame: true,
                    level: level,
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
                    hideElements: false
                })));
            setPreparing()
                .then(() => this.setState({isGame: false}))
                .then(() => this.resetTime())
                .then(() => this.startTime())
                .then(() => this.buttonsHandling(false, false));
        }
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

        if (isDefaultBackground && this.state.value.length &&
            this.state.selectedBox.length === 5) {
            const addTurn = () => new Promise((resolve => resolve(
                this.state.turnCounter++
            )));
            addTurn()
                .then(() => {
                    let turn = {
                        turnId: this.state.turnCounter,
                        selectedBox: coordinates,
                        value: this.state.value,
                        id: this.state.id,
                        prevValue: this.state.initialBoard[this.state.id]
                    };
                    this.state.turns.unshift(turn);
                })
                .then(() => this.setState({value: '', selectedBox: '', turnsCash: []}))
                .then(() => this.buttonsHandling(true, false));
        } else {
            this.state.value.length ? this.setState({selectedBox: coordinates}) :
                this.setState({selectedBox: ''})
        }
    }

    buttonsHandling(isUndo, isRedo) {
        isUndo ? this.setState({disabledUndo: false, undoStyle: ButtonStyle.smallButton}) :
            this.setState({disabledUndo: true, undoStyle: ButtonStyle.smallButtonDisabled});
        isRedo ? this.setState({disabledRedo: false, redoStyle: ButtonStyle.smallButton}) :
            this.setState({disabledRedo: true, redoStyle: ButtonStyle.smallButtonDisabled});
    }

    refreshBoard = () => new Promise(resolve => resolve(
        this.setState({board: this.state.board, isGame: true})
    ));

    undoHandling() {
        let item = this.state.turns.shift();
        this.state.turnsCash.unshift(item);
        this.state.turnCounter--;
        this.setState({turns: this.state.turns});
        this.state.turnsCash.length ? this.buttonsHandling(true, true) :
            this.buttonsHandling(true, false);
        !this.state.turns.length ? this.buttonsHandling(false, false) : [];
        this.state.board[item.id] = item.prevValue;
        this.refreshBoard()
            .then(() => this.setState({isGame: false}));
    }

    redoHandling() {

        if (this.state.turnsCash.length) {
            let item = this.state.turnsCash.shift();
            this.state.turns.unshift(item);
            this.state.turnCounter++;
            this.setState({turns: this.state.turns});
            this.state.board[item.id] = item.value;
            this.refreshBoard()
                .then(() => this.setState({isGame: false}))
                .then(() => !this.state.turnsCash.length ? this.buttonsHandling(true, false) : []);
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
        const restart = () => new Promise(resolve => resolve(
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
            })
        ));
        restart()
            .then(() => this.setState({isGame: false}))
            .then(() => this.buttonsHandling(false, false))
            .then(() => this.toastRestartGame());
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
                    {
                        autoClose: false, onOpen: () => {
                            this.disableButtons(true);
                            this.stopTime();
                        },
                        onClose: () => {
                            this.disableButtons(false);
                            this.startTime();
                        }
                    }) :
                toast.warn(<SolveModal title="⚠️YOUR solution is NOT FINISHED⚠️"
                                       info="Are you sure, you want to end the game?"/>,
                    {
                        autoClose: false, onOpen: () => {
                            this.disableButtons(true);
                            this.stopTime();
                        },
                        onClose: () => {
                            this.disableButtons(false);
                            this.startTime();
                        }
                    })
        } else {
            check ? this.correctTactics() : this.notCorrectTactics();
        }
    }

    disableButtons(isReally) {
        isReally ? this.setState({disabledButtons: true}) : this.setState({disabledButtons: false});
    }

    loadGame() {
        let board = '';
        let result = '';
        const load = () => new Promise((resolve => resolve(
            board = localStorage.getItem("state")
        )));
        load()
            .then(() => result = JSON.parse(board))
            .then(() => this.setState({
                initialBoard: result.initialBoard,
                board: result.board,
                boxIdState: board.boxIdState,
                isGame: true,
                level: result.level,
                turns: result.turns,
                turnsCash: result.turnsCash,
                disabledButtons: result.disabledButtons,
                disabledUndo: result.disabledUndo,
                disabledRedo: result.disabledRedo,
                undoStyle: result.undoStyle,
                redoStyle: result.redoStyle,
                value: result.value,
                id: result.id,
                selectedBox: result.selectedBox,
                turnCounter: result.turnCounter,
                hideElements: result.hideElements,
                running: result.running,
                times: result.times
            }))
            .then(() => this.setState({isGame: false}))
            .then(() => this.toastLoadGame())
            .then(() => clearInterval(this.interval))
            .then(() => this.interval = setInterval(() => {

                if (this.state.running) {
                    this.setState({
                        times: this.calculate(this.state.times)
                    })
                }
            }, 1000));
    }

    saveGame() {
        localStorage.setItem("state", JSON.stringify(this.state));
        this.toastSaveGame();
    }

    interval = null;

    startTime() {

        if (!this.state.running) {
            this.setState({
                running: true
            });
            this.interval = setInterval(() => {

                if (this.state.running) {
                    this.setState({
                        times: this.calculate(this.state.times)
                    })
                }
            }, 1000)
        }
    }

    stopTime() {
        this.setState({
            running: false
        });
        clearInterval(this.interval);
    }

    resetTime() {
        this.setState({
            running: false,
            times: {
                hours: 0,
                minutes: 0,
                seconds: 0
            }
        });
        clearInterval(this.interval);
    }

    calculate(times) {
        let result = times;
        result.seconds += 1;

        if (result.seconds >= 60) {
            result.minutes += 1;
            result.seconds = 0;
        }

        if (result.minutes >= 60) {
            result.hours += 1;
            result.minutes = 0;
        }
        return result;
    }

    pad0(value) {
        let result = value.toString();

        if (result.length < 2) {
            result = `0${result}`;
        }
        return result;
    }

    format() {
        return `${this.pad0(this.state.times.hours)}:${this.pad0(this.state.times.minutes)}:
        ${this.pad0(this.state.times.seconds)}`;
    }

    toastSaveGame = () => toast('You saved game 🚀', {
        type: toast.TYPE.SUCCESS, autoClose: 5000,
        onOpen: () => {
            this.disableButtons(true);
            this.stopTime();
        },
        onClose: () => {
            this.disableButtons(false);
            this.startTime();
        }
    });

    toastLoadGame = () => toast('You loaded game 🚀', {
        type: toast.TYPE.SUCCESS, autoClose: 5000,
        onOpen: () => {
            this.disableButtons(true);
            this.stopTime();
        },
        onClose: () => {
            this.disableButtons(false);
            this.startTime();
        }
    });

    toastRestartGame = () => toast('You restarted the game 😎',
        {
            type: toast.TYPE.INFO, autoClose: 5000,
            onOpen: () => {
                this.disableButtons(true);
                this.resetTime();
            },
            onClose: () => {
                this.disableButtons(false);
                this.startTime();
            }
        });

    correctTactics = () => toast('Your tactics are CORRECT 😀',
        {
            type: toast.TYPE.SUCCESS, autoClose: 5000,
            onOpen: () => {
                this.disableButtons(true);
                this.stopTime();
            },
            onClose: () => {
                this.disableButtons(false);
                this.startTime();
            }
        });
    notCorrectTactics = () => toast('Your tactics are NOT CORRECT 😲',
        {
            type: toast.TYPE.ERROR, autoClose: 5000,
            onOpen: () => {
                this.disableButtons(true);
                this.stopTime();
            },
            onClose: () => {
                this.disableButtons(false);
                this.startTime();
            }
        });

    render() {
        return (
            <div className="App row col-12">
                <div className="title row col-3 flex-center flex-content-start">
                    <h1>SUDOKU</h1>
                    <h3 className="col-12" hidden={this.state.hideElements}>
                        {`${this.state.level} (${this.format(this.state.times)})`}
                    </h3>
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
                                disabled={this.state.disabledUndo} onClick={this.undoHandling.bind(this)}>Undo
                        </button>
                        <button className={this.state.redoStyle} hidden={this.state.hideElements}
                                disabled={this.state.disabledRedo} onClick={this.redoHandling.bind(this)}>Redo
                        </button>
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
                            onClick={() => this.checkSolution(this.state.board, false)}>Check
                    </button>
                    <button disabled={this.state.disabledButtons} onClick={() => toast.success(<DifficultyModal
                            title="Select difficulty level" prepareBoard={this.prepareBoard.bind(this)}/>,
                        {
                            autoClose: false, onOpen: () => this.disableButtons(true),
                            onClose: () => this.disableButtons(false)
                        })}>New Game
                    </button>
                    <button disabled={this.state.disabledButtons} onClick={() => this.loadGame()}>Load Game</button>
                    <button hidden={this.state.hideElements} disabled={this.state.disabledButtons}
                            onClick={() => this.saveGame()}>Save Game
                    </button>
                    <button hidden={this.state.hideElements} disabled={this.state.disabledButtons}
                            onClick={() => this.checkSolution(this.state.board, true)}>Solve
                    </button>
                    <button hidden={this.state.hideElements} disabled={this.state.disabledButtons}
                            onClick={() => this.restartGame()}>Restart
                    </button>
                </div>
                <ToastContainer/>
            </div>
        )
    }
}

export default hot(module)(App);