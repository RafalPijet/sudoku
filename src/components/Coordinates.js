import React from 'react';

class Coordinates extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            style: "coordinatesDontSelected"
        }
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.boxIdState) {
            let letter = nextProps.boxIdState.id.substring(0, 1);
            let number = nextProps.boxIdState.id.substring(2, 3);
            let isSelected = nextProps.boxIdState.state;

            number === this.state.name && isSelected || letter.toUpperCase() === this.state.name && isSelected ?
                this.setState({style: "coordinatesSelected"}) :
                this.setState({style: "coordinatesDontSelected"})
        }
    }

    render() {
        return (
            <div>
                <p className={this.state.style}>{this.state.name}</p>
            </div>
        )
    }
}

export default Coordinates;