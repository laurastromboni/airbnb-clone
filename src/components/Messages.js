import React, { Component } from "react";

import "./style/Messages.scss"

class Messages extends Component {

  componentDidMount(){
    window.scrollTo(0,0)
  }

  render() {
    return(
      <section className="Messages">
        <h2>Messages</h2>
      </section>
    )
  }
}

export default Messages;