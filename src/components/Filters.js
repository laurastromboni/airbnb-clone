import React, { Component } from "react";
import './style/Filters.scss';
import './style/FontColors.scss';
import GoogleSearch from "./GoogleSearch"
import PlacesAutocomplete from "./LocationSearchInput";
import { classnames } from './helpers';
import './style/GoogleSearch.scss';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import { DateRangePicker } from 'react-dates';


class Filters extends Component{

  render(){
    const {address} = this.props;
    return(
      <section>
        <form onSubmit={event=>this.props.handleSubmit(event)} className="Filters">
        <div className="col-lg-3 col-md-3 col-sm-12 filter-div">
          <h4>Where</h4>
          <div className="places-autocomplete">
        
        <PlacesAutocomplete
          onChange={this.props.onAdressChange}
          value={this.props.address}
          shouldFetchSuggestions={this.props.address.length > 2}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps }) => {
            return (
              <div className="Demo__search-bar-container">
                <div className="Demo__search-input-container">
                  <input
                    {...getInputProps({
                      placeholder: 'Search Places...',
                      className: 'Demo__search-input',
                    })}
                  />
                </div>
                {suggestions.length > 0 && (
                  <div className="Demo__autocomplete-container">
                    {suggestions.map(suggestion => {
                      const className = classnames('Demo__suggestion-item', {
                        'Demo__suggestion-item--active': suggestion.active,
                      });

                      return (
                        /* eslint-disable react/jsx-key */
                        <div
                          {...getSuggestionItemProps(suggestion, { className })}
                        >
                          <strong>
                            {suggestion.formattedSuggestion.mainText}
                          </strong>{' '}
                          <small>
                            {suggestion.formattedSuggestion.secondaryText}
                          </small>
                        </div>
                      );
                      /* eslint-enable react/jsx-key */
                    })}
                  </div>
                )}
              </div>
            );
          }}
        </PlacesAutocomplete>

      </div>
          {/* <input onChange = {event=> this.props.onGenericChange(event)} type="text" name="where" value= {this.props.where} placeholder="Destination" /> */}
        </div>


        <div className="col-lg-4 col-md-4 col-sm-12 filter-div">
          <h4>When</h4>
          <div className="when">
      
        <DateRangePicker
          startDateId="startDate"
          endDateId="endDate"
          startDate={this.props.startDate}
          endDate={this.props.endDate}
          onDatesChange = {this.props.functionDatesChange}
          focusedInput={this.props.focusedInput}
          onFocusChange={this.props.functionFocusChange}
          
        />
            {/* <input onChange = {event=> this.props.onGenericChange(event)} type="text" name="when-1" placeholder="Check in" className="when-1" /> → <input onChange = {event=> this.props.onGenericChange(event)} type="text" name="when-2" placeholder="Check out" className="when-2" /> */}
          </div>
        </div>



        <div className="col-lg-5 col-md-5 col-sm-12 search-div">
          <div className="guest">
            <h4>Guest</h4>
            <input onChange = {event=> this.props.onGenericChange(event)} type="number" name="guest" value= {this.props.guest} placeholder="1" />
          </div>
          <div className="search-btn">
            <button className="search-button">Search</button>
          </div>
        </div>
        </form>
      </section>
    )
  }

}

export default Filters;
