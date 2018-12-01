import React, {Component} from 'react';
import { Switch, Route, NavLink } from 'react-router-dom'

class HomePage extends Component {
    render(){
        return(
            <section className = "HomePage">
                <h2>Welcome to Airbnb HomePage</h2>
                <NavLink exact to="/houselisting">See all our cool houses!</NavLink>
            </section>
        )
    }
}

export default HomePage;