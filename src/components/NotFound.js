import React, {Component} from 'react';

class NotFound extends Component {

  componentDidMount(){
    window.scrollTo(0,0)
  }

    render(){
        return(
            <section className = "NotFound">
                <h2>Page not found, sorry!</h2>
            </section>
        )
    }
}

export default NotFound;