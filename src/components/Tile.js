import React from 'react';
import style from './Tile.css';

const generateId = id => {
    let first;
    let result;
    id >= 0 && id <= 8 ? first = ("a_" + (id + 1)) : [];
    id >= 9 && id <= 17 ? first = ("b_" + (id - 8)) : [];
    id >= 18 && id <= 26 ? first = ("c_" + (id - 17)) : [];
    id >= 27 && id <= 35 ? first = ("d_" + (id - 26)) : [];
    id >= 36 && id <= 44 ? first = ("e_" + (id - 35)) : [];
    id >= 45 && id <= 53 ? first = ("f_" + (id - 44)) : [];
    id >= 54 && id <= 62 ? first = ("g_" + (id - 53)) : [];
    id >= 63 && id <= 71 ? first = ("h_" + (id - 62)) : [];
    id >= 72 && id <= 80 ? first = ("i_" + (id - 71)) : [];
    (id >= 0 && id <= 2) || (id >= 9 && id <= 11) || (id >= 18 && id <= 20) ? result = first + "_A" : [];
    (id >= 3 && id <= 5) || (id >= 12 && id <= 14) || (id >= 21 && id <= 23) ? result = first + "_B" : [];
    (id >= 6 && id <= 8) || (id >= 15 && id <= 17) || (id >= 24 && id <= 26) ? result = first + "_C" : [];
    (id >= 27 && id <= 29) || (id >= 36 && id <= 38) || (id >= 45 && id <= 47) ? result = first + "_D" : [];
    (id >= 30 && id <= 32) || (id >= 39 && id <= 41) || (id >= 48 && id <= 50) ? result = first + "_E" : [];
    (id >= 33 && id <= 35) || (id >= 42 && id <= 44) || (id >= 51 && id <= 53) ? result = first + "_F" : [];
    (id >= 54 && id <= 56) || (id >= 63 && id <= 65) || (id >= 72 && id <= 74) ? result = first + "_G" : [];
    (id >= 57 && id <= 59) || (id >= 66 && id <= 68) || (id >= 75 && id <= 77) ? result = first + "_H" : [];
    (id >= 60 && id <= 62) || (id >= 69 && id <= 71) || (id >= 78 && id <= 80) ? result = first + "_I" : [];
    return result
};

class Tile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.number,
            id: this.props.id,
            disabled: true,
            boxId: generateId(this.props.id),
            boxStyle: style.white
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.setAccess();
        this.defaultBackground();
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.selectedBox) {
            this.selectFields(nextProps.selectedBox);
        }

        if (nextProps.isDefaultBackground) {
            this.defaultBackground();
        }
    }

    setAccess() {
        this.state.value === "." ? this.setState({disabled: false}) :
            this.setState({disabled: true});
    }

    defaultBackground() {

        if ((this.state.boxId.includes("a") ||
            this.state.boxId.includes("b") ||
            this.state.boxId.includes("c")) & !
                (this.state.boxId.includes("4") ||
                    this.state.boxId.includes("5") ||
                    this.state.boxId.includes("6")
                ) ||
            (this.state.boxId.includes("g") ||
                this.state.boxId.includes("h") ||
                this.state.boxId.includes("i")) & !
                (this.state.boxId.includes("4") ||
                    this.state.boxId.includes("5") ||
                    this.state.boxId.includes("6")
                ) ||
            (this.state.boxId.includes("d") ||
                this.state.boxId.includes("e") ||
                this.state.boxId.includes("f")) & !
                (this.state.boxId.includes("1") ||
                    this.state.boxId.includes("2") ||
                    this.state.boxId.includes("3") ||
                    this.state.boxId.includes("7") ||
                    this.state.boxId.includes("8") ||
                    this.state.boxId.includes("9")
                )) {
            this.setState({boxStyle: style.grey})
        } else {this.setState({boxStyle: style.white});}
    }
    
    selectFields(boxId) {
        let letter = boxId.substring(0, 1);
        let number = boxId.substring(2, 3);
        let section = boxId.substring(4, 5);

        if (this.state.boxId.includes(letter) || this.state.boxId.includes(number) || this.state.boxId.includes(section)) {
            this.setState({boxStyle: style.yellow});
        }
    }

    handleChange(event) {
        this.setState({value: event.target.value});
        setTimeout(() => this.props.takeNumber(this.state.id, this.state.value), 100);
        this.props.selectBoxes(this.state.boxId);
    }

    render() {
        return (
            <div className={this.state.boxStyle} id={this.state.boxId}
                 onMouseEnter={() => this.props.takeCoordinates(this.state.boxId, true)}
                 onMouseLeave={() => this.props.takeCoordinates(this.state.boxId, false)}>
                <input className="assistant" disabled={this.state.disabled}
                       onClick={() => this.props.selectBoxes(this.state.boxId)}
                       onBlur={this.props.resetBackground}/>
                <input className="main" type="number" min="1" max="9" onBlur={this.props.resetBackground}
                       id={this.state.id} value={this.state.value} onClick={() => this.props.selectBoxes(this.state.boxId)}
                       onChange={this.handleChange} disabled={this.state.disabled}/>
            </div>
        )
    }
}

export default Tile;