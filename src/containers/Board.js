import React from 'react';
import Tile from '../components/Tile';

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numbers: this.props.randomNumbers,
            selectedBox: '',
            isDefaultBackground: true
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            numbers: nextProps.randomNumbers
        });
    }

    get numbers() {
        let counter = -1;
        return this.state.numbers.map(number =>
            <Tile key={counter++} number={number} id={counter} selectedBox={this.state.selectedBox}
            takeNumber={this.props.takeNumber} selectBoxes={this.selectBoxes.bind(this)}
            resetBackground={this.resetBackground.bind(this)} isDefaultBackground={this.state.isDefaultBackground} 
            isGame={this.props.isGame} takeCoordinates={this.props.takeCoordinates} 
                  resetBackgroundFromAssistant={this.resetBackgroundFromAssistant.bind(this)}
                  selectBoxesFromAssisntant={this.selectBoxesFromAssisntant.bind(this)}
                  pushFalseBackground={this.pushFalseBackground.bind(this)}/>
        )
    }
    
    pushFalseBackground(id) {
        this.setState({isDefaultBackground: false, selectedBox: id});
    }

    selectBoxes(id) {
        const setState = () => new Promise(resolve => resolve(
            this.setState({selectedBox: id, isDefaultBackground: false})
        ));
        setState()
            .then(() => this.props.setTurn(this.state.isDefaultBackground, this.state.selectedBox));
    }

    resetBackground() {
        const setState = () => new Promise(resolve => resolve(
            this.setState({isDefaultBackground: true})
        ));
        setState()
            .then(() => this.props.setTurn(this.state.isDefaultBackground, this.state.selectedBox))
            .then(() => this.setState({selectedBox: ''}));
    }
    
    selectBoxesFromAssisntant(id) {
        this.setState({selectedBox: id, isDefaultBackground: false});
    }
    
    resetBackgroundFromAssistant() {
        this.setState({isDefaultBackground: true, selctedBox: ''});
    }



    render() {
        return (
            <div className="board row">
                {(this.state.numbers) ? this.numbers : []}
            </div>
        )
    }
}

export default Board