import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { firebase } from './firebase';

// COMPONENTS
import Routing from './routing';

const App = (props) => {
    return (
        <BrowserRouter>
            <Routing {...props} />
        </BrowserRouter>
    )
}

firebase.auth().onAuthStateChanged( user => {
    ReactDOM.render( <App user={user} />, document.getElementById('root'));
})

