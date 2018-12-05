import React, { Component } from "react";
import {Link} from "react-router-dom"
import axios from 'axios'
import StarRatingComponent from 'react-star-rating-component';
import Filters from "./Filters.js";
import ReactDOM from 'react-dom';
import { InstantSearch, SearchBox, Pagination, Highlight,connectHits } from 'react-instantsearch-dom';
import Search from "./Search";
import './style/TestList.scss'
class TestList extends Component{

  render(){
    return(
      <section className = "TestList">
        <InstantSearch
            appId="T1L56EHFYT"
            apiKey="b50c4d588d9d5f3e960bcf9d44788bb5"
            indexName="dev_data"
        >
        <Search />
        <Results />
        </InstantSearch>
      </section>
    )
  }

}

const MyHits = connectHits(({ hits }) => {
    const hs = hits.map(hit => <HitComponent key={hit.objectID} hit={hit} />);
    return <div id="hits">{hs}</div>;
  });


function Results() {
    return (
      <div className="container-fluid" id="results">
        <div className="row">
          <MyHits />
        </div>
        {/* <div className="row">
          <Pagination />
          
        </div> */}
      </div>
    );
  }

  function HitComponent({ hit }) {
    return (
        <section className="TestList col-lg-12">
        <li key = {hit.recordid} className="col-lg-4 col-md-6 col-sm-12">
            <div className="place-img"><img src = {hit.xl_picture_url} alt='housepic' /></div>
            <h4>{hit.name}</h4>
            <h5>{hit.price}$ per night</h5>
            <div className="reviews">
            <StarRatingComponent 
            name="rate1" 
            editing={false}
            starCount={5}
            value={Math.round(hit.review_scores_rating/20)}
            />
                <h6>{hit.number_of_reviews}</h6>
            </div>
        </li>
        </section>
    );
  }

export default TestList;
