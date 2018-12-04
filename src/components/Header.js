import React, { Component } from "react";
import axios from 'axios'
import Filters from "./Filters.js";

import './style/Header.scss';
import './style/FontColors.scss';

class Header extends Component{
  constructor(props){
    super(props)
    this.state = {
        where :'',
        when1 :'',
        when2 :'',
        guest :'',
        searchResults : [],
    }
}

genSync(event){
  const {name, value} = event.target
        this.setState({
            [name] : value, 
        })
}

submitHandler(event){
    event.preventDefault();
    const {searchResults} = this.state

    // PUT and POST requests 
    axios.get(`http://localhost:5555/api/search/${this.state.where}`)
        .then(response => {
            console.log("search", response.data)
            response.data.map(oneHouse=>{
              return(
              searchResults.push(oneHouse)
              )})
          this.setState({searchResults})
            // this.setState({isSubmitSuccessful : true})
        })
        .catch(err =>{
            console.log("search", err);
            alert("sorry something went wrong")
        })
}


  render(){
    return(
      <section className="Header col-lg-12">
        <h1><b>Live here.</b> Book unique homes and <br />experience a city like a local.</h1>

        <Filters allFilters = {this.state} onGenericChange={event=>this.genSync(event)} handleSubmit={event=>this.submitHandler(event)} />

      </section>
    )
  }
}

export default Header;