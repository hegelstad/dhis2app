import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import dhisApp from './reducers';
import App from './components/App';

let store = createStore(dhisApp);

// Render the App component into the .app element
render(
    <Provider store={store}>
        <App /> 
    </Provider>,
    document.querySelector('.app')
);
