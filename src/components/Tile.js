import React from 'react';

class Tile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            id: this.props.id
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        nextProps.number ? this.setState({value: nextProps.number}) : [];
    }

    handleChange(event) {
        this.setState({value: event.target.value});
        setTimeout(() => this.props.takeNumber(this.state.id, this.state.value), 100);
    }

    render() {
        return (
            <div>
                <input type="number" min="1" max="9" id={this.state.id} value={this.state.value}
                onChange={this.handleChange}/>
            </div>
        )
    }
}

export default Tile;