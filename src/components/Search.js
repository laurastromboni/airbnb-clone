// First, we need to add the Hits component to our import
import { InstantSearch, Hits, SearchBox } from 'react-instantsearch-dom';
import React, { Component } from "react";
import { Highlight, connectStateResults } from "react-instantsearch-dom";
import './style/SearchBar.scss';
import './style/FontColors.scss';


  class Search extends Component{

    render(){
      return(
        <section className="SearchBar">
            <SearchBox />
            
        </section>
      )
    }
  
  }
  
export default Search;

