import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import { LastLocationProvider } from "react-router-last-location";
import 'bootstrap/dist/css/bootstrap.css';
// put our scss file at the end
import './components/style/index.scss';

import App from './App';
import * as serviceWorker from './serviceWorker';


ReactDOM.render(
    <BrowserRouter>
        <LastLocationProvider>
            <App />
        </LastLocationProvider>
    </BrowserRouter>,   
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
