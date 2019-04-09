import React from 'react';

class Turns extends React.Component {

    get turns() {
        let counter = 0;
        return this.props.turns.map(turn =>
            <tr key={counter++}><td>{counter}</td><td>{turn.selectedBox}</td><td>{turn.value}</td></tr>
        )
    }

    render() {
        return (
            <table className="turns-list col-10">
                <thead>
                    <tr>
                        <th>Turn</th>
                        <th>Coordinates</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                {this.turns}
                {/*{this.state.turns ? this.turns : []}*/}
                </tbody>
            </table>
        );
    }
}

export default Turns;