import React, {Component} from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';

import './style/Homepage.scss';
import './style/FontColors.scss';

class HomePage extends Component {
    render(){
        return(
            <section className = "HomePage">
                <h2>Welcome to Airbnb !</h2>
                <NavLink exact to="/houses"><button className="list-button">See all our cool houses!</button></NavLink>
            </section>
        )
    }
}

export default HomePage;