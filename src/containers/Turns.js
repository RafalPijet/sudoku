import React from 'react';

class Turns extends React.Component {

    get turns() {
        return this.props.turns.map(turn =>
            <tr className="row col-12" key={turn.turnId}>
                <td className="col-4">{turn.turnId}</td>
                <td className="col-4">{turn.selectedBox}</td>
                <td className="col-4">{turn.value}</td>
            </tr>
        )
    }

    render() {
        return (
            <div className="col-10 row">
                <table className="col-12 row flex-content-start">
                    <tbody className="row col-12">
                    {this.turns}
                    </tbody>
                </table>
            </div>

        );
    }
}

export default Turns;