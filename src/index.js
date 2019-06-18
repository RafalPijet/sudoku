import React from 'react';
import ReactDOM from 'react-dom';
import './scss/style.scss';
import App from './containers/AppContainer';
import {createStore} from "redux";
import { Provider} from 'react-redux';
import reducer from "./reducer";
import {hideElements, enabledButtons} from "./actions";

const store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('app')
);

// store.dispatch(hideElements());
// store.dispatch(enabledButtons());
// console.log(store.getState());
