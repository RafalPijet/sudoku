import React from 'react';
import {hot} from 'react-hot-loader/index';
import Info from '../containers/Info';
import Matrix from '../containers/Matrix';
import ButtonsPanel from '../containers/ButtonsPanel';
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
            undoStyle: "smallButtonDisabled",
            redoStyle: "smallButtonDisabled",
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

        // setTimeout(() => console.log(this.props.boards), 10);
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
                        undoStyle: "smallButtonDisabled",
                        redoStyle: "smallButtonDisabled",
                        value: '',
                        id: '',
                        selectedBox: '',
                        turnCounter: 0,
                        hideElements: false
                    })
                ));
            setPreparing()
                .then(() => this.props.setIsGame(false))
                .then(() => this.setState({isGame: false}))
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

        this.state.board.splice(id, 1, value);
        this.setState({value: value, id: id});
    }

    setTurn(isDefaultBackground, selectedBox) {
        let letter = selectedBox.substring(0, 1).toUpperCase();
        let number = selectedBox.substring(2, 3);
        let coordinates = letter + " - " + number;
        coordinates.length === 5 ? this.props.setSelectedBox(coordinates) : [];

        coordinates.length === 5 ? this.setState({selectedBox: coordinates}) : [];
/*todo*/
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
/*todo*/
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


        isUndo ? this.setState({disabledUndo: false, undoStyle: "smallButton"}) :
            this.setState({disabledUndo: true, undoStyle: "smallButtonDisabled"});
        isRedo ? this.setState({disabledRedo: false, redoStyle: "smallButton"}) :
            this.setState({disabledRedo: true, redoStyle: "smallButtonDisabled"});
    }

    refreshBoard = () => new Promise(resolve => resolve(
        this.props.setBoard(this.props.boards.board),
        this.props.setIsGame(true),

        this.setState({board: this.state.board, isGame: true})
    ));
/*todo*/
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
/*todo*/
    takeCoordinates(id, state) {
        let boxState = {
            id: id,
            state: state
        };
        this.props.setBoxIdState(boxState);

        this.setState({boxIdState: boxState});
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
            .then(() => this.props.setIsGame(false))

            .then(() => this.setState({isGame: false}))
            .then(() => this.buttonsHandling(false, false))
            .then(() => this.toastRestartGame());
    }
/*todo*/
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
/*todo*/
    disableButtons(isReally) {
        isReally ? this.setState({disabledButtons: true}) : this.setState({disabledButtons: false});
        isReally ? this.props.disabledButtons(true) : this.props.disabledButtons(false);
    }

    loadGame() {
        let board = '';
        let result = '';
        const load = () => new Promise((resolve => resolve(
            board = localStorage.getItem("state")
        )));
        load()
            .then(() => result = JSON.parse(board))
            .then(() => {
                this.props.hideElements(result.hideElements);
                this.props.disabledButtons(result.disabledButtons);
                this.props.disabledUndo(result.disabledUndo);
                this.props.disabledRedo(result.disabledRedo);
                this.props.setBoard(result.board);
                this.props.setInitialBoard(result.initialBoard);
                this.props.setTurns(result.turns);
                this.props.setTurnsCash(result.turnsCash);
                this.props.setBoxIdState(result.boxIdState);
                this.props.setIsGame(true);
                this.props.setLevel(result.level);
                this.props.setUndoStyle(result.undoStyle);
                this.props.setRedoStyle(result.redoStyle);
                this.props.setValue(result.value);
                this.props.setId(result.id);
                this.props.setSelectedBox(result.selectedBox);
                this.props.setTurnCounter(result.turnCounter);
                this.props.setRunning(result.running);
            })
            .then(() => this.setState({
                initialBoard: result.initialBoard,
                board: result.board,
                boxIdState: board.boxIdState,//???
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
                times: result.times //!!!
            }))
            .then(() => this.props.setIsGame(false))

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
/*todo*/
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
/*todo*/
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
                {/*<Info times={this.state.times} hideElements={this.state.hideElements} level={this.state.level}*/}
                {/*    turnCounter={this.state.turnCounter} selectedBox={this.state.selectedBox} value={this.state.value}*/}
                {/*    turns={this.state.turns} undoStyle={this.state.undoStyle} disabledUndo={this.state.disabledUndo}*/}
                {/*    undoHandling={this.undoHandling.bind(this)} redoStyle={this.state.redoStyle}*/}
                {/*    disabledRedo={this.state.disabledRedo} redoHandling={this.redoHandling.bind(this)}/>*/}
                <InfoContainer times={this.state.times} undoHandling={this.undoHandling.bind(this)}
                               redoHandling={this.redoHandling.bind(this)}/>
                {/*<Matrix boxIdState={this.state.boxIdState} takeNumber={this.takeNumber.bind(this)}*/}
                {/*    randomNumbers={this.state.board} takeCoordinates={this.takeCoordinates.bind(this)}*/}
                {/*    isGame={this.state.isGame} setTurn={this.setTurn.bind(this)}/>*/}
                <MatrixContainer takeNumber={this.takeNumber.bind(this)} takeCoordinates={this.takeCoordinates.bind(this)}
                                 setTurn={this.setTurn.bind(this)}/>
                {/*<ButtonsPanel hideElements={this.state.hideElements} disabledButtons={this.state.disabledButtons}*/}
                {/*    board={this.state.board} prepareBoard={this.prepareBoard.bind(this)}*/}
                {/*    disableButtons={this.disableButtons.bind(this)} loadGame={this.loadGame.bind(this)}*/}
                {/*    saveGame={this.saveGame.bind(this)} restartGame={this.restartGame.bind(this)}*/}
                {/*    checkSolution={this.checkSolution.bind(this)}/>*/}
                <ButtonPanelContainer prepareBoard={this.prepareBoard.bind(this)} loadGame={this.loadGame.bind(this)}
                                      saveGame={this.saveGame.bind(this)} disableButtons={this.disableButtons.bind(this)}
                                      restartGame={this.restartGame.bind(this)}
                                      checkSolution={this.checkSolution.bind(this)}/>
                <ToastContainer/>
            </div>
        )
    }
}

export default hot(module)(App);
