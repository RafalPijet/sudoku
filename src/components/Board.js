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
        // setTimeout(() => console.log(`Im in board --> ${this.state.numbers}`), 10);
    }

    get numbers() {
        let counter = -1;
        return this.state.numbers.map(number =>
            <Tile key={counter++} number={number} id={counter} selectedBox={this.state.selectedBox}
            takeNumber={this.props.takeNumber} selectBoxes={this.selectBoxes.bind(this)}
            resetBackground={this.resetBackground.bind(this)} isDefaultBackground={this.state.isDefaultBackground} 
            isGame={this.props.isGame} takeCoordinates={this.props.takeCoordinates}/>
        )
    }
    
    selectBoxes(id) {
        this.setState({selectedBox: id, isDefaultBackground: false});
    }
    
    resetBackground() {
        this.setState({isDefaultBackground: true, selectedBox: ''});
    }



    render() {
        return (
            <div className="board row">
                {/*{this.numbers}*/}
                {(this.state.numbers) ? this.numbers : []}
            </div>
        )
    }
}

export default Board