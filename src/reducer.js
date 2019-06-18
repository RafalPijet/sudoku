import {combineReducers} from "redux";
import boards from './boardsReducer';
import elements from './elementsReducer';
import styles from './stylesReducer';
import values from './valuesReducer';

const reducer = combineReducers({
    boards,
    elements,
    styles,
    values
});

export default reducer;
