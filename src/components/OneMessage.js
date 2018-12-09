import React, { Component } from "react";

import "./style/OneMessage.scss"

class OneMessage extends Component {

  componentDidMount(){
    window.scrollTo(0,0)
  }

  render() {
    return(
      <section className="OneMessage">
        
        <ul id="messages"></ul>
        <form action="">
          <input id="m" autoComplete="off" /><button>Send</button>
        </form>

      </section>
    )
  }
}

export default OneMessage;