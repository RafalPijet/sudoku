import React from 'react';
import style from './Tile.css';

const generateId = id => {
    let result;
    id >= 0 && id <= 8 ? result = ("a_" + (id + 1)) : [];
    id >= 9 && id <= 17 ? result = ("b_" + (id - 8)) : [];
    id >= 18 && id <= 26 ? result = ("c_" + (id - 17)) : [];
    id >= 27 && id <= 35 ? result = ("d_" + (id - 26)) : [];
    id >= 36 && id <= 44 ? result = ("e_" + (id - 35)) : [];
    id >= 45 && id <= 53 ? result = ("f_" + (id - 44)) : [];
    id >= 54 && id <= 62 ? result = ("g_" + (id - 53)) : [];
    id >= 63 && id <= 71 ? result = ("h_" + (id - 62)) : [];
    id >= 72 && id <= 80 ? result = ("i_" + (id - 71)) : [];
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
        // console.log(`BoxID --> ${letter} -- ${number}`);

        if (this.state.boxId.includes(letter) || this.state.boxId.includes(number)) {
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
            <div className={this.state.boxStyle} id={this.state.boxId}>
                <input className="assistant" disabled={this.state.disabled}/>
                <input className="main" type="number" min="1" max="9" onBlur={this.props.resetBackground}
                       id={this.state.id} value={this.state.value}
                       onChange={this.handleChange} disabled={this.state.disabled}/>
            </div>
        )
    }
}

export default Tile;