import React from 'react';

const SolveModal = props =>
    <form className="modal-solution">
        <p>{props.title}</p>
        <button>{props.info}</button>
    </form>

export default SolveModal;