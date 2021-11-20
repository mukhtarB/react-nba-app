import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

// COMPONENTS
import Routing from './routing';

const App = () => {
    return (
        <BrowserRouter>
            <Routing />
        </BrowserRouter>
    )
}

ReactDOM.render( <App />, document.getElementById('root'));
