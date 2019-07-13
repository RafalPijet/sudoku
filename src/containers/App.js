import React from 'react';
import {hot} from 'react-hot-loader/index';
import SolveModal from '../components/SolveModal';
import ButtonPanelContainer from './ButtonPanelContainer';
import InfoContainer from './InfoContainer';
import MatrixContainer from './MatrixContainer';
import sudoku from 'sudoku-umd';
import {ToastContainer, toast} from "react-toastify";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            times: {
                hours: 0,
                minutes: 0,
                seconds: 0
            }
        };
        this.props.hideElements(true);
        this.props.disabledButtons(false);
        this.props.disabledUndo(true);
        this.props.disabledRedo(true);
        this.props.setBoard([]);
        this.props.setInitialBoard([]);
        this.props.setTurns([]);
        this.props.setTurnsCash([]);
        this.props.setUndoStyle("smallButtonDisabled");
        this.props.setRedoStyle("smallButtonDisabled");
        this.props.setBoxIdState('');
        this.props.setIsGame(false);
        this.props.setLevel('');
        this.props.setValue('');
        this.props.setId('');
        this.props.setSelectedBox('');
        this.props.setTurnCounter(0);
        this.props.setRunning(false);
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
            this.props.setBoard(begin);
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
                this.props.hideElements(false),
                this.props.disabledButtons(false),
                this.props.disabledUndo(true),
                this.props.disabledRedo(true),
                this.props.setBoard(resultForBoard),
                this.props.setInitialBoard(resultForInitialBoard),
                this.props.setIsGame(true),
                this.props.setLevel(level),
                this.props.setTurns([]),
                this.props.setTurnsCash([]),
                this.props.setUndoStyle("smallButtonDisabled"),
                this.props.setRedoStyle("smallButtonDisabled"),
                this.props.setValue(''),
                this.props.setId(''),
                this.props.setBoxIdState(''),
                this.props.setSelectedBox(''),
                this.props.setTurnCounter(0),
            ));
            setPreparing()
                .then(() => this.props.setIsGame(false))
                // .then(() => this.setState({isGame: false}))
                .then(() => this.resetTime())
                .then(() => this.startTime())
                .then(() => this.buttonsHandling(false, false));
        }
    }

    takeNumber(id, value) {
        let takeBoard = this.props.boards.board;
        takeBoard.splice(id, 1, value);
        this.props.setBoard(takeBoard);
        this.props.setValue(value);
        this.props.setId(id);
    }

    setTurn(isDefaultBackground, selectedBox) {
        let letter = selectedBox.substring(0, 1).toUpperCase();
        let number = selectedBox.substring(2, 3);
        let coordinates = letter + " - " + number;
        coordinates.length === 5 ? this.props.setSelectedBox(coordinates) : [];

        if (isDefaultBackground && this.props.values.value.length &&
            this.props.values.selectedBox.length === 5) {
            const addTurn = () => new Promise((resolve => resolve(
                this.props.turnUpCounter()
            )));
            addTurn()
                .then(() => {
                    let turn = {
                        turnId: this.props.values.turnCounter,
                        selectedBox: coordinates,
                        value: this.props.values.value,
                        id: this.props.values.id,
                        prevValue: this.props.boards.initialBoard[this.props.values.id]
                    };
                    this.props.addTurn(turn);
                })
                .then(() => {
                    this.props.setValue('');
                    this.props.setSelectedBox('');
                    this.props.setTurnsCash([]);
                })
                .then(() => this.buttonsHandling(true, false));
        } else {
            this.props.values.value.length ? this.props.setSelectedBox(coordinates) :
                this.props.setSelectedBox('')
        }
    }

    buttonsHandling(isUndo, isRedo) {

        if (isUndo) {
            this.props.disabledUndo(false);
            this.props.setUndoStyle("smallButton");
        } else {
            this.props.disabledUndo(true);
            this.props.setUndoStyle("smallButtonDisabled");
        }

        if (isRedo) {
            this.props.disabledRedo(false);
            this.props.setRedoStyle("smallButton");
        } else {
            this.props.disabledRedo(true);
            this.props.setRedoStyle("smallButtonDisabled");
        }
    }

    refreshBoard = () => new Promise(resolve => resolve(
        this.props.setBoard(this.props.boards.board),
        this.props.setIsGame(true),
    ));


    undoHandling() {
        let item = this.props.boards.turns[0];
        this.props.removeTurn();
        this.props.addTurnCash(item);
        this.props.turnDownCounter();
        this.props.setTurns(this.props.boards.turns);
        this.props.boards.turnsCash.length ? this.buttonsHandling(true, true) :
            this.buttonsHandling(true, false);
        !this.props.boards.turns.length ? this.buttonsHandling(false, false) : [];
        let actualBoard = this.props.boards.board;
        actualBoard[item.id] = item.prevValue;
        this.props.setBoard(actualBoard);
        this.refreshBoard()
            .then(() => this.props.setIsGame(false));
    }

    redoHandling() {

        if (this.props.boards.turnsCash.length) {
            let item = this.props.boards.turnsCash[0];
            this.props.removeTurnCash();
            this.props.addTurn(item);
            this.props.turnUpCounter();
            this.props.setTurns(this.props.boards.turns);
            let actualBoard = this.props.boards.board;
            actualBoard[item.id] = item.value;
            this.props.setBoard(actualBoard);
            this.refreshBoard()
                .then(() => this.props.setIsGame(false))
                .then(() => !this.props.boards.turnsCash.length ?
                    this.buttonsHandling(true, false) : []);
        }
    }

    takeCoordinates(id, state) {
        let boxState = {
            id: id,
            state: state
        };
        this.props.setBoxIdState(boxState);
    }

    restartGame() {
        const restart = () => new Promise(resolve => resolve(
            this.props.setBoard(Array.from(this.props.boards.initialBoard)),
            this.props.setIsGame(true),
            this.props.setTurns([]),
            this.props.setTurnsCash([]),
            this.props.setValue(''),
            this.props.setId(''),
            this.props.setBoxIdState(''),
            this.props.setSelectedBox(''),
            this.props.setTurnCounter(0),
        ));
        restart()
            .then(() => this.props.setIsGame(false))

            // .then(() => this.setState({isGame: false}))
            .then(() => this.buttonsHandling(false, false))
            .then(() => this.toastCreator("You restarted the game 😎", "info", false));
    }

    checkSolution(solution, isSolve) {
        const result = [];
        solution.map(item => !item.length ? result.push(item.replace('', '.')) : result.push(item));
        const check = sudoku.solve(result.join(''));

        if (isSolve) {
            let counter = 0;
            for (let i = 0; i < this.props.boards.board.length; i++) {
                this.props.boards.board[i] === '' ? counter++ : [];
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
            // check ? this.correctTactics() : this.notCorrectTactics();
            check ? this.toastCreator("Your tactics are CORRECT 😀", "success", true) :
                this.toastCreator("Your tactics are NOT CORRECT 😲", "error", true);
        }
    }

    disableButtons(isReally) {
        isReally ? this.props.disabledButtons(true) : this.props.disabledButtons(false);
    }

    loadGame() {
        let store = '';
        let result = '';
        const load = () => new Promise((resolve => resolve(
            store = localStorage.getItem("store")
        )));
        load()
            .then(() => result = JSON.parse(store))
            .then(() => {
                this.props.hideElements(result.elements.hideElements);
                this.props.disabledButtons(result.elements.disabledButtons);
                this.props.disabledUndo(result.elements.disabledUndo);
                this.props.disabledRedo(result.elements.disabledRedo);
                this.props.setBoard(result.boards.board);
                this.props.setInitialBoard(result.boards.initialBoard);
                this.props.setTurns(result.boards.turns);
                this.props.setTurnsCash(result.boards.turnsCash);
                this.props.setBoxIdState(result.values.boxIdState);
                this.props.setIsGame(true);
                this.props.setLevel(result.values.level);
                this.props.setUndoStyle(result.styles.undoStyle);
                this.props.setRedoStyle(result.styles.redoStyle);
                this.props.setValue(result.values.value);
                this.props.setId(result.values.id);
                this.props.setSelectedBox(result.values.selectedBox);
                this.props.setTurnCounter(result.values.turnCounter);
                this.props.setRunning(result.values.running);
                this.setState({times: result.times});
            })
            .then(() => this.props.setIsGame(false))
            .then(() => this.toastCreator("You loaded game 🚀", "success", true))
            .then(() => clearInterval(this.interval))
            .then(() => this.interval = setInterval(() => {

                if (this.props.values.running) {
                    this.setState({
                        times: this.calculate(this.state.times)
                    })
                }
            }, 1000));
    }

    saveGame() {
        let storage = {
            boards: this.props.boards,
            elements: this.props.elements,
            styles: this.props.styles,
            values: this.props.values,
            times: this.state.times
        };
        localStorage.setItem("store", JSON.stringify(storage));
        this.toastCreator("You saved game 🚀", "success", true);
    }

    interval = null;

    startTime() {

        if (!this.props.values.running) {
            this.props.setRunning(true);
            this.interval = setInterval(() => {

                if (this.props.values.running) {

                    this.setState({
                        times: this.calculate(this.state.times)
                    })
                }
            }, 1000)
        }
    }

    stopTime() {
        this.props.setRunning(false);
        clearInterval(this.interval);
    }

    resetTime() {
        this.props.setRunning(false);
        this.setState({
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

    toastCreator = (content, type, isStopTime) => (
        toast(content, { type , autoClose: 5000,
        onOpen: () => {
            this.disableButtons(true);
            isStopTime ? this.stopTime() : this.resetTime();
        },
        onClose: () => {
            this.disableButtons(false);
            this.startTime();

        }})
    );

    render() {
        return (
            <div className="App row col-12">
                <InfoContainer times={this.state.times} undoHandling={this.undoHandling.bind(this)}
                               redoHandling={this.redoHandling.bind(this)}/>
                <MatrixContainer takeNumber={this.takeNumber.bind(this)}
                                 takeCoordinates={this.takeCoordinates.bind(this)}
                                 setTurn={this.setTurn.bind(this)}/>
                <ButtonPanelContainer prepareBoard={this.prepareBoard.bind(this)} loadGame={this.loadGame.bind(this)}
                                      saveGame={this.saveGame.bind(this)}
                                      disableButtons={this.disableButtons.bind(this)}
                                      restartGame={this.restartGame.bind(this)}
                                      checkSolution={this.checkSolution.bind(this)}/>
                <ToastContainer/>
            </div>
        )
    }
}

export default hot(module)(App);
