import React from 'react';
import Tile from '../components/Tile';

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numbers: this.props.randomNumbers
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            numbers: nextProps.randomNumbers
        });
        setTimeout(() => console.log(`In Board --> ${this.state.numbers};
         length --> ${this.state.numbers.length}`), 100);
    }

    get numbers() {
        let counter = -1;
        return this.state.numbers.map(number =>
            <Tile key={counter++} number={number} id={counter}
            takeNumber={this.props.takeNumber}/>
        )
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